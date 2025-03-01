<?php
// app/Http/Controllers/HomeController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;


class HomeController extends Controller
{
    public function index()
    {
        Log::info('HomeController:index - Iniciando la función index.');

        $strapiUrl = env('STRAPI_URL') . '/api/rooms';
        $strapiToken = env('STRAPI_TOKEN');

        Log::info("HomeController:index - Strapi URL: $strapiUrl");
        Log::info("HomeController:index - Strapi Token: $strapiToken");

        $response = Http::withToken($strapiToken)->get($strapiUrl, [
            'populate' => ['images', 'user']
        ]);

        if (!$response->successful()) {
            Log::error('HomeController:index - Error al obtener habitaciones de Strapi.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return back()->withErrors(['strapi' => 'Error al obtener las habitaciones de Strapi.']);
        }

        $responseData = $response->json();
        if (!isset($responseData['data'])) {
            Log::error('HomeController:index - La respuesta de Strapi no contiene la clave "data".', ['response' => $responseData]);
            return back()->withErrors(['strapi' => 'La respuesta de Strapi no contiene la información esperada.']);
        }

        $rooms = $responseData['data'];
        Log::info('HomeController:index - Habitaciones obtenidas de Strapi (solo la clave data):', ['rooms' => $rooms]);

        foreach ($rooms as &$room) {
            $room['imageUrls'] = [];
            Log::info("HomeController:index - Procesando habitación con ID: {$room['id']}");

            if (isset($room['attributes']['images']['data']) && is_array($room['attributes']['images']['data'])) {
                Log::info("HomeController:index - La habitacion si tiene imagenes", ['room_id' => $room['id']]);
                foreach ($room['attributes']['images']['data'] as $image) {
                    Log::info("HomeController:index - Procesando imagen:", ['image' => $image]);
                    if (is_array($image) && isset($image['attributes']['url'])) {
                        $imageUrl = env('STRAPI_URL') . $image['attributes']['url'];
                        $room['imageUrls'][] = $imageUrl;
                        Log::info("HomeController:index - URL de la imagen: $imageUrl");
                    } else {
                        Log::warning('HomeController:index - Datos de imagen no válidos o URL faltante en imagen.', ['image' => $image]); // Log mas especifico
                    }
                }
            } else {
                Log::info('HomeController:index - La habitación no tiene imágenes o no están en el formato esperado.', ['room_id' => $room['id'], 'room' => $room]); // Cambiado a info porque puede ser normal que no haya imagenes
            }
            Log::info("HomeController:index - Imagenes URL de la habitacion :", ['urls' => $room['imageUrls']]);
        }
        unset($room);

        Log::info('HomeController:index - URLs de imágenes procesadas para todas las habitaciones.', ['rooms' => $rooms]);

        return Inertia::render('Home', [
            'rooms' => $rooms,
            'appUrl' => App::environment('local') ? env('STRAPI_URL') : '',
        ]);
    }
}