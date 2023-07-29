import {Component, HostListener, Renderer2} from '@angular/core';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show: boolean = false;

  constructor(private loginService: LoginService, private renderer: Renderer2) {
    this.loginService.show$.subscribe(data => {
      this.show = data;
      if (this.show) {
        this.renderer.addClass(document.documentElement, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.documentElement, 'overflow-hidden');
      }
    });
  }

  // Listen to the window resize event
  @HostListener('window:resize')
  onResize() {
    if (this.show) {
      this.renderer.addClass(document.documentElement, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.documentElement, 'overflow-hidden');
    }
  }


  close() {
    this.loginService.updateShow(false);
  }
}
