import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-live-station',
  templateUrl: './live-station.component.html',
  styleUrls: ['./live-station.component.css']
})
export class LiveStationComponent implements OnInit {
private apiUrl= environment.apiUrl;
search={
  "srcCode":"",
  "hours":""
};
show_enter_valid_srcCode:boolean;
stationsList=[];
allStationsList=[];
subscription;
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
    //this.meta.addTag({ name: 'title', content: 'Live Train Arrivals & Departures at a station | IRCTC Live Status' });
    this.show_enter_valid_srcCode = false;
    this.titleService.setTitle('Indian Railway Enquiry Live Stations | Railway Enquiry');
    this.meta.addTag({ name: 'description', content: 'Indian Railway Enquiry Live Stations information at Railway Enquiry. Use the Live Station feature to get the live status of the trains departing from or arriving at your source station at a specific time. ntes train on-time or delay status at specific station, and list of all trains at a station.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Arrivals, Train Departures,train schedule,IRCTC Live Status,Live Train Arrivals' });
  }

  ngOnInit() {
  }
  getStationDetails(){
    console.log(this.search.hours);
    if(this.search.srcCode && this.search.hours){
       var srcCodeCheck = this.searchForStation(this.search.srcCode);
       if(srcCodeCheck){
      this.router.navigate(['/live-station',this.search.srcCode,this.search.hours]);
       }
       else{
                 this.show_enter_valid_srcCode= true;
       }
    }
  }
  getStations(i){
    // this.show_enter_valid_srcCode= false;
    // this.show_enter_valid_dstCode =false;
    this.stationsList = []; //emptying array
    if (i.length >= 2) {
      this.service.getStationsFromAssets().subscribe(data => {
        this.allStationsList = data.stations;
        this.stationsList = data.stations;
          this.stationsList= this.stationsList.filter(x => x.name.toLowerCase().includes(i.toLowerCase()) || x.code.toLowerCase().includes(i.toLowerCase()));
        
       console.log(this.stationsList);
      })
      }
  }
    searchForStation(item){
      for(let i in this.allStationsList){
        if(this.allStationsList[i].code.toLowerCase() == item.toLowerCase()){
          console.log(this.allStationsList[i].code);
          return true;
        }
      }
      return false;
    }
}
