import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private show = new BehaviorSubject<boolean>(false);
  show$ = this.show.asObservable();

  constructor() {
  }

  updateShow(data: boolean) {
    this.show.next(data);
  }
}
