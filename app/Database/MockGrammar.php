<?php

namespace App\Database;

use Illuminate\Database\Query\Grammars\MySqlGrammar;

class MockGrammar extends MySqlGrammar
{
    public function __construct()
    {
        // Intencionalmente vacío. No llamamos al constructor del padre.
    }
}