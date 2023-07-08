import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {createChart} from "lightweight-charts";

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
export class TvChartComponent implements AfterViewInit {
  symbol: string | null = '';
  kline: MarketData["data"] = []
  chart: any = ''
  currentPrice: {
    high: number;
    low: number;
    open: number;
    close: number;
  } | null = null
  loading = true

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      const symbol = params.get('symbol');
      if (this.chart) this.chart.remove();
      this.symbol = symbol

      this.http.get<MarketData>(`https://api.fiapp.pro/kline?name=${this.symbol}&timeframe=30M`)
        .subscribe((response) => {


          const d = response.data.map((item): any => {
            return {
              time: (new Date(item.open_at).getTime() / 1000), open: item.open_bid,
              high: item.highest_bid, low: item.lowest_bid, close: item.close_bid
            }
          })

          this.kline = response.data

          this.chart = createChart('symbolChart', {
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


          const candlestickSeries = this.chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
          });


          candlestickSeries.setData(d);

          const container = document.getElementById('symbolChart');


          this.chart.subscribeCrosshairMove((param: any) => {
            if (param.time) {
              const data = param.seriesData.get(candlestickSeries);
              this.currentPrice = data;
            }
          });

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
  }
}
