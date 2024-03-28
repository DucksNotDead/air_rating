<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies';

    protected $fillable = [
        'company_id',
        'code',
        'departure_code',
        'arrival_code',
        'plan_departure',
        'plan_arrival',
        'fact_departure',
        'fact_arrival',
    ];
}
