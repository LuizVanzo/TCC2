<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('familia', function (Blueprint $table) {
            $table->id('cd_familia');
            $table->text('nm_familia')->nullable();
            $table->text('ds_familia');
            $table->integer('cd_usuario');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();


            // Chaves estrangeiras
            $table->foreign('cd_usuario')
                  ->references('cd_usuario')
                  ->on('usuario')
                  ->onDelete('cascade')
                  ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('familia');
    }
};
