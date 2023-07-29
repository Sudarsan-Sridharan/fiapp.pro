import {AfterViewInit, Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaselineData, createChart, WhitespaceData} from "lightweight-charts";
import {LoginService} from "../account/login/login.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  features = [
    {
      title: 'Real-time',
      description: 'Provide real-time financial market data, including stocks, foreign exchange, futures, and more.',
    },
    {
      title: 'Trading',
      description: 'Offer convenient financial trading functions for customers.'
    },
    {
      title: 'Risk Management',
      description: 'Monitor trading risks in real-time, set up warnings and stop-loss.',
    },
    {
      title: 'Reports',
      description: 'Provide diverse reporting functions, helping customers understand their financial status.'
    }
  ]


  private netUrl = '../assets/net.json'

  constructor(private httpClient: HttpClient, private loginService: LoginService, public auth: AuthService) {

  }

  ngAfterViewInit(): void {
    this.httpClient.get(this.netUrl).subscribe((response: any) => {
      const d = response.map((item: { open_time_str: string, net_value: number }) => {
        return {time: new Date(item.open_time_str).getTime() / 1000, value: item.net_value}
      })

      const chart = createChart('tvChart', {
        timeScale: {
          visible: true,
          borderVisible: false,
        },
        watermark: {
          visible: true,
          fontSize: 12,
          horzAlign: 'center',
          vertAlign: 'center',
          color: 'rgba(0,0, 0, 0.2)',
          text: '真实数据回测，已包含最高手续费和滑点。'
        },
        rightPriceScale: {
          visible: true,
          borderVisible: false,
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      });

      const baselineSeries = chart.addBaselineSeries({

        baseValue: {type: 'price', price: 100000},
        topLineColor: 'rgba( 38, 166, 154, 1)',
        topFillColor1: 'rgba( 38, 166, 154, 0.28)',
        topFillColor2: 'rgba( 38, 166, 154, 0.05)',
        bottomLineColor: 'rgba( 239, 83, 80, 1)',
        bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)'
      });

      let data: (BaselineData | WhitespaceData)[];
      data = d

      baselineSeries.setData(data);

      chart.timeScale().fitContent();
    })
  }

  showLoginDialog() {
    this.loginService.updateShow(true)
  }
}
