import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {createChart, IChartApi, UTCTimestamp} from "lightweight-charts";
import {RouterSymbolService} from "../chart/router-symbol.service";
import {SignalService} from "../chart/signal.service";
import {CoinService} from "../services/coin.service";
import {Kline} from "../services/websocket.service";

interface MarketData {
  statusCode: number;
  msg: string;
  data: {
    id: string;
    created_at: string;
    open_at: string;
    open_bid: number;
    highest_bid: number;
    lowest_bid: number;
    close_bid: number;
    volume_bid: number;
    timeframe_id: string;
    coin_id: string;
    coin: null;
    timeframe: null;
  }[];
}

@Component({
  selector: 'app-tv-chart',
  templateUrl: './tv-chart.component.html',
  styleUrls: ['./tv-chart.component.scss']
})
export class TvChartComponent implements AfterViewInit, OnInit {
  symbol: string | null = '';
  kline: MarketData["data"] = []
  chart: IChartApi | null = null
  currentPrice: {
    high: number;
    low: number;
    open: number;
    close: number;
  } | null = null
  loading = true

  lastKline: Kline | null = null

  constructor(private route: ActivatedRoute, private http: HttpClient, private routerSymbolService: RouterSymbolService,
              private signalService: SignalService,
              private coinService: CoinService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      const symbol = params.get('symbol');
      if (this.chart) this.chart.remove();
      this.symbol = symbol
      this.routerSymbolService.updateSymbolName(symbol ?? 'BTCUSDT')

      this.http.get<MarketData>(`https://api.fiapp.pro/kline?name=${this.symbol}&timeframe=30M`)
        .subscribe((response) => {


          const d = response.data.map((item): any => {
            return {
              time: (new Date(item.open_at).getTime() / 1000), open: item.open_bid,
              high: item.highest_bid, low: item.lowest_bid, close: item.close_bid
            }
          })

          this.kline = response.data

          const chart = createChart('symbolChart', {
            watermark: {
              visible: true,
              fontSize: 24,
              horzAlign: 'center',
              vertAlign: 'center',
              color: '#eaf7f2',
              text: `${this.symbol} - Fiapp.pro`
            },
            grid: {
              vertLines: {
                color: '#f2f2f2',
              },
              horzLines: {
                color: '#f2f2f2',
              }
            },
            rightPriceScale: {
              borderColor: '#f2f2f2',
            },
            timeScale: {
              borderColor: '#f2f2f2',
            }
          });

          this.chart = chart
          const candlestickSeries = this.chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
          });


          candlestickSeries.setData(d);
          this.coinService.lastKline$.subscribe((data) => {
            const d: Kline = JSON.parse(data)
            this.lastKline = d
            console.log(this.lastKline)
            candlestickSeries.update({
              time: this.lastKline.t / 1000 as unknown as string ?? 0,
              open: parseFloat(String(this.lastKline.o)) ?? 0,
              high: parseFloat(String(this.lastKline.h)) ?? 0,
              low: parseFloat(String(this.lastKline.l)) ?? 0,
              close: parseFloat(String(this.lastKline.c)) ?? 0,
            })
          })

          const container = document.getElementById('symbolChart');


          this.chart.subscribeCrosshairMove((param: any) => {
            if (param.time) {
              const data = param.seriesData.get(candlestickSeries);
              this.currentPrice = data;
            }
          });

          const markers: any = [];

          this.signalService.signal$.subscribe((signal) => {
            //sort signal by open_time
            signal?.sort((a, b) => {
              return new Date(a.open_time).getTime() - new Date(b.open_time).getTime()
            })
            signal?.map((item) => {
              const isBuy = item.direction === 1
              markers.push({
                time: (new Date(item.open_time).getTime() / 1000) as UTCTimestamp,
                position: isBuy ? 'belowBar' : 'aboveBar',
                color: isBuy ? "green" : "red",
                shape: isBuy ? 'arrowUp' : 'arrowDown',
                text: isBuy ? 'Buy' : 'Sell',
                size: 2,
              })
            })


            const signals = signal
            const marketData = response.data
            if (signals && signals.length > 0 && marketData.length > 0) {
              // Step 1: convert ISO date string to Unix timestamp
              const utcSignals = signals.map(signal => ({...signal, created_at: Date.parse(signal.open_time) / 1000}));
              const utcMarketData = marketData.map(md => ({...md, created_at: Date.parse(md.open_at) / 1000}));
              // Step 2: sort market data by created_at in descending order
              const sortedMarketData = utcMarketData.sort((a, b) => b.created_at - a.created_at);

              // Step 3: find index of the last market data point
              const lastMarketDataIndex = sortedMarketData.findIndex(md => md.created_at <= utcSignals[0].created_at);

              // Step 4: find relative index of each signal
              const relativeIndices = utcSignals.map(signal => {
                const marketDataIndex = sortedMarketData.findIndex(md => md.created_at <= signal.created_at);
                return marketDataIndex
              });
              this.signalService.updateTargetSignal(relativeIndices)
            }


          })

          candlestickSeries.setMarkers(markers);

          candlestickSeries.applyOptions({
            priceFormat: {
              precision: 10,
              minMove: 0.0000000001
            }
          })
          this.chart.timeScale().applyOptions({
            barSpacing: 10,
          })
        })
    });

    this.signalService.clickSignal$.subscribe((index) => {
      if (index !== null) {
        this.signalService.targetSignal$.subscribe((targetSignal) => {
          if (targetSignal !== null) {
            const target = targetSignal[index]
            if (target) {
              this.chart?.timeScale().scrollToPosition(-target + 10, false)
            }
          }
        })
      }
    })
  }

  scrollToSignal() {
    this.chart?.timeScale().scrollToPosition(-30, true)
  }

}
