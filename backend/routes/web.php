<?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/test', function () {
    $process = new Process(['python3', __DIR__.'/test.py']);
    $process->run();

    // executes after the command finishes
    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }

    echo $process->getOutput();
});
