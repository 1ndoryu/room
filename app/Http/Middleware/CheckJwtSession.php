<?php
// app/Http/Middleware/CheckJwtSession.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AuthenticatedUser;
use Illuminate\Support\Facades\Log;

class CheckJwtSession
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check() && session()->has('jwt')) {
            if (session()->has('user_data')) {
                $userData = session('user_data');

                $user = new AuthenticatedUser();
                $user->id = $userData['id'];
                $user->username = $userData['username'];
                $user->email = $userData['email'];

                Auth::login($user, true);

            } else {
                Log::warning('CheckJwtSession handle: JWT en sesión, pero sin datos de usuario.');
            }
        }

        return $next($request);
    }
}