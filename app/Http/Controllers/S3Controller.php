<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Aws\S3\S3Client;

class S3Controller extends Controller
{

    function PresignedURL($nomeArquivo, $pasta ,$contentType) {

        $s3 = new S3Client([
            'region' => env('AWS_DEFAULT_REGION'),
            'version' => 'latest',
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);

        $cmd = $s3->getCommand('PutObject', [
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $pasta . '/'. $nomeArquivo, // Caminho/nome do arquivo no S3
            'ContentType' => $contentType, // Tipo MIME do arquivo
        ]);

        $request = $s3->createPresignedRequest($cmd, '+30 minutes');

        return response()->json(['url' => (string) $request->getUri()]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('s3.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
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

    public function urlAPK(Request $request){

        $PresignedURL = $this->PresignedURL($request->nomeArquivo, 'atualizacao_apk', $request->contentType);
        return $PresignedURL;
    }
}
