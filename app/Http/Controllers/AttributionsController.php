<?php

namespace App\Http\Controllers;
use App\Attributions;
use App\Postes;
use App\Clients;
use App\Http\Resources\AttributionsResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class AttributionsController extends BaseController
{
    //

    public function store(Request $request){
  
          $data = Validator::make(
              $request->input(),
              [
                  'posteId' => 'required',
                  'jour' => 'required',
                  'heure' => 'required',
                  'clientId' => '',
                  'nomClient' => '',
                  'prenomClient' => '',
              ]
          )->validate();

        $client = Clients::find($data['clientId']);
     
  
          $ordi = Postes::find($data['posteId']);
  
          if (isset($client) && isset($ordi)) {
  
              $attribution = new Attributions();
              $attribution->heure = $data['heure'];
              $attribution->jour = $data['jour'];
              $attribution->client()->associate($client);
              $attribution->postes()->associate($ordi);
              $attribution->save();
  
              return new AttributionsResource($attribution);
          } else {
              //TODO ThrowException panier not exist
          }
      
    }

    public function delete(Request $request){
        $data = Validator::make(
            $request->input(),
            [
                'id' => 'required',
            ]
        )->validate();
        $attribution = Attributions::where('id', $data["id"])
        ->delete();

    return new JsonResponse(["msg"=>"ok"]);
    }
}
