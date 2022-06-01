<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostesResource;
use App\Postes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GestionController extends Controller
{
    //

    function index(Request $request)
    {
        $data = Validator::make(
            $request->input(),
            [
                'date' => 'required|max:255',
            ]
        )->validate();
        $ordis = Postes::with(['attributions' => function ($req) use ($data) {
            $req->where('jour', '=', $data['date'])
                ->with('client');
        }])->get();

        return PostesResource::collection($ordis);
    }

    function store(Request $request)
    {

        $data = $request->validate([
            'nomPoste' => ['required','max:255'],
        ]);

        $ordi = new Postes();
        $ordi->nomPoste = $data['nomPoste'];
        $ordi->save();
        return new PostesResource($ordi);
    }
}