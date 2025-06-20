<?php

namespace App\Http\Controllers;

use App\Models\Familia;
use App\Models\Memoria;
use App\Models\Memorial;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Endroid\QrCode\QrCode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MemorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(component: 'Perfil');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $familia = Familia::where('cd_usuario', '=', Auth::user()->id)->get();

        return Inertia::render( 'Adicionar', [ 'familia' => $familia]);
    }

    public function gerarQR(Request $request)
    {
        $request->validate([
            'ds_link' => 'required|string',
        ]);

        $data = 'http://192.168.1.9:8000' . $request->ds_link;

        $qrCode = QrCode::create($data)
            ->setSize(200)
            ->setMargin(10);

        $writer = new PngWriter();

        $result = $writer->write($qrCode);

        $fileName = 'qr-' . uniqid() . '.png';
        $path = 'qrcodes/' . $fileName;

        Storage::disk('public')->put($path, $result->getString());

        return response()->json([
            'qrCodeUrl' => asset('storage/' . $path),
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $memorial = New Memorial();
            $memorial->nm_falecido    = $request->nm_falecido;
            $memorial->dt_nascimento  = $request->date_nascimento;
            $memorial->dt_falecimento = $request->date_falecimento;
            $memorial->ds_historia    = $request->description;
            $memorial->cd_familia     = $request->cd_familia;
            $memorial->ft_memorial    = $request->images[0];
            $memorial->cd_usuario     = Auth::user()->id;
            $memorial->ds_link        = 'a';
            $memorial->save();
                       
            $memorial->ds_link        = '/memorial/' . $memorial->cd_memorial . '/perfil';
            $memorial->save();


            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }

        return redirect(to: route('dashboard', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function memorial(string $id)
    {
        $memorial = Memorial::where( 'cd_memorial', '=', $id)->first();
        $memoria = Memoria::where( 'cd_memorial', '=', $id)->get();
        $membrosFamilia = Memorial::membrosFamilia($memorial->cd_familia, $memorial->cd_memorial);

        return Inertia::render( 'Perfil', [ 'memorial' => $memorial, 
                                                            'memoria' => $memoria,
                                                            'membrosFamilia' => $membrosFamilia]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Memorial $memorial)
    {
        $familia = Familia::where('cd_usuario', '=', Auth::user()->id)->get();

        return Inertia::render( 'Adicionar', [ 'memorial' => $memorial, 'familia' => $familia]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Memorial $memorial)
    {
        try {
            DB::beginTransaction();

            $memorial->nm_falecido    = $request->nm_falecido;
            $memorial->dt_nascimento  = $request->date_nascimento;
            $memorial->dt_falecimento = $request->date_falecimento;
            $memorial->ds_historia    = $request->description;
            $memorial->cd_familia     = $request->cd_familia;
            if(isset($request->images[0])){
                $memorial->ft_memorial    = $request->images[0];
            }
            $memorial->save();

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
