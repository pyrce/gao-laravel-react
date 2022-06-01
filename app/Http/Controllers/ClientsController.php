<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clients;
use Illuminate\Support\Facades\Validator;

class ClientsController extends Controller
{
    //
    public function index(Request $request){

        $data = Validator::make(
            $request->input(),
            [
                'nomClient' => 'required|max:255',
            ]
        )->validate();
        $ordis = Clients::where("nomClient",'LIKE','%'.$data["nomClient"]."%")->orWhere("prenomClient","like",'%'.$data["nomClient"].'%')->get();
        return $ordis;
    }
    public function store(Request $request){
        $client = new Clients();
        $client->nomClient = $request->get("nomClient");
        $client->prenomClient =  $request->get("prenomClient");
        $client->save();
        return $client;
    }
}
