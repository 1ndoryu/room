<?php
// app/Http/Middleware/HandleInertiaRequests.php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [ // Usa array_merge con parent::share
            'auth' => [
                'user' => Auth::check() ? [
                    'id' => Auth::user()->id,
                    'username' => Auth::user()->username,
                    'email' => Auth::user()->email,
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'), // Usa $request->session()
                'error' => $request->session()->get('error'),   // Usa $request->session()
            ],
            // Ya no necesitas esto, se incluye en parent::share
            // 'errors' => function () use ($request) {
            //     return $request->session()->get('errors')
            //         ? $request->session()->get('errors')->getBag('default')->getMessages()
            //         : (object) [];
            // },
        ]);
    }
}
