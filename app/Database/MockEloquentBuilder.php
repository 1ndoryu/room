<?php
namespace App\Database;

use Illuminate\Database\Eloquent\Builder;

class MockEloquentBuilder extends Builder
{
    public function first($columns = ['*'])
    {
        return null;
    }
}