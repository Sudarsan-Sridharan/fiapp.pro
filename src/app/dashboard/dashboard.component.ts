import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import * as dayjs from "dayjs";
import * as localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drawerList = [
    {name: 'Dashboard', route: '/dashboard', icon: 'matSpaceDashboard'},
  ]

  dayjs = dayjs

  constructor(private authService: AuthService) {

  }

}
