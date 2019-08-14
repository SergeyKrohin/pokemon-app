import { HttpService } from '../../services/http/http.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Pokemon {
	name: string;
}

@Component({
	selector: 'evolution-chain',
	templateUrl: './evolution-chain.component.html',
	styleUrls: ['./evolution-chain.component.scss']
})

export class EvolutionChainComponent implements OnInit {
	
	constructor(private pokemonDataService: PokemonDataService, private route: ActivatedRoute){}

	public pokemonList: Array<Pokemon>;
	public term:string = '';
	public propName:string = 'name';
	
	private chainToList(evolutionChain):Array<Pokemon> {	
		const list = []; 
		(function chain(evolutionChain) {
			list.push({name: evolutionChain.species.name});
			if(evolutionChain.evolves_to.length){
				evolutionChain.evolves_to.forEach((item) => {
					chain(item);
				});
			}
		})(evolutionChain);
		return list;
	}
	
	ngOnInit() {
		this.route.data.subscribe((data) => {
			this.pokemonList = this.chainToList(data['evolutionChain'].chain); 
		});
	}
}
