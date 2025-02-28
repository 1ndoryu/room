<?php
// app/Providers/SessionUserProvider.php
namespace App\Providers;

use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Models\AuthenticatedUser;

class SessionUserProvider implements UserProvider
{
    /**
     * Si se requiere rehash, en este caso retornamos false.
     */
    public function rehashPasswordIfRequired(Authenticatable $user, array $credentials, bool $force = false): bool
    {
        return false;
    }


    /**
     * Recupera al usuario por su identificador almacenado en sesión.
     */
    public function retrieveById($identifier)
    {
        $userData = session('user_data');
        if ($userData && $userData['id'] == $identifier) {
            $user = new AuthenticatedUser();
            $user->id = $userData['id'];
            $user->username = $userData['username'];
            $user->email = $userData['email'];
            return $user;
        }
        return null;
    }

    /**
     * No se implementa, ya que no usamos "remember me" con JWT.
     */
    public function retrieveByToken($identifier, $token)
    {
        return null;
    }

    /**
     * No se implementa, ya que no usamos "remember me" con JWT.
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
        // No es necesario para este caso.
    }

    /**
     * No se implementa, ya que la autenticación se maneja vía JWT.
     */
    public function retrieveByCredentials(array $credentials)
    {
        // No se necesita en este caso.
    }

    /**
     * No se implementa, ya que la validación se hace a través de JWT.
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        // No se necesita en este caso.
    }
}
