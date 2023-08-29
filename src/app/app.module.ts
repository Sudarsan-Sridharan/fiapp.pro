import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgIconsModule} from "@ng-icons/core";
import {matArrowRightAltOutline, matLanguageOutline, matPersonAddAlt1Outline} from "@ng-icons/material-icons/outline";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ChartComponent} from './chart/chart.component';
import {HomeComponent} from './home/home.component';
import {TvChartComponent} from './tv-chart/tv-chart.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoginComponent} from './account/login/login.component';
import {AuthModule} from '@auth0/auth0-angular';
import {FeatureComponent} from "./feature/feature.component";
import {NgOptimizedImage} from "@angular/common";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent,
    TvChartComponent,
    LoginComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({matLanguageOutline, matArrowRightAltOutline, matPersonAddAlt1Outline}),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-pu4ruz7y.jp.auth0.com',
      clientId: 'p9AHse71tY4fAF1IgN5qs4lzy4NqLUV6',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'fiapp-plus-user',
      },
    }),
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
