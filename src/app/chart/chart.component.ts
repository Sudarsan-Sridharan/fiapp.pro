import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

interface PriceData {
  open: string;
  name: string;
  volume: string;
  quoteVolume: string;
}

interface AssetData {
  exchange: string;
  name: string;
  price: PriceData;
}

interface ApiResponse {
  statusCode: number;
  msg: string;
  data: AssetData[];
}

interface IGroupedAssetData {
  type: string,
  data: AssetData[]
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  coinList: IGroupedAssetData[] = [];

  symbol = ''

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }


  ngOnInit() {

    this.http.get<ApiResponse>('https://api.fiapp.pro/coin').subscribe((response) => {
      const sortedAssetData = response.data.sort((a, b) => a.name.localeCompare(b.name));
// 使用 reduce 方法将资产数据按照名称首字母分组，并将每个分组内的资产数据按照名称排序
      const groupedAssetData = sortedAssetData.reduce((groups, data) => {
        const firstLetter = data.name.charAt(0).toUpperCase();
        const group = groups.get(firstLetter) || [];
        group.push(data);
        groups.set(firstLetter, group.sort((a, b) => a.name.localeCompare(b.name)));
        return groups;
      }, new Map<string, AssetData[]>());

// 将每个分组包装为 {type: string, data: AssetData[]} 对象，并将它们存储在数组中
      const groupedAssetDataArray = Array.from(groupedAssetData).map(([type, data]) => ({type, data}));

      this.coinList = groupedAssetDataArray;
    })
  }
}
