import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import 'rxjs/Rx';

@Injectable()
export class PokemonDataService {
	
	constructor(private httpService: HttpService) {}
	                
	private url = 'https://pokeapi.co/api/v2/';
	
	public getPokemonList(limit):any {
		return this.httpService.get(this.url + 'pokemon-species/?limit=' + limit).map((response) => {
			return response.results;
		});
	}
	
	public getPokemon(name):any {
		return this.httpService.get(this.url + 'pokemon-species/' + name + '/').map((response) => {
			return response;
		});
	}
	
	public showEvolutionChain(id):any {
		return this.httpService.get(this.url + 'evolution-chain/' + id +'/').map((response) => {
			return response;
		});
	}

}