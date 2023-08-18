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
      description: 'Through big data analytics, we provide clients with real-time, comprehensive data insights to support quick and informed business decisions, seizing market opportunities.',
    },
    {
      title: 'Automatic processing',
      description: 'Leveraging AI and machine learning technologies, we enable 24/7 automated data processing and analytics, providing efficient, stable and secure big data services to our clients.'
    },
    {
      title: 'Risk Management',
      description: 'Provide real-time monitoring of business risks, including alerts and response mechanisms, to help you better control business risks.',
    },
    {
      title: 'Reports',
      description: 'Provide diversified data analytics reporting functions with maximum transparency to fully inform clients on business operations.'
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
          text: '基于实际数据的回测分析，考虑了各种成本因素的影响。'
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
