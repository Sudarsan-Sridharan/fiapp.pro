import {Component} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  features = [
    {
      title: 'Business Monitoring',
      description: "Real-time monitoring and visualization of key business metrics to help users better grasp and manage business operations."
    },
    {
      title: 'Business Decision Support',
      description: 'Automatically analyze data and generate business recommendations based on preset business rules to help users make more informed decisions. The system can automatically monitor market changes and provide corresponding business suggestions based on data insights to control risks and achieve business goals.'
    },
    {
      title: 'Trend Analysis',
      description: 'Real-time monitoring of market change trends to help users capitalize on business opportunities. Through accurate trend analysis, users can promptly adjust business strategies, control risks, and achieve business success.'
    },
    {
      title: 'Business Risk Alerts',
      description: 'Real-time monitoring of business risk indicators to help users stay informed of operational risks. Through risk alerts, users can promptly adjust business strategies, prevent risks, and ensure stable business operations.'
    },
    {
      title: 'Intelligent recommendation',
      description: 'Provide personalized business decision suggestions based on factors like user preferences, risk appetite and market conditions, to help them make more informed choices. The system can analyze data and recommend optimal business solutions to improve decision-making efficiency.'
    }
  ];
}
