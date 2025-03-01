<?php
// routes/web.php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

// Ruta de inicio (página principal) - No requiere autenticación

Route::get('/', [HomeController::class, 'index'])->name('home');
// Rutas de autenticación para usuarios NO autenticados
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
    Route::get('/login', [LoginController::class, 'create'])->name('login');
});

// Rutas protegidas - solo para usuarios autenticados
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    // Rutas para las publicaciones
    Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
});

// Si estás usando un archivo auth.php separado (lo cual no es necesario en este caso)
// require __DIR__ . '/auth.php'; // Esta línea ya no es necesaria