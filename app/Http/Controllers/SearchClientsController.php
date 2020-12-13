<?php

namespace App\Http\Controllers;
use App\Clients;
use Illuminate\Http\Request;

class SearchClientsController extends Controller
{
    //
    public function index(Request $req){
        $nom=$req->get("nom");
        return Clients::where("nomClient","=",$nom)->orWhere("prenomClient","=",$nom)->get();
    }
}
