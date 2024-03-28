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
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('id')->on('companies');
            $table->string('code')->nullable();
            $table->string('departure_code')->nullable();
            $table->foreign('departure_code')->references('code')->on('airports');
            $table->string('arrival_code')->nullable();
            $table->foreign('arrival_code')->references('code')->on('airports');
            $table->timestamp('plan_departure')->nullable();
            $table->timestamp('plan_arrival')->nullable();
            $table->timestamp('fact_departure')->nullable();
            $table->timestamp('fact_arrival')->nullable();
            $table->float('departure_delay_minutes')->nullable();
            $table->float('arrival_delay_minutes')->nullable();
            $table->float('solidity_arrival')->nullable();
            $table->float('solidity_departure')->nullable();
            $table->boolean('checked')->default(false);
            $table->boolean('is_late')->default(false);
            $table->float('rating')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
