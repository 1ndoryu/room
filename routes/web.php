<?php
// routes/web.php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use Inertia\Inertia;

// Ruta de inicio (página principal) - No requiere autenticación
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Rutas de autenticación para usuarios NO autenticados
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);

    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

// Rutas protegidas - solo para usuarios autenticados
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    // Rutas para las publicaciones
    Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
});

// Si estás usando un archivo auth.php separado (lo cual no es necesario en este caso)
// require __DIR__ . '/auth.php'; // Esta línea ya no es necesaria