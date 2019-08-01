import { TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { FormsModule } from '@angular/forms';
import { Component, Pipe, NO_ERRORS_SCHEMA, PipeTransform } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('PokemonListComponent', () => {
	
	let fixture, mockPokemonDataService, POKEMONS, mockRouter;

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
		mockRouter = {
			navigate: jasmine.createSpy('navigate')
		}
		
		TestBed.configureTestingModule({
			declarations: [
				PokemonListComponent,
				MockFilter
			],
			imports: [
				FormsModule/*, 
				RouterTestingModule*/
			],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{provide: PokemonDataService, useValue: mockPokemonDataService},
				{provide: Router, useValue: mockRouter}
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
	
	it('should render pokemons correctly from the service', () => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		
		fixture.detectChanges();
		
		const pokemonDebugElements = fixture.debugElement.queryAll(By.css('li .pokemon-name'));
		pokemonDebugElements.forEach((de, index) => {
			expect(de.nativeElement.textContent).toEqual(POKEMONS[index].name);
		});
	});
	
	it('should have the correct route for the first pokemon', () => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		mockPokemonDataService.getPokemon.and.returnValue(Observable.of({
														"name": "ivysaur", 
														"url": "https://pokeapi.co/api/v2/pokemon-species/2/"
													}));
		
		fixture.componentInstance.extractId = (evolutionChain) => {return 1}
		
		fixture.detectChanges();
		
		
		let listItemFirstBtn = fixture.debugElement.queryAll(By.css('li button'))[0];
		
		listItemFirstBtn.triggerEventHandler('click', {});
		
		expect(mockRouter.navigate).toHaveBeenCalledWith ([ '/evolution-chain', 1 ]);
		
	});
	
});