<?php
// routes/auth.php

use App\Http\Controllers\Auth\RegisterController; // Usaremos el que creamos antes
use App\Http\Controllers\Auth\LoginController;    // Lo crearemos ahora
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Rutas de registro (ya implementadas)
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    // Rutas de inicio de sesión (las crearemos)
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.store'); 
});


Route::middleware('auth')->group(function () {
    // Ruta de logout (la crearemos)
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
});
