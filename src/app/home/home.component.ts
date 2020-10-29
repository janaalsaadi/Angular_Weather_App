import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http :HttpClient){

  }
lat;
long;
list=[];
city;
allData;
url;
private forecast: Object[];




_groupByDays = data => {
  return (data.reduce((list, item) => {
    const forecastDate = item.dt_txt.substr(0,10);
    list[forecastDate] = list[forecastDate] || [];
    list[forecastDate].push(item);

    return list;
  }, {}));
};

  ngOnInit(){


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.url = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.long}&appid=7fcada73c4286410650cc2658ab8e327`;
  
    this.http.get(this.url).subscribe(data=>{
      this.allData=data;
      
    const tiles = Object.values(this._groupByDays(this.allData.list));


    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
      this.city=this.allData.city.name;
      this.list=forecastTiles;

    })
        }
      })

    }
   // console.log(this.lat)

  }
  
}