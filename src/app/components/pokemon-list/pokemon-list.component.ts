import { HttpService } from '../../services/http/http.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
	selector: 'pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
	
	constructor(private pokemonDataService: PokemonDataService, private router: Router){}

	public pokemonList: Array<Object> = [];
	public term: string = '';
	public propName: string = 'name';
	private listLimit: number = 100;
	public selectedPokemon: {name: string, description: string} = {name: '', description: ''};
	
	public showEvolutionChain(pokemon) {
		const getPokemonSub = this.pokemonDataService.getPokemon(pokemon.name).subscribe((pokemon) => {
			this.router.navigate(['/evolution-chain', this.extractId(pokemon.evolution_chain.url)]);
		});		
	}
	
	public showDescription(pokemon) {
		this.debounce(() => {		

			this.selectedPokemon.name = pokemon.name;
			this.pokemonDataService.getCharacteristics(this.extractId(pokemon.url)).subscribe((characteristics) => {
				this.selectedPokemon.description = this.getEnglishDescription(characteristics.descriptions);
			});

		}, 100, false)();
		

	}
	
	private getEnglishDescription(descriptions) {
		return descriptions.find(desc => desc.language.name === 'en').description;		
	}
	
	private extractId(url) {
		const splittedUrl = url.split('/');
		return splittedUrl[splittedUrl.length - 2];
	}
	
	private debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if(!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
	
	ngOnInit() {
		this.pokemonDataService.getPokemonList(this.listLimit).subscribe((result) => {
			this.pokemonList = result;
		});
	}

}
