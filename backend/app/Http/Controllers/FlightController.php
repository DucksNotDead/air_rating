<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;

class FlightController extends Controller
{
    public function index(Request $request) {
        if (request()->has('page')) {
            if (request()->has('limit')) {
                $airports = Flight::paginate($request->limit, ['*'], 'page', $request->page);
            } else {
                $airports = Flight::paginate(10, ['*'], 'page', $request->page);
            }
            return $airports->toArray()['data'];
        }
        
        if (request()->has('limit')) {
            $airports = Flight::limit(request('limit'))->get();
        } else {
            $airports = Flight::all();
        }

        return $airports;
    }
}
