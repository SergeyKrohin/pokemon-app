import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { PokemonDataService } from '../pokemon-data/pokemon-data.service';

@Injectable()
export class EvolutionChainResolver implements Resolve<any> {
	
	constructor(private pokemonDataService: PokemonDataService) {}
	                
	resolve(route) {
		return this.pokemonDataService.showEvolutionChain(route.params['id']);
	}
}
