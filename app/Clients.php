<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    //
    protected $table = 'clients';
    protected $fillable = ['nomClient', 'prenomClient'];
    public $timestamps = false;

}
