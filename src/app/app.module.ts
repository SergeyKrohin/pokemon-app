import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CoreModule } from './modules/core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
	HttpClientModule,
	DashboardModule,
	CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
