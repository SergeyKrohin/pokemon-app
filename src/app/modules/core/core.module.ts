import { NgModule } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { EvolutionChainResolver } from '../../services/evolution-chain-resolver/evolution-chain.resolver';
import { LoaderService, LoaderInterceptor } from '../../services/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	providers: [
		HttpService, 
		PokemonDataService, 
		EvolutionChainResolver, 
		LoaderService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	]
})

export class CoreModule {}