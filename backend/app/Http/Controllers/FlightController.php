<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;

class FlightController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page')) {
            $limit = $request->input('limit', 10);
            $flights = Flight::paginate($limit);
            return $flights->items();
        }

        $limit = $request->input('limit');
        if ($limit) {
            $flights = Flight::limit($limit)->get();
        } else {
            $flights = Flight::all();
        }

        return $flights;
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required',
            'code' => 'required',
            'departure_code' => 'required',
            'arrival_code' => 'required',
            'plan_departure' => 'required',
            'plan_arrival' => 'required',
            'fact_departure' => 'required',
            'fact_arrival' => 'required',
        ]);

        $flight = Flight::create($request->all());

        return response()->json($flight, 201);
    }

    public function show(Flight $flight)
    {
        return $flight;
    }

    public function update(Request $request, Flight $flight)
    {
        $request->validate([
            'company_id' => 'required',
            'code' => 'required',
            'departure_code' => 'required',
            'arrival_code' => 'required',
            'plan_departure' => 'required',
            'plan_arrival' => 'required',
            'fact_departure' => 'required',
            'fact_arrival' => 'required',
        ]);

        $flight->update($request->all());

        return response()->json($flight, 200);
    }

    public function destroy(Flight $flight)
    {
        $flight->delete();

        return response()->json(null, 204);
    }
}
