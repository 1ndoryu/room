<?php
// app/Http/Controllers/Auth/RegisterController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        Log::info('RegisterController store: Inicio del proceso de registro', ['request' => $request->all()]);

        $request->validate([
            'name'     => 'required|string|max:255',  // <-- Valida que se ingrese el nombre
            'username' => 'required|string|max:255',
            'email'    => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        Log::info('RegisterController store: Validación exitosa');

        $strapiUrl = env('STRAPI_URL', 'http://localhost:1337');
        $fullStrapiUrl = "$strapiUrl/api/auth/local/register";

        Log::info('RegisterController store: URL de Strapi', ['url' => $fullStrapiUrl]);

        try {
            $payload = [
                'name'     => $request->name,          // <-- Envío del nombre
                'username' => $request->username,
                'email'    => $request->email,
                'password' => $request->password,
            ];

            Log::info('RegisterController store: Datos que se enviarán a Strapi', ['payload' => $payload]);

            $response = Http::post($fullStrapiUrl, $payload);

            Log::info('RegisterController store: Respuesta de Strapi', ['status' => $response->status(), 'body' => $response->body()]);

            if ($response->successful()) {
                Log::info('RegisterController store: Registro exitoso en Strapi');
                return redirect()->route('login')->with('success', 'Registration successful!');
            } else {
                $error = $response->json();
                Log::error('RegisterController store: Error al registrar usuario en Strapi', ['response' => $error]);
                return back()->withErrors(['strapi' => $error['error']['message'] ?? 'Registration failed.']);
            }
        } catch (\Exception $e) {
            Log::critical('RegisterController store: Excepción al intentar registrar usuario', ['message' => $e->getMessage(), 'exception' => $e]);
            return back()->withErrors(['strapi' => 'Error de conexión con Strapi.']);
        }
    }
}
