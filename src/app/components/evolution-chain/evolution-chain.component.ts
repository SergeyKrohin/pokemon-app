import { HttpService } from '../../services/http/http.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'evolution-chain',
	templateUrl: './evolution-chain.component.html',
	styleUrls: ['./evolution-chain.component.scss']
})

export class EvolutionChainComponent implements OnInit, OnDestroy {
	
	constructor(private pokemonDataService: PokemonDataService, private route: ActivatedRoute){}

	public pokemonList = [];
	public term = '';
	public propName = 'name';
	private subscriptions = [];
	
	private chainToList(evolutionChain) {	
		const list = []; 
		(function chain(evolutionChain) {
			list.push({name: evolutionChain.species.name});
			if(evolutionChain.evolves_to.length){
				evolutionChain.evolves_to.forEach((item) => {
					chain(item);
				});
			}
		})(evolutionChain)
		return list;
	}
	
	ngOnInit() {
		const routeSub = this.route.data.subscribe((data) => {
			this.pokemonList = this.chainToList(data['evolutionChain'].chain); 
			debugger;
		});
		this.subscriptions.push(routeSub);
	}
	
	ngOnDestroy() {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
