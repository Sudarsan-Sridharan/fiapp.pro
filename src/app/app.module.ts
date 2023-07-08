import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgIconsModule} from "@ng-icons/core";
import {matArrowRightAltOutline, matLanguageOutline} from "@ng-icons/material-icons/outline";
import {HttpClientModule} from "@angular/common/http";
import {ChartComponent} from './chart/chart.component';
import {HomeComponent} from './home/home.component';
import {TvChartComponent} from './tv-chart/tv-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent,
    TvChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({matLanguageOutline, matArrowRightAltOutline}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
