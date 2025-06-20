<?php

namespace App\Http\Controllers;

use App\Models\Familia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FamiliaController extends Controller
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
    public function create()
    {
        return Inertia::render(component: 'Familia/Adicionar');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $familia = New Familia();
            $familia->nm_familia   = $request->nm_familia;
            $familia->ds_familia   = $request->ds_familia;
            $familia->cd_usuario   = Auth::user()->id;
            $familia->save();

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
    public function edit(Familia $familia)
    {
        return Inertia::render('Familia/Adicionar', ['familia' => $familia]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Familia $familia)
    {
        try {
            DB::beginTransaction();

            $familia->nm_familia   = $request->nm_familia;
            $familia->ds_familia   = $request->ds_familia;
            $familia->save();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }

        return redirect(to: route('dashboard', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
