<?php

/**
 * @param $arr
 * @return array|string[]
 */
function trimExplode($arr)
{
    return array_map(fn($element) => trim($element), explode("\t", $arr));
}

/**
 * @param $filename
 * @return array[]|false[]|string[][]
 */
function loadTsv($filename)
{
    $data = explode("\n", file_get_contents($filename));
    $index = trimExplode(array_shift($data));

    return array_map(fn($line) => array_combine($index, trimExplode($line)), $data);
}

class RelationResolver
{
    private $versions;
    private $products;
    private $includes;
    private $genres;

    /**
     * @param $versions
     */
    public function __construct()
    {
        $this->versions = [];
        $this->products = [];
        $this->includes = [];
        $this->genres = [
            'プラットフォーム' => [],
            'シンセサイザー' => [],
            'クリエイティブサンプラー' => [],
            'サンプルインストゥルメント' => [],
            'エフェクト' => [],
            'EXPANSIONS' => [],
        ];
    }


    public function addComponents($component)
    {
        if (empty($component['Components'])) {
            return;
        }
        $name = $component['Components'];
        $link = $component['url'];
        $id = $component['id'];
        $productId = $this->insertProduct($name, $link, $id);

        $genre = $component['Genre'];
        $subGenre = $component['Sub Genre'];
        $this->insertProductIdToGenreList($genre, $subGenre, $productId);
    }

    private function insertProductIdToGenreList($genre, $subGenre, $productId)
    {
        $this->genres[$genre] = $this->genres[$genre] ?? [];
        $this->genres[$genre][$subGenre] = $this->genres[$genre][$subGenre] ?? [];
        $this->genres[$genre][$subGenre][] = $productId;
    }

    private function insertProduct($name, $link, $id): int
    {
        $this->products[$id] = [
            'name' => $name,
            'link' => $link,
        ];
        return $id;
    }

    public function addIncludes($include)
    {
        $versionNumber = $include['Version'];
        $versionGrade = $include['Grade'];
        if (empty($versionNumber) || empty($versionGrade)) {
            return;
        }

        $versionId = $this->findOrInsertVersion($versionNumber, $versionGrade);
        $productId = $include['id'];
        $this->insertInclude($versionId, $productId);
    }

    private function findOrInsertVersion($versionNumber, $versionGrade)
    {
        $version = array_values(array_filter($this->versions, fn($v) => (
            $v['Version'] == $versionNumber && $v['Grade'] == $versionGrade
        )));

        if (isset($version[0]['id'])) {
            return $version[0]['id'];
        } else {
            $versionId = count($this->versions);
            $this->versions[] = [
                'id' => $versionId,
                'Version' => $versionNumber,
                'Grade' => $versionGrade,
                'name' => "Komplete " . $versionNumber . " " . $versionGrade,
            ];
            return $versionId;
        }
    }

    private function insertInclude($versionId, $productId)
    {
        $this->includes[$productId] = $this->includes[$productId] ?? [];
        $this->includes[$productId][] = $versionId;
    }

    private function getGradeIndex($grade)
    {
        $grades = [
            'SELECT',
            'NORMAL',
            'ULTIMATE',
            'ULTIMATE Collector\'s Edition',
        ];
        $idx = array_search($grade, $grades);
        if ($idx === false) {
            throw new Exception('Unknown Grade : "' . $grade . '"');
        }
        return $idx;
    }

    /**
     * @return array
     */
    public function getVersions(): array
    {

        $versionList = $this->versions;

        // バージョンとグレードでソートする
        usort($versionList, function ($v1, $v2) {
            $vc = $v1['Version'] <=> $v2['Version'];
            if ($vc != 0) {
                return $vc;
            }
            try {
                return $this->getGradeIndex($v1['Grade']) <=> $this->getGradeIndex($v2['Grade']);
            } catch (\Exception $e) {
                var_dump($v1, $v2);
                die();
            }

        });
        return array_values($versionList);
    }

    /**
     * @return array
     */
    public function getProducts(): array
    {
        $maxIndex = max(array_map(fn($key) => intval($key), array_keys($this->products)));
        $products = [];
        for ($idx = 0; $idx <= $maxIndex; $idx++) {
            $products[] = $this->products[$idx] ?? [
                    'name' => '__NONE__',
                    'link' => '',
                    'id' => $idx,
                ];
        }

        return $products;
    }

    /**
     * @return array
     */
    public function getIncludes(): array
    {
        $maxIndex = max(array_map(fn($key) => intval($key), array_keys($this->includes)));
        $includes = [];
        for ($idx = 0; $idx <= $maxIndex; $idx++) {
            $includes[] = $this->includes[$idx] ?? [];
        }
        return $includes;
    }

    /**
     * @return array[]
     */
    public function getGenres(): array
    {
        $genreList = [];
        $subGenreList = [];
        foreach ($this->genres as $genreName => $subGenres) {
            $subGenreIds = [];
            foreach ($subGenres as $subGenreName => $productIds) {
                $subGenreIds[] = count($subGenreList);
                $subGenreList[] = [
                    'id' => count($subGenreList),
                    'name' => $subGenreName,
                    'products' => $productIds,
                ];
            }
            $genreList[] = [
                'id' => count($genreList),
                'name' => $genreName,
                'subGenres' => $subGenreIds,
            ];
        }
        return [
            'genre' => $genreList,
            'subGenre' => $subGenreList,
        ];
    }

}

/**
 * @throws Exception
 */
function main()
{

    $resolver = new RelationResolver();
    $components = loadTsv(__DIR__ . '/Components.tsv');
    foreach ($components as $component) {
        $resolver->addComponents($component);
    }

    $includes = loadTsv(__DIR__ . '/Includes.tsv');
    foreach ($includes as $include) {
        $resolver->addIncludes($include);
    }
    file_put_contents(__DIR__ . '/../src/data/versions.json', json_encode($resolver->getVersions()));
    file_put_contents(__DIR__ . '/../src/data/products.json', json_encode($resolver->getProducts()));
    file_put_contents(__DIR__ . '/../src/data/includes.json', json_encode($resolver->getIncludes()));
    file_put_contents(__DIR__ . '/../src/data/genres.json', json_encode($resolver->getGenres()));

}

main();