import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TradingSignal} from "./chart.component";

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private signal = new BehaviorSubject<TradingSignal['data'] | null>(null);
  signal$ = this.signal.asObservable();

  private targetSignal = new BehaviorSubject<(number | null)[]>([]);
  targetSignal$ = this.targetSignal.asObservable();

  // 点击信号，传入信号的index
  private clickSignal = new BehaviorSubject<number | null>(null);
  clickSignal$ = this.clickSignal.asObservable();

  constructor() {
  }

  updateSignal(data: TradingSignal['data']) {
    this.signal.next(data);
  }

  updateTargetSignal(data: (number | null)[]) {
    this.targetSignal.next(data);
  }

  updateClickSignal(data: number | null) {
    this.clickSignal.next(data);
  }
}
