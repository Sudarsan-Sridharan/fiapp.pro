import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import * as dayjs from "dayjs";
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {
    authService.isAuthenticated$.subscribe(async (isAuthenticated) => {
      if (!isAuthenticated) {
        await this.router.navigate(['/'])
      }
    })
  }

}
