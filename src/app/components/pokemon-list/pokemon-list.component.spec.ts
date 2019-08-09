import { TestBed, async, fakeAsync, flush } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { FormsModule } from '@angular/forms';
import { Component, Pipe, NO_ERRORS_SCHEMA, PipeTransform } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';

describe('PokemonListComponent', () => {
	
	let fixture, mockPokemonDataService, POKEMONS, CHARACTERISTICS, mockRouter;
	
	beforeEach(() => {
		
		POKEMONS = [
			{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon-species/2/"},
			{"name":"doduo","url":"https://pokeapi.co/api/v2/pokemon-species/84/"},
			{"name":"dodrio","url":"https://pokeapi.co/api/v2/pokemon-species/85/"}
		];
		
		CHARACTERISTICS = {
		  "descriptions": [
			{
			  "description": "Adore manger",
			  "language": {
				"name": "fr",
				"url": "https://pokeapi.co/api/v2/language/5/"
			  }
			},
			{
			  "description": "Loves to eat",
			  "language": {
				"name": "en",
				"url": "https://pokeapi.co/api/v2/language/9/"
			  }
			}
		  ]
		};
		
		mockPokemonDataService = jasmine.createSpyObj('mockPokemonDataService', ['getPokemonList', 'getPokemon', 'getCharacteristics']);
		mockRouter = {
			navigate: jasmine.createSpy('navigate')
		}
		
		TestBed.configureTestingModule({
			declarations: [
				PokemonListComponent,
				FilterPipe
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
	
	it('should have the correct route when pokemon is selected', () => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		mockPokemonDataService.getPokemon.and.returnValue(Observable.of({evolution_chain: {url: "https://pokeapi.co/api/v2/evolution-chain/1/"}}));
		
		fixture.detectChanges();
		let showEvolutionChainBtn = fixture.debugElement.queryAll(By.css('li #show-evolutin-chain-btn'))[0];
		showEvolutionChainBtn.triggerEventHandler('click', {});
		
		expect(mockRouter.navigate).toHaveBeenCalledWith ([ '/evolution-chain', '1' ]);
	});
	
	it('should filter the list when pokemon name is entered to the filter box', () => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		
		fixture.detectChanges();
		let input = fixture.debugElement.query(By.css('input')).nativeElement;
		input.value = 'dod';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		
		expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(2);
	});
	
	it('should show description text when "show description" button is pressed', fakeAsync(() => {
		mockPokemonDataService.getPokemonList.and.returnValue(Observable.of(POKEMONS));
		mockPokemonDataService.getCharacteristics.and.returnValue(Observable.of(CHARACTERISTICS));
		fixture.detectChanges();
		
		let showDescriptionBtn = fixture.debugElement.queryAll(By.css('li #show-description-btn'))[0];
		showDescriptionBtn.triggerEventHandler('click', {});
		flush();
		fixture.detectChanges();
		
		let pokemonDescription = fixture.debugElement.queryAll(By.css('li .pokemon-description'))[0];
		expect(pokemonDescription.nativeElement.textContent).toEqual(CHARACTERISTICS.descriptions[1].description);
	}));
	
});