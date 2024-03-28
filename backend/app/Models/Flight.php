<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $table = 'flights';

    protected $fillable = [
        'company_id',
        'code',
        'departure_code',
        'arrival_code',
        'plan_departure',
        'plan_arrival',
        'fact_departure',
        'fact_arrival',
        'departure_delay_minutes',
        'arrival_delay_minutes',
        'solidity_arrival',
        'solidity_departure',
        'checked',
        'is_late',
        'rating'
    ];
}
