import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { EvolutionChainComponent } from '../../components/evolution-chain/evolution-chain.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
	declarations: [DashboardComponent, PokemonListComponent, EvolutionChainComponent],
	imports: [SharedModule ,BrowserModule, FormsModule, DashboardRoutingModule],
	providers: [],
	exports: [DashboardComponent]
})

export class DashboardModule {}