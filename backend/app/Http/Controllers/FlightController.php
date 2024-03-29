<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\Flight;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class FlightController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page')) {
            $limit = $request->input('limit', 10);
            $flights = Flight::paginate($limit);
            return $flights->items();
        }

        $limit = $request->input('limit', 10);
        if ($limit) {
            $flights = Flight::limit($limit)->get();
        } else {
            $flights = Flight::all();
        }

        if ($request->has('from') && $request->has('to')) {
            $from = $request->input('from');
            $to = $request->input('to');

            $flights = Flight::orWhere('departure_code', '=', $from)
                ->where('arrival_code', '=', $to)
                ->limit($limit)
                ->get();

            $companyIds = $flights->pluck('company_id')->toArray();

            $companies = Company::whereIn('id', $companyIds)->orderBy('avg_rating', 'desc')->get();

            return $companies;
        }

        return $flights;
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'company_id' => 'required',
                'code' => 'required',
                'departure_code' => 'required',
                'arrival_code' => 'required',
                'plan_departure' => 'required',
                'plan_arrival' => 'required',
                'fact_departure' => 'required',
                'fact_arrival' => 'required'
            ]);

            $flight = Flight::create($request->all());

            $process = new Process(['node', __DIR__ . '/test.js', $flight]);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            echo $process->getOutput();

            return response()->json($flight, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Произошла ошибка при создании рейса: ' . $e->getMessage()], 500);
        }
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
            'fact_arrival' => 'required'
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
