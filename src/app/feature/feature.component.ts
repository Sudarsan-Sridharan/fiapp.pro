import {Component} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  features = [
    {
      title: 'Portfolio tracking',
      description: "Real-time updates and display of the portfolio's real-time market value and profit/loss status, helping users better understand and manage their investment portfolio."
    },
    {
      title: 'Buy/sell signals',
      description: 'Automatically execute trading strategies to help users achieve their investment goals more effectively. Based on pre-set buy/sell rules, the system can automatically identify market changes and take corresponding trading actions to control risks and achieve higher returns.'
    },
    {
      title: 'Trend change',
      description: 'Real-time identification of market trends helps users better grasp investment opportunities. By accurately locating market trends, users can adjust trading strategies in a timely manner, control risks, and achieve higher returns.'
    },
    {
      title: 'Volatility alert',
      description: 'Real-time monitoring of market volatility helps users to timely understand market risks. By timely warning of market fluctuations, users can adjust investment strategies in a timely manner, prevent risks, and protect their investment portfolio.'
    },
    {
      title: 'Intelligent recommendation',
      description: 'Provide personalized investment advice to users and help them make wiser investment decisions. By analyzing factors such as users\' investment preferences, risk preferences, and market conditions, the system can recommend the most suitable investment portfolio to users and improve investment efficiency.'
    }
  ];
}
