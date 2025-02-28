<?php

namespace App\Database;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;

class MockQueryBuilder extends Builder
{
    public function get($columns = ['*'])
    {
        // Simula el comportamiento de get() devolviendo una colección vacía.
        return new Collection([]);
    }
}