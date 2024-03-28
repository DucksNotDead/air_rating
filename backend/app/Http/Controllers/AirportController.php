<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Airport;

class AirportController extends Controller
{
    public function index(Request $request)
    {
        if (request()->has('page')) {
            if (request()->has('limit')) {
                $airports = Airport::paginate($request->limit, ['*'], 'page', $request->page);
            } else {
                $airports = Airport::paginate(10, ['*'], 'page', $request->page);
            }
            return $airports->toArray()['data'];
        }
        
        if (request()->has('limit')) {
            $airports = Airport::limit(request('limit'))->get();
        } else {
            $airports = Airport::all();
        }

        return $airports;
    }
}
