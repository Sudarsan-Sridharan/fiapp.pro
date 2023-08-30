// src\app\services\websocket.service.ts
import {Injectable} from "@angular/core";
import {Observable, Observer, Subject} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {map} from 'rxjs/operators';

const CHAT_URL = "wss://stream.binance.com/stream?streams=bnbusdt@kline_1m/btcusdt@kline_1m/ethusdt@kline_1m/etcusdt@kline_1m/sandusdt@kline_1m/kmdusdt@kline_1m/seiusdt@kline_1m/arkmusdt@kline_1m/unfiusdt@kline_1m/lptusdt@kline_1m/elfusdt@kline_1m/mcusdt@kline_1m";

export interface KlineData {
  e: string;
  E: number;
  s: string;
  k: Kline;
}

export interface Kline {
  t: number;
  T: number;
  s: string;
  i: string;
  f: number;
  L: number;
  o: number;
  c: number;
  h: number;
  l: number;
  v: number;
  n: number;
  x: boolean;
  q: string;
  V: string;
  Q: string;
  B: string;
}

export interface KlineResponse {
  stream: string;
  data: KlineData;
}


@Injectable()
export class WebsocketService {
  public messages: (url: (string | URL)) => Subject<KlineResponse>;
  url: string | URL = ''
  private subject: AnonymousSubject<MessageEvent> | undefined;

  constructor() {
    this.messages = (url: string | URL): Subject<KlineResponse> => {
      this.url = url
      return <Subject<KlineResponse>>this.connect(url).pipe(
        map(
          (response: MessageEvent): KlineResponse => {
            let data = JSON.parse(response.data);
            return data;
          }
        )
      );
    }
  }

  public connect(url: string | URL): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: string | URL): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer: any = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
