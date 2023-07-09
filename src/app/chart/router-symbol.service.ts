import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouterSymbolService {
  private symbolName = new BehaviorSubject<string>('BTCUSDT');
  symbolName$ = this.symbolName.asObservable();

  constructor() {
  }

  updateSymbolName(data: string) {
    this.symbolName.next(data);
  }
}
