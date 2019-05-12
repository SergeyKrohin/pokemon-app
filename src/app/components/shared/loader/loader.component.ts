import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit, OnDestroy {
	
	constructor(private loaderService: LoaderService){}
	
	public isLoading;
	private loadSub;
	
	ngOnInit() {
		this.loadSub = this.loaderService.onLoadChange().subscribe((isLoading) => {
			this.isLoading = isLoading;
		});
	}
	
	ngOnDestroy() {
		this.loadSub.unsubscribe();
	}
}