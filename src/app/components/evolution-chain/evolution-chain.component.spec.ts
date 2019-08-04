import { TestBed } from '@angular/core/testing';
import { EvolutionChainComponent } from './evolution-chain.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

describe('EvolutionChainComponent', () => {
	
	let fixture, mockPokemonDataService;
	
	@Pipe({name: 'filter'})
	class MockFilter implements PipeTransform {
		transform(value: number): number {
			return value;
		}
	}
	
	beforeEach(() => {
		
		mockPokemonDataService = jasmine.createSpyObj('mockPokemonDataService', ['getPokemonList', 'getPokemon', 'showEvolutionChain']);
		
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
	
	it('should', () => {
		let title = fixture.debugElement.query(By.css('h3')).nativeElement;
		expect(title.textContent).toEqual('Evolution Chain');
	});
	
});