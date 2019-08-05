import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonDataService } from './pokemon-data.service';
import { HttpService } from '../http/http.service';

describe('PokemonDataService', () => {
	
	let pokemonDataService, httpTestingController, mockHttpService;
	
	beforeEach(() => {
		
		mockHttpService = jasmine.createSpyObj('mockHttpService', ['get']);
		
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ 
				PokemonDataService,
				{ 
					provide: HttpService, 
					useValue: mockHttpService 
				}
			]
		});
		
		httpTestingController = TestBed.get(HttpTestingController);
		pokemonDataService = TestBed.get(PokemonDataService);
		
	});
	
	describe('getPokemon', () => {
		it('should', () => {
			//pokemonDataService.getPokemon(1).subscribe();
		});
	});
});