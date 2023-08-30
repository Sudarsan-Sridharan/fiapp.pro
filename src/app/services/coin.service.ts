import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private lastKline = new BehaviorSubject<string>('BTCUSDT');
  lastKline$ = this.lastKline.asObservable();

  constructor() {
  }

  updateCoinList(data: string) {
    try {
      JSON.parse(data)
      this.lastKline.next(data);
    } catch (e) {
    }
  }
}
