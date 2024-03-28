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

Route::get('/api/companies', [CompanyController::class, 'index']);
Route::post('/api/companies', [CompanyController::class, 'store']);
Route::get('/api/companies/{company}', [CompanyController::class, 'show']);
Route::put('/api/companies/{company}', [CompanyController::class, 'update']);
Route::delete('/api/companies/{company}', [CompanyController::class, 'destroy']);

Route::get('/api/flights', [FlightController::class, 'index']);
Route::post('/api/flights', [FlightController::class, 'store']);
Route::get('/api/flights/{flight}', [FlightController::class, 'show']);
Route::put('/api/flights/{flight}', [FlightController::class, 'update']);
Route::delete('/api/flights/{flight}', [FlightController::class, 'destroy']);
