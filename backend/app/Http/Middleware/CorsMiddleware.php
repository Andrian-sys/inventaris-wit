<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Get the origin from the request
        $origin = $request->header('Origin');
        
                        // Allow localhost origins for development
                $allowedOrigins = [
                    'http://localhost:5173',
                    'http://localhost:3000',
                    'http://localhost:5174',
                    'http://localhost:5175'
                ];

                // Check if origin is allowed
                if (in_array($origin, $allowedOrigins)) {
                    $response->headers->set('Access-Control-Allow-Origin', $origin);
                } else {
                    $response->headers->set('Access-Control-Allow-Origin', '*');
                }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers');
        $response->headers->set('Access-Control-Allow-Credentials', 'false');
        $response->headers->set('Access-Control-Max-Age', '86400');

        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            $response->setStatusCode(200);
            $response->setContent('');
        }

        return $response;
    }
}
