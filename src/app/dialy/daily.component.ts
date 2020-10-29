import { Component, OnInit , Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  @Input() key;
  @Input() wdats;
 mySrc;
 info;
 day;
 Humidity;
 show=false;
 allData=[];
 allHour=[]

 

getAllData(){
  this.wdats.map(item => {
    this.allData.push(Number((item.main.temp-275).toFixed(0)));
 
  });
}

getHours(){
  this.wdats.map(item => {
    var time=item.dt_txt.substring(11,13)
    var myHour = time >12 ? Number.parseInt(time)-12+' PM' :  time+' AM';
    this.allHour.push(myHour);
 
  });
}

 lineChartData: ChartDataSets[] = [
  { data: this.allData, label: 'Hourly Forecast' },
];

lineChartLabels: Label[] = this.allHour;

lineChartOptions = {
  responsive: true,
};

lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

lineChartLegend = true;
lineChartPlugins = [];
lineChartType = 'line';

onchange(){
  this.show=!this.show;
}

_getDayInfo (data){
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  this.day= daysOfWeek[new Date(data[0].dt * 1000).getDay()];
};

_getIcon = data => 
this.mySrc= `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;


_getInfo  (data, min=[], max=[], humidity=[]){
  data.map(item => {
    max.push(item.main.temp_max);
    min.push(item.main.temp_min);
    humidity.push(item.main.humidity);
  });

  const minMax = {
    min: Math.round(Math.min(...min)),
    max: Math.round(Math.max(...max)),
  };

  const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);


  this.info= (minMax.min-275)+"°C " +"-"+ (minMax.max-275)+"°C ";
  this.Humidity=avgHumdity+"%";
};




ngOnInit(){/*
this._getDayInfo(this.wdats);
this._getIcon(this._getIcon);
this._getInfo(this.wdats);
*/

//console.log(this.wdats[0].weather[0].icon)

this.getHours();
this.getAllData();
this._getIcon(this.wdats);
this._getDayInfo(this.wdats);
this._getInfo(this.wdats);

console.log(this.key);
console.log(this.day);
console.log(this.info)
console.log(this.mySrc)
console.log(this.wdats)
console.log(this.allData);
console.log(this.allHour)
}


}