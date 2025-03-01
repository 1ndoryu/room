<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;

class RoomController extends Controller
{
    public function index()
    {





        Log::info('RoomController:index - Iniciando la función index.');

        $strapiUrl = env('STRAPI_URL') . '/api/rooms';
        $strapiToken = env('STRAPI_TOKEN');

        Log::info("RoomController:index - Strapi URL: $strapiUrl");
        Log::info("RoomController:index - Strapi Token: $strapiToken");

        $response = Http::withToken($strapiToken)->get($strapiUrl, [
            'populate' => ['images', 'user']
        ]);

        if ($response->successful()) {
            $responseData = $response->json();
            Log::info('RoomController:index - Respuesta completa de Strapi:', $responseData);

            //  Verificar si la clave 'data' existe en la respuesta.
            if (!isset($responseData['data'])) {
                Log::error('RoomController:index - La respuesta de Strapi no contiene la clave "data".', ['response' => $responseData]);
                return back()->withErrors(['strapi' => 'La respuesta de Strapi no contiene la información esperada.']);
            }

            $rooms = $responseData['data'];
            Log::info('RoomController:index - Habitaciones obtenidas de Strapi (solo la clave data):', ['rooms' => $rooms]);


            foreach ($rooms as &$room) {
                $room['imageUrls'] = [];
                Log::info("RoomController:index - Procesando habitación con ID: {$room['id']}");


                if (isset($room['attributes']['images']['data']) && is_array($room['attributes']['images']['data'])) {
                    Log::info("RoomController:index - La habitacion si tiene imagenes", ['room_id' => $room['id']]);
                    foreach ($room['attributes']['images']['data'] as $image) {
                        Log::info("RoomController:index - Procesando imagen:", ['image' => $image]); //log de la imagen
                        if (is_array($image) && isset($image['attributes']['url'])) {
                            $imageUrl = env('STRAPI_URL') . $image['attributes']['url'];
                            $room['imageUrls'][] = $imageUrl;
                            Log::info("RoomController:index - URL de la imagen: $imageUrl");
                        } else {
                            Log::warning('RoomController:index - Datos de imagen no válidos o URL faltante.', ['image' => $image]);
                        }
                    }
                } else { //Este else se ejecuta si no existe data
                    Log::warning('RoomController:index - La habitación no tiene imágenes o el formato no es el esperado.', ['room_id' => $room['id'], 'room' => $room]);
                }
                Log::info("RoomController:index - Imagenes URL de la habitacion :", ['urls' => $room['imageUrls']]);
            }
            unset($room);


            Log::info('RoomController:index - URLs de imágenes procesadas para todas las habitaciones.', ['rooms' => $rooms]);


            return Inertia::render('Rooms/Index', [
                'rooms' => $rooms,
                'appUrl' => App::environment('local') ? env('STRAPI_URL') : '', // Usar el Facade App
            ]);
        } else {
            Log::error('RoomController:index - Error al obtener habitaciones de Strapi.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return back()->withErrors(['strapi' => 'Error al obtener las habitaciones de Strapi.']);
        }
    }

    public function create()
    {
        Log::info('RoomController:create - Mostrando el formulario de creación de habitación.');
        return Inertia::render('Rooms/Create');
    }


    public function store(Request $request)
    {
        Log::info('RoomController:store - Iniciando el proceso de creación de habitación.');

        $validatedData = $request->validate([
            'address' => 'required|string',
            'hide_address' => 'required|boolean',
            'property_type' => 'required|string',
            'rent' => 'required|integer',
            'bills_included' => 'required|boolean',
            'security_deposit' => 'required|integer',
            'available_on' => 'required|date',
            'preferred_gender' => 'required|string',
            'bathroom_type' => 'required|string',
            'parking' => 'required|boolean',
            'internet_access' => 'required|boolean',
            'private_room' => 'required|boolean',
            'furnished' => 'required|boolean',
            'accessible' => 'required|boolean',
            'lgbt_friendly' => 'required|boolean',
            'cannabis_friendly' => 'required|boolean',
            'cat_friendly' => 'required|boolean',
            'dog_friendly' => 'required|boolean',
            'children_friendly' => 'required|boolean',
            'student_friendly' => 'required|boolean',
            'senior_friendly' => 'required|boolean',
            'requires_background_check' => 'required|boolean',
            'description' => 'required|string',
            'roomies_description' => 'required|string',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'roomies' => 'required|integer',
            'minimum_stay' => 'required|integer',
            'maximum_stay' => 'required|integer',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('RoomController:store - Datos validados exitosamente.');

        $userId = Auth::id();
        Log::info("RoomController:store - ID de usuario autenticado: $userId");

        $strapiToken = env('STRAPI_TOKEN');
        $strapiUploadUrl = env('STRAPI_URL') . '/api/upload';
        $imageIds = [];

        if ($request->hasFile('images')) {
            Log::info('RoomController:store - Procesando imágenes.');
            foreach ($request->file('images') as $image) {
                try {
                    $imageResponse = Http::withToken($strapiToken)
                        ->attach('files', file_get_contents($image->getPathname()), $image->getClientOriginalName())
                        ->post($strapiUploadUrl);

                    if ($imageResponse->successful()) {
                        $imageData = $imageResponse->json();
                        Log::info('RoomController:store - Respuesta completa de Strapi al subir imagen:', $imageData);

                        //  Acceder al primer elemento del array $imageData.
                        if (isset($imageData[0]) && isset($imageData[0]['id'])) {
                            $imageIds[] = $imageData[0]['id'];
                            Log::info("RoomController:store - Imagen procesada y subida a Strapi con ID: {$imageData[0]['id']}");
                        } else {
                            Log::error('RoomController:store - La respuesta de Strapi no contiene el ID de la imagen.', $imageData);
                            throw new \Exception('La respuesta de Strapi no contiene el ID de la imagen.');
                        }
                    } else {
                        $statusCode = $imageResponse->status();
                        $responseBody = $imageResponse->body();
                        Log::error("RoomController:store - Error al subir imagen a Strapi. Código: $statusCode, Respuesta: $responseBody");
                        throw new \Exception('Error al subir la imagen a Strapi: ' . $imageResponse->body());
                    }
                } catch (\Exception $e) {
                    Log::error('RoomController:store - ' . $e->getMessage());
                    return back()->withErrors(['strapi' => $e->getMessage()]);
                }
            }
        } else {
            Log::info('RoomController:store - No se proporcionaron imágenes para subir.');
        }

        $dataForStrapi = [
            'data' => [
                'address' => $validatedData['address'],
                'hide_address' => $validatedData['hide_address'],
                'property_type' => $validatedData['property_type'],
                'rent' => $validatedData['rent'],
                'bills_included' => $validatedData['bills_included'],
                'security_deposit' => $validatedData['security_deposit'],
                'available_on' => $validatedData['available_on'],
                'preferred_gender' => $validatedData['preferred_gender'],
                'bathroom_type' => $validatedData['bathroom_type'],
                'parking' => $validatedData['parking'],
                'internet_access' => $validatedData['internet_access'],
                'private_room' => $validatedData['private_room'],
                'furnished' => $validatedData['furnished'],
                'accessible' => $validatedData['accessible'],
                'lgbt_friendly' => $validatedData['lgbt_friendly'],
                'cannabis_friendly' => $validatedData['cannabis_friendly'],
                'cat_friendly' => $validatedData['cat_friendly'],
                'dog_friendly' => $validatedData['dog_friendly'],
                'children_friendly' => $validatedData['children_friendly'],
                'student_friendly' => $validatedData['student_friendly'],
                'senior_friendly' => $validatedData['senior_friendly'],
                'requires_background_check' => $validatedData['requires_background_check'],
                'description' => $validatedData['description'],
                'roomies_description' => $validatedData['roomies_description'],
                'bedrooms' => $validatedData['bedrooms'],
                'bathrooms' => $validatedData['bathrooms'],
                'roomies' => $validatedData['roomies'],
                'minimum_stay' => $validatedData['minimum_stay'],
                'maximum_stay' => $validatedData['maximum_stay'],
                'user' => $userId,
                'images' => $imageIds,
            ],
        ];

        Log::info('RoomController:store - Datos preparados para Strapi.', $dataForStrapi);

        $strapiUrl = env('STRAPI_URL') . '/api/rooms';

        Log::info("RoomController:store - Enviando datos a Strapi: $strapiUrl");
        Log::info("RoomController:store - Strapi Token: $strapiToken");

        try {
            $response = Http::withToken($strapiToken)->post($strapiUrl, $dataForStrapi);

            if ($response->successful()) {
                Log::info('RoomController:store - Habitación creada con éxito en Strapi.', $response->json());
                return redirect()->route('rooms.index')->with('success', 'Habitación creada: La habitación se ha creado con éxito en Strapi.');
            } else {
                $statusCode = $response->status();
                $responseBody = $response->body();
                Log::error("RoomController:store - Error al crear habitacion en Strapi. Código: $statusCode, Respuesta: $responseBody");
                throw new \Exception("Error al crear la habitación en Strapi. Código: $statusCode, Respuesta: $responseBody");
            }
        } catch (\Exception $e) {
            Log::error('RoomController:store - ' . $e->getMessage());
            return back()->withErrors(['strapi' => $e->getMessage()]);
        }
    }
}
