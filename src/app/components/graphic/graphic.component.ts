import { ChartData } from './../../models/ChartData';
import { ShareDataService } from 'src/app/services/share-data.service';
import { CoinsService } from './../../services/coins.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicComponent implements OnInit {

  public hours: string[] = [];
  public coinValues: number[] = [];
  public updateOptions: any;

  public selectedCoin: string;

  public isLine = false;
  public chartName: string = 'bar';
  public chartType: string = 'bar';

  public options: any = {
    legend: {
      data: [this.chartName],
      align: 'left',
    },
    tooltip: {},
    xAxis: {
      data: this.hours,
      silent: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: this.chartName,
        type: this.chartType,
        data: this.coinValues,
        animationDelay: (idx: number) => idx * 10,
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx: number) => idx * 5,
  };

  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sharedData
      .getSelectedCoin()
      .pipe(switchMap(coinId => {
        this.selectedCoin = coinId;
        return this.coinService.getHistoryDataForCoin(coinId)
      })).subscribe((chartData: ChartData) => {
          this.formatChartData(chartData);
          this.updateOptions = {
            xAxis: {
              data: this.hours
            },
            yAxis: {
              scale: true
            },
            series: [{
              data: this.coinValues
            }]
          };
      });
  }

  private formatChartData(chartData: ChartData) {
    this.hours = [];
    this.coinValues = [];

    for(let i=0; i<chartData.prices.length;i++) {
      const price = chartData.prices[i];
      const priceTime =  new Date(price[0]);
      const value = price[1].toFixed(2);

      this.hours.push(priceTime.toLocaleString());
      this.coinValues.push(+value);
    }

    this.cdr.markForCheck();
  }

  changeGraphicType(){
    this.chartType=(this.isLine) ? "line" : "bar";
    this.chartName=this.chartType;
  
    this.updateOptions = {
      legend: {
        data: [this.chartName]
      },
      series: [{
        name: this.chartName,
        type: this.chartType,
        data: this.coinValues
      }]
    };
  }
}
