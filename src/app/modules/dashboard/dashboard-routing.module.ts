import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { EvolutionChainComponent } from '../../components/evolution-chain/evolution-chain.component';
import { EvolutionChainResolver } from '../../services/evolution-chain-resolver/evolution-chain.resolver';

const routes: Routes = [
  {
    path: 'pokemon-list',
	component: PokemonListComponent
  },
  {
    path: 'evolution-chain/:id',
	component: EvolutionChainComponent,
	resolve: {
		evolutionChain: EvolutionChainResolver
	}
  },
  {
    path: '**',
	redirectTo: '/pokemon-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }