<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\GestionController;
use App\Http\Controllers\AttributionsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [UserController::class, 'store']);
Route::post("login", [UserController::class, 'login']);


    Route::prefix('postes')->group(function () {
        Route::get("/", [GestionController::class, 'index']);
        Route::post('/add', [GestionController::class, 'store']);
        Route::delete('/{id}', [GestionController::class, 'destroy']);
    });

    Route::prefix('clients')->group(function () {
        Route::get("/", [ClientsController::class, 'index']);
        Route::post('/', [ClientsController::class, 'store']);
    });

    Route::prefix('attributions')->group(function () {
        Route::post("/", [AttributionsController::class, 'store']);
        Route::delete('/', [AttributionsController::class, 'delete']);
    });
Route::group(['middleware' => 'auth:api'], function () {
    Route::get("logout", [UserController::class, 'logout']);
});