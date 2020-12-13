<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $attributions = AttributionsResource::collection($this->attributions);
        return [
            'id' => $this->id,
            'nomPoste' => $this->nomPoste,
            'attributions' => $attributions
        ];
    }
}
