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
        Schema::create('memoria', function (Blueprint $table) {
            $table->id('cd_memoria');
            $table->text('nm_memoria')->nullable();
            $table->text('ds_memoria');
            $table->date('dt_memoria');
            $table->text('ft_memoria')->nullable();
            $table->integer('cd_memorial')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('cd_memorial')
                  ->references('cd_memorial')
                  ->on('memorial')
                  ->onDelete('set null')
                  ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memoria');
    }
};
