import {Injectable, NgModule} from '@angular/core';
import {RouterModule, RouterStateSnapshot, Routes, TitleStrategy} from '@angular/router';
import {ChartComponent} from "./chart/chart.component";
import {HomeComponent} from "./home/home.component";
import {Title} from "@angular/platform-browser";
import {TvChartComponent} from "./tv-chart/tv-chart.component";

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | Fiapp.pro`);
    }
  }
}


const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Revolutionizing Trading',},
  {
    path: 'chart', component: ChartComponent, title: 'Professional chart',
    children: [
      {
        path: ':symbol',
        component: TvChartComponent
      },
      {
        path: '',
        redirectTo: '/chart/BTCUSDT',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]
})
export class AppRoutingModule {
}
