<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AttributionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $client = new ClientsResource($this->client);
        return [
            'id' => $this->id,
            'heure' => $this->heure,
            'date' => $this->date,
            'clients' => $client
        ];
    }
}
