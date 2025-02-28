<?php
// app/Http/Controllers/Auth/LoginController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use App\Models\AuthenticatedUser;

class LoginController extends Controller
{
    public function create()
    {
        if (Auth::check()) {
            return redirect('/dashboard');
        }

        return Inertia::render('Auth/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        $strapiUrl = env('STRAPI_URL', 'http://localhost:1337');
        $fullStrapiUrl = "$strapiUrl/api/auth/local";

        try {
            $response = Http::post($fullStrapiUrl, [
                'identifier' => $request->email,
                'password'   => $request->password,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $jwt = $data['jwt'];
                $user = $data['user'];

                session([
                    'jwt' => $jwt,
                    'user_data' => $user
                ]);

                $authUser = new AuthenticatedUser();
                $authUser->id = $user['id'];
                $authUser->username = $user['username'];
                $authUser->email = $user['email'];

                Auth::login($authUser, true);

                return redirect()->intended('/dashboard');
            } else {
                $error = $response->json();
                Log::error('LoginController store: Error al iniciar sesión', ['response' => $error]);
                return back()->withErrors(['email' => $error['error']['message'] ?? 'Invalid credentials.']);
            }
        } catch (\Exception $e) {
            Log::critical('LoginController store: Excepción al intentar iniciar sesión', ['message' => $e->getMessage()]);
            return back()->withErrors(['email' => 'Error de conexión con Strapi.']);
        }
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
