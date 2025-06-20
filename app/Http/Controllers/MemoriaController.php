<?php

namespace App\Http\Controllers;

use App\Models\Memoria;
use App\Models\Memorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MemoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Memorial $memorial)
    {
        return Inertia::render( 'Memoria/Form', [ 'memorial' => $memorial]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Memorial $memorial, Request $request)
    {
        try {
            DB::beginTransaction();

            $memoria = New Memoria();
            $memoria->nm_memoria   = $request->nm_memoria;
            $memoria->ds_memoria  = $request->ds_memoria;
            $memoria->dt_memoria  = $request->dt_memoria;
            $memoria->cd_memorial  = $memorial->cd_memorial;
            $memoria->ft_memoria  = json_encode($request->images);
            $memoria->save();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }

        return redirect(to: route('dashboard', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
