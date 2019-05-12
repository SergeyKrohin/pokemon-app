import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilterPipe } from '../../pipes/filter.pipe';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@NgModule({
	declarations: [FilterPipe, LoaderComponent],
	providers: [],
	imports: [BrowserModule],
	exports:[FilterPipe, LoaderComponent]
})

export class SharedModule{}