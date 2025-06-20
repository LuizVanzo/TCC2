<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
Schema::create('memorial', function (Blueprint $table) {
            $table->id('cd_memorial');
            $table->text('nm_falecido');
            $table->date('dt_nascimento');
            $table->date('dt_falecimento');
            $table->text('ds_link')->unique();
            $table->text('ft_memorial')->nullable();
            $table->text('ds_historia')->nullable();
            $table->integer('cd_usuario');
            $table->integer('cd_familia')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();


            // Chaves estrangeiras
            $table->foreign('cd_usuario')
                  ->references('cd_usuario')
                  ->on('usuario')
                  ->onDelete('cascade')
                  ->onUpdate('no action');

            $table->foreign('cd_familia')
                  ->references('cd_familia')
                  ->on('familia')
                  ->onDelete('set null')
                  ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memorial');
    }
};
