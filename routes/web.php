<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\MemoriaController;
use App\Http\Controllers\MemorialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\S3Controller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use League\CommonMark\Extension\SmartPunct\DashParser;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
*/
Route::get('/dashboard', action: [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/memorial/{memorial}/perfil', [MemorialController::class, 'memorial'])->name('memorial.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::prefix('perfil')->group(function () {
            Route::get('/', action: [MemorialController::class, 'index'])->name('perfil.index');
            Route::post('/gerar-qr', [MemorialController::class, 'gerarQR']);
        });

        //Memorial
        Route::prefix('memorial')->group(function () {
            Route::get('/criar', [MemorialController::class, 'create'])
                ->name('memorial.create');
            Route::post('/salvar', [MemorialController::class, 'store'])
                ->name('memorial.store');

            Route::get('/{memorial}/editar/', [MemorialController::class, 'edit'])
                ->name('memorial.edit');
            Route::match(['PUT', 'PATCH'], '/{memorial}/salvar', [MemorialController::class, 'update'])
                ->name('memorial.update');

            Route::get('/{memorial}/memoria/criar', [MemoriaController::class, 'create'])->name('memoria.create');
            Route::post('/{memorial}/memoria/salvar', [MemoriaController::class, 'store'])->name('memoria.store');
        });

        //FAMILIA
        Route::prefix('familia')->group(function () {
            Route::get('/criar', [FamiliaController::class, 'create'])
                ->name('familia.create');
            Route::post('/salvar', [FamiliaController::class, 'store'])
                ->name('familia.store');
            Route::get('/{familia}/editar/', [FamiliaController::class, 'edit'])
                ->name('familia.edit');
            Route::match(['PUT', 'PATCH'], '/{familia}/salvar', [FamiliaController::class, 'update'])
                ->name('familia.update');
        });

});

//Teste CORS
Route::resource('lancamento-versao', S3Controller::class)->except('show');
Route::get('/presigned-url-apk', [S3Controller::class, 'urlAPK']);

Route::resource('teste-queue', QueueController::class)->except('show');

Route::get('/teste', function () {
    return 'Servidor funcionando!';
});


require __DIR__.'/auth.php';
