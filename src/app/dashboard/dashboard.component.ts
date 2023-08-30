import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import * as dayjs from "dayjs";
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import {Router} from "@angular/router";
import * as localZhLanguage from 'dayjs/locale/zh-cn'
import {TranslateService} from "@ngx-translate/core";

dayjs.extend(localizedFormat)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drawerList = [
    {name: 'Dashboard', route: '/dashboard', icon: 'matSpaceDashboard'},
    {name: 'Settings', route: '/dashboard/settings', icon: 'matSettings'},
  ]

  dayjs = dayjs
  title = 'socketrv';
  content = '';
  received: any = [];
  sent: any = [];

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService,
  ) {
    authService.isAuthenticated$.subscribe(async (isAuthenticated) => {
      if (!isAuthenticated) {
        await this.router.navigate(['/'])
      }
    })

    if (translate.currentLang === 'zh-CN') {
      dayjs.locale(localZhLanguage)
      this.dayjs = dayjs
    }

  }
}
