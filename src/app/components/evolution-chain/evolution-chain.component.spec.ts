import { TestBed } from '@angular/core/testing';
import { EvolutionChainComponent } from './evolution-chain.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('EvolutionChainComponent', () => {
	
	let fixture, mockPokemonDataService, EVOLUTION_CHAIN;
	
	@Pipe({name: 'filter'})
	class MockFilter implements PipeTransform {
		transform(value: number): number {
			return value;
		}
	}
	
	beforeEach(() => {
		
		EVOLUTION_CHAIN = {
			"chain": {
				"evolves_to": [
					{
						"evolves_to": [
							{
								"evolves_to": [],
								"species": {
									"name": "vileplume",
									"url": "https://pokeapi.co/api/v2/pokemon-species/45/"
								}
							},
							{
								"evolves_to": [],
								"species": {
									"name": "bellossom",
									"url": "https://pokeapi.co/api/v2/pokemon-species/182/"
								}
							}
						],
						"species": {
							"name": "gloom",
							"url": "https://pokeapi.co/api/v2/pokemon-species/44/"
						}
					}
				],
				"species": {
					"name": "oddish",
					"url": "https://pokeapi.co/api/v2/pokemon-species/43/"
				}
			}
		};
		
		mockPokemonDataService = jasmine.createSpyObj('mockPokemonDataService', ['showEvolutionChain']);
		
		TestBed.configureTestingModule({
			declarations: [
							EvolutionChainComponent, 
							MockFilter
						],
			imports: [FormsModule],
			providers: [
				{
					provide: PokemonDataService, 
					useValue: mockPokemonDataService
				},
				{
					provide: ActivatedRoute, 
					useValue: {
								params: Observable.from([{id: 1}])
							}
				},
			]
		});
		
		fixture = TestBed.createComponent(EvolutionChainComponent);
		
	});
	
	it('should render "Evoution Chain" title', () => {
		let title = fixture.debugElement.query(By.css('h3')).nativeElement;
		expect(title.textContent).toEqual('Evolution Chain');
	});
	
	it('should convert chain object to list', () => {
		
	});
	
});