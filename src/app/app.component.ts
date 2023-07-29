import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LoginService} from "./account/login/login.service";
import {AuthService, User} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fiapp';
  navLinks = [
    {path: 'home', label: 'Home'},
    {path: 'chart', label: 'Chart'},
    {path: 'features', label: 'Features'},
    // {path: 'contact', label: 'Contact Us'},
  ]
  currentLang = ''
  user: User | null | undefined = null
  protected readonly document = document

  constructor(private translateService: TranslateService, private loginService: LoginService, public auth: AuthService) {
    this.translateService.addLangs(['en', 'zh-CN']);
    this.translateService.setDefaultLang('en');

    const browserLang = navigator.language;
    const browserMatchLang = browserLang.match(/en|zh-CN/) ? browserLang : 'en';
    this.translateService.use(browserMatchLang);
    this.currentLang = browserMatchLang
  }

  switchLang(lang: string) {
    this.currentLang = lang
    this.translateService.use(lang)
  }

  ngOnInit() {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      console.log(token)
    })

    this.auth.user$.subscribe((user) => {
      this.user = user
    })
  }

  openLogin() {
    this.loginService.updateShow(true);
  }
}
