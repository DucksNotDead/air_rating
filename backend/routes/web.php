<?php

use App\Http\Controllers\AirportController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FlightController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/test', function () {
    $process = new Process(['python3', __DIR__.'/test.py']);
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }

    echo $process->getOutput();

    $companys = DB::table('airports')->limit(10)->get();

    dd($companys);
});

Route::get('/api/airports', [AirportController::class, 'index']);
Route::post('/api/airports', [AirportController::class, 'store']);
Route::get('/api/airports/{airport}', [AirportController::class, 'show']);
Route::put('/api/airports/{airport}', [AirportController::class, 'update']);
Route::delete('/api/airports/{airport}', [AirportController::class, 'destroy']);

Route::get('/api/companies', [AirportController::class, 'index']);
Route::post('/api/companies', [AirportController::class, 'store']);
Route::get('/api/companies/{company}', [AirportController::class, 'show']);
Route::put('/api/companies/{company}', [AirportController::class, 'update']);
Route::delete('/api/companies/{company}', [AirportController::class, 'destroy']);

Route::get('/api/flights', [AirportController::class, 'index']);
Route::post('/api/flights', [AirportController::class, 'store']);
Route::get('/api/flights/{flight}', [AirportController::class, 'show']);
Route::put('/api/flights/{flight}', [AirportController::class, 'update']);
Route::delete('/api/flights/{flight}', [AirportController::class, 'destroy']);
