import { TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { FormsModule } from '@angular/forms';
import { Component, Pipe, NO_ERRORS_SCHEMA, PipeTransform } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

describe('PokemonListComponent', () => {
	
	let fixture, mockPokemonDataService, POKEMONS;

	@Pipe({name: 'filter'})
	class MockFilter implements PipeTransform {
		transform(value: number): number {
			return value;
		}
	}
	
	beforeEach(() => {
		
		POKEMONS = [
			{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon-species/2/"},
			{"name":"doduo","url":"https://pokeapi.co/api/v2/pokemon-species/84/"},
			{"name":"dodrio","url":"https://pokeapi.co/api/v2/pokemon-species/85/"}
		];
		
		mockPokemonDataService = jasmine.createSpyObj('mockPokemonDataService', ['getPokemonList', 'getPokemon', 'showEvolutionChain']);
		
		TestBed.configureTestingModule({
			declarations: [
				PokemonListComponent,
				MockFilter
			],
			imports: [
				FormsModule, 
				RouterTestingModule
			],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{provide: PokemonDataService, useValue: mockPokemonDataService}
			]
		});
		
		fixture = TestBed.createComponent(PokemonListComponent);
		
	});
	
	it('should render "Pokemon List" title', () => {
		let title = fixture.debugElement.query(By.css('h3'));
		
		expect(title.nativeElement.textContent).toEqual('Pokemon List');
	});
	
	it('should set pokemons correctly from the service', () => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		
		fixture.detectChanges();
		
		expect(fixture.componentInstance.pokemonList.length).toBe(3);
		
	});
	
});