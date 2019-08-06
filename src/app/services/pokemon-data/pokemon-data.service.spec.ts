import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonDataService } from './pokemon-data.service';
import { HttpService } from '../http/http.service';

describe('PokemonDataService', () => {
	
	let pokemonDataService, httpTestingController, mockHttpService, getPokemonUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
	
	beforeEach(() => {
		
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ 
				PokemonDataService,
				HttpService
			]
		});
		
		httpTestingController = TestBed.get(HttpTestingController);
		pokemonDataService = TestBed.get(PokemonDataService);
		
	});
	
	describe('getPokemon', () => {
		it('should call get with the correct url', () => {
			pokemonDataService.getPokemon('bulbasaur').subscribe();
			
			const req = httpTestingController.expectOne(getPokemonUrl + 'bulbasaur/');
			req.flush({name: 'bulbasaur'}); 
			httpTestingController.verify();
		});
	});
});