import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private coinList = new BehaviorSubject<string>('BTCUSDT');
  coinList$ = this.coinList.asObservable();

  constructor() {
  }

  updateCoinList(data: string) {
    this.coinList.next(data);
  }
}
