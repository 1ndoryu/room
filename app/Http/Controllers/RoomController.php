<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RoomController extends Controller
{

    public function create()
    {
        Log::info('RoomController:create - Mostrando formulario de creación de habitación.');
        return Inertia::render('Rooms/Create'); // <-- ¡Esto renderiza tu componente React!
    }
    
    public function store(Request $request)
    {
        Log::info('RoomController:store - Iniciando proceso de creación de habitación.');

        $validatedData = $request->validate([
            'address' => 'required|string',
            'hide_address' => 'boolean',
            'property_type' => 'required|string',
            'rent' => 'required|integer',
            'bills_included' => 'boolean',
            'security_deposit' => 'required|integer',
            'available_on' => 'date',
            'preferred_gender' => 'string',
            'bathroom_type' => 'string',
            'parking' => 'boolean',
            'internet_access' => 'boolean',
            'private_room' => 'boolean',
            'furnished' => 'boolean',
            'accessible' => 'boolean',
            'lgbt_friendly' => 'boolean',
            'cannabis_friendly' => 'boolean',
            'cat_friendly' => 'boolean',
            'dog_friendly' => 'boolean',
            'children_friendly' => 'boolean',
            'student_friendly' => 'boolean',
            'senior_friendly' => 'boolean',
            'requires_background_check' => 'boolean',
            'description' => 'string',
            'roomies_description' => 'string',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'roomies' => 'required|integer',
            'minimum_stay' => 'integer',
            'maximum_stay' => 'integer',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('RoomController:store - Datos validados correctamente.', $validatedData);

        $dataForStrapi = [
            'data' => $validatedData
        ];

        $dataForStrapi['data']['hide_address'] = $dataForStrapi['data']['hide_address'] ?? false;
        $dataForStrapi['data']['bills_included'] = $dataForStrapi['data']['bills_included'] ?? false;
        $dataForStrapi['data']['parking'] = $dataForStrapi['data']['parking'] ?? false;
        $dataForStrapi['data']['internet_access'] = $dataForStrapi['data']['internet_access'] ?? false;
        $dataForStrapi['data']['private_room'] = $dataForStrapi['data']['private_room'] ?? false;
        $dataForStrapi['data']['furnished'] = $dataForStrapi['data']['furnished'] ?? false;
        $dataForStrapi['data']['accessible'] = $dataForStrapi['data']['accessible'] ?? false;
        $dataForStrapi['data']['lgbt_friendly'] = $dataForStrapi['data']['lgbt_friendly'] ?? false;
        $dataForStrapi['data']['cannabis_friendly'] = $dataForStrapi['data']['cannabis_friendly'] ?? false;
        $dataForStrapi['data']['cat_friendly'] = $dataForStrapi['data']['cat_friendly'] ?? false;
        $dataForStrapi['data']['dog_friendly'] = $dataForStrapi['data']['dog_friendly'] ?? false;
        $dataForStrapi['data']['children_friendly'] = $dataForStrapi['data']['children_friendly'] ?? false;
        $dataForStrapi['data']['student_friendly'] = $dataForStrapi['data']['student_friendly'] ?? false;
        $dataForStrapi['data']['senior_friendly'] = $dataForStrapi['data']['senior_friendly'] ?? false;
        $dataForStrapi['data']['requires_background_check'] = $dataForStrapi['data']['requires_background_check'] ?? false;

        Log::info('RoomController:store - Datos preparados para Strapi.', $dataForStrapi);

        $imageUrls = [];

        if ($request->hasFile('images')) {
            Log::info('RoomController:store - Procesando imágenes.');
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('public/uploads');
                $imageUrl = asset(str_replace('public/', 'storage/', $imagePath));
                $imageUrls[] = $imageUrl;
                Log::info("RoomController:store - Imagen procesada: $imageUrl");
            }
            $dataForStrapi['data']['images'] = $imageUrls;
            Log::info('RoomController:store - URLs de imágenes añadidas a los datos de Strapi.', ['imageUrls' => $imageUrls]);
        }


        $strapiUrl = env('STRAPI_URL') . '/api/rooms';
        $strapiToken = env('STRAPI_TOKEN');

        Log::info("RoomController:store - Enviando datos a Strapi: $strapiUrl");

        $response = Http::withToken($strapiToken)->post($strapiUrl, $dataForStrapi);

        if ($response->successful()) {
            Log::info('RoomController:store - Habitación creada con éxito en Strapi.', $response->json());
            return Inertia::redirect(route('rooms.index'))->with('success', 'Room creado: La habitación se ha creado con éxito en Strapi.');
        } else {
            Log::error('RoomController:store - Error al crear la habitación en Strapi.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return back()->withErrors(['strapi' => "RoomController:store - Error al crear la habitación en Strapi: " . $response->body()]);
        }
    }
}
