LoginController y RegisterController (Controladores de Autenticación):

Estos controladores gestionan las peticiones de login y registro.

Interactúan con la API de Strapi (/api/auth/local/register y /api/auth/local) para crear y autenticar usuarios.

En caso de éxito, LoginController almacena el JWT y los datos del usuario en la sesión de Laravel y utiliza Auth::login() para establecer la sesión de autenticación de Laravel con el modelo.

RegisterController simplemente registra al usuario en Strapi.

SessionUserProvider (Proveedor de Usuario Personalizado):

Implementa la interfaz UserProvider de Laravel.

retrieveById: Es el método clave. Recupera los datos del usuario de la sesión de Laravel (session('user_data')) basándose en el ID. Esto evita tener que consultar Strapi en cada petición una vez que el usuario ya está autenticado.

Los otros métodos (retrieveByToken, retrieveByCredentials, validateCredentials) no se implementan, ya que la autenticación se basa en JWT y la sesión.

AuthenticatedUser (Modelo de Usuario):

Implementa la interfaz Authenticatable de Laravel.

Representa al usuario autenticado.

Importante: No interactúa con una base de datos tradicional. En su lugar, utiliza clases Mock (MockQueryBuilder, MockEloquentBuilder, etc.) para simular el comportamiento de Eloquent (el ORM de Laravel). Esto es crucial para que funcione con el proveedor de sesión personalizado.

Se usa para tener las funciones de laravel para autenticacion, pero no interactua con la base de datos, los datos se sacan de session.

CheckJwtSession (Middleware):

Verifica si hay un JWT en la sesión y si el usuario no está ya autenticado en Laravel (!Auth::check()).

Si ambas condiciones son verdaderas, recupera los datos del usuario de la sesión y utiliza Auth::login() para autenticar al usuario en Laravel, de forma similar a como lo hace LoginController. Esto asegura que la sesión de Laravel se mantenga sincronizada con la sesión basada en JWT.

HandleInertiaRequests (Middleware):

Middleware estándar de Inertia.js.

share: Comparte datos con todas las vistas de Inertia (React). Aquí se expone la información del usuario autenticado (auth.user) a las vistas, permitiendo que la interfaz de usuario reaccione al estado de autenticación.

Flujo de Autenticación (Simplificado)

Login: El usuario introduce sus credenciales.

LoginController: Envía las credenciales a Strapi.

Strapi: Valida las credenciales y devuelve un JWT y datos del usuario.

LoginController: Almacena el JWT y los datos del usuario en la sesión de Laravel. Utiliza Auth::login() con una instancia de AuthenticatedUser para establecer la sesión de autenticación de Laravel.

Peticiones Subsecuentes:

CheckJwtSession: Verifica el JWT en la sesión y, si es necesario, autentica al usuario en Laravel usando Auth::login().

SessionUserProvider: retrieveById recupera la información del usuario de la sesión, no de Strapi.

HandleInertiaRequests: Comparte la información del usuario con las vistas de Inertia.
