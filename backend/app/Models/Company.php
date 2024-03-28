<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';

    protected $fillable = [
        'name',
        'full_name',
        'avg_rating',
        'avg_arrival_delay_minutes',
        'avg_delay_departure',
        'cnt_flights',
        'avg_solidity_departure',
        'avg_solidity_arrival'
    ];
}
