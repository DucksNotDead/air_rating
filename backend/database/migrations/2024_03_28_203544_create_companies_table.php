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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60);
            $table->string('full_name', 100)->nullable();
            $table->integer('avg_rating')->nullable();
            $table->float('avg_arrival_delay_minutes')->nullable();
            $table->float('avg_delay_departure')->nullable();
            $table->bigInteger('cnt_flights')->nullable();
            $table->float('avg_solidity_departure')->nullable();
            $table->float('avg_solidity_arrival')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
