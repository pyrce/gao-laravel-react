<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Postes extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
     'nom'
    ];
    function attributions(){
        return $this->hasMany(Attributions::class, 'posteId');
    }
}
