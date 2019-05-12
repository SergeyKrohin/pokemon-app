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

	public pokemonList = [];
	public term = '';
	public propName = 'name';
	private subscriptions = [];
	private listLimit = 100;
	
	public pokemonSelected(pokemon) {
		const getPokemonSub = this.pokemonDataService.getPokemon(pokemon.name).subscribe((pokemon) => {
			this.router.navigate(['/evolution-chain', this.extractId(pokemon.evolution_chain)]);
		});		
		this.subscriptions.push(getPokemonSub);
	}
	
	private extractId(chain) {
		const splittedUrl = chain.url.split('/');
		return splittedUrl[splittedUrl.length - 2];
	}
	
	ngOnInit() {
		const pokemonListSub = this.pokemonDataService.getPokemonList(this.listLimit).subscribe((result) => {
			this.pokemonList = result;
		});
		this.subscriptions.push(pokemonListSub);
	}
	
	ngOnDestroy() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
