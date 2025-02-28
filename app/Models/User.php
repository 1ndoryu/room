<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class User implements Authenticatable
{
    use AuthenticatableTrait;

    public $id;
    public $username;
    public $email;
    // public $password; // No necesitamos la contraseña aquí

    public function __construct(array $attributes = [])  // Constructor
    {
        foreach ($attributes as $key => $value) {
            //Verifica que la propiedad exista.
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
        if (isset($attributes['id'])) { 
            $this->id = $attributes['id'];
        }
    }
}
