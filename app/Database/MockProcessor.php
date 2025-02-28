<?php

namespace App\Database;

use Illuminate\Database\Query\Processors\MySqlProcessor;

class MockProcessor extends MySqlProcessor
{
    public function __construct()
    {
        // Intencionalmente vacío. No llamamos al constructor del padre.
    }
}