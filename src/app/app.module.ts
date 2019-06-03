import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	DashboardModule,
	CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
