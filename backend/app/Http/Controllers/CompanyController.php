<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();

        return $companies;
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'full_name' => 'required',
                'avg_rating' => 'required',
                'avg_arrival_delay_minutes' => 'required',
                'avg_delay_departure' => 'required',
                'cnt_flights' => 'required',
                'avg_solidity_departure' => 'required',
                'avg_solidity_arrival' => 'required'
            ]);

            $company = Company::create($request->all());

            return response()->json($company, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Произошла ошибка при создании компании: ' . $e->getMessage()], 500);
        }
    }


    public function show(Company $company)
    {
        return $company;
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required',
            'full_name' => 'required',
            'avg_rating' => 'required',
            'avg_arrival_delay_minutes' => 'required',
            'avg_delay_departure' => 'required',
            'cnt_flights' => 'required',
            'avg_solidity_departure' => 'required',
            'avg_solidity_arrival' => 'required'
        ]);

        $company->update($request->all());

        return response()->json($company, 200);
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(null, 204);
    }
}
