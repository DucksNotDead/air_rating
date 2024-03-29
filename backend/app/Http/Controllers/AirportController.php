<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Airport;

class AirportController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('code')) {
            $code = $request->get('code');

            $airport = Airport::where('code', '=', $code)->limit(1)->get();

            return $airport;
        }

        if ($request->has('search')) {
            $search = $request->get('search');

            $airports = Airport::where('city', 'LIKE', '%' . $search . '%');

            return $airports->get();
        }

        if ($request->has('page')) {
            $limit = $request->input('limit', 10);
            $airports = Airport::paginate($limit);
            return $airports->items();
        }

        $limit = $request->input('limit');
        if ($limit) {
            $airports = Airport::limit($limit)->get();
        } else {
            $airports = Airport::all();
        }

        return $airports;
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'code' => 'required',
                'name' => 'required',
                'city' => 'required',
                'coordinates' => 'required',
                'icao' => 'required',
            ]);

            $airport = Airport::create($request->all());

            return response()->json($airport, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Произошла ошибка при создании аэропорта: ' . $e->getMessage()], 500);
        }
    }

    public function show(Airport $airport)
    {
        return $airport;
    }

    public function update(Request $request, Airport $airport)
    {
        $request->validate([
            'code' => 'required',
            'name' => 'required',
            'city' => 'required',
            'coordinates' => 'required',
            'icao' => 'required',
        ]);

        $airport->update($request->all());

        return response()->json($airport, 200);
    }

    public function destroy(Airport $airport)
    {
        $airport->delete();

        return response()->json(null, 204);
    }
}
