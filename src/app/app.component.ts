import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiapp';
  navLinks = [
    {path: 'home', label: 'Home', to: ''},
    {path: 'about', label: 'About', to: ''},
    {path: 'features', label: 'Features', to: ''},
    {path: 'contact', label: 'Contact us', to: ''},
  ]
}
