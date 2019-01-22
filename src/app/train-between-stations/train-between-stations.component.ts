import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-train-between-stations',
  templateUrl: './train-between-stations.component.html',
  styleUrls: ['./train-between-stations.component.css']
})
export class TrainBetweenStationsComponent implements OnInit {
// minDate = new Date();
// maxDate = new Date(new Date().setDate(new Date().getDate()+30));
// myDate = new Date();
search={
  "srcCode":"",
  "dstCode":"",
  // "date": ""
};
id={
  
};
id1;
// sourceStationsList=[];
// destinationStationsList=[];
stationsList=[];
allStationsList=[];
subscription;
show_enter_valid_srcCode:boolean;
show_enter_valid_dstCode:boolean;
partial_name={
  "name":""
};
private sub: any;
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { 
    //this.meta.addTag({ name: 'title', content: 'Indian Railway Enquiry | Trains Between Two Stations | NTES' });
    this.titleService.setTitle('Running trains between stations | NTES | Railway Enquiry');
    this.meta.addTag({ name: 'description', content: 'check running trains between stations at Railway Enquiry by just entering source and destination station name or code. Our IRCTC National Train Enquiry System (NTES) gives full information of trains Between Two Stations like Train Number, Name, Train Route, departure, arrival and travel time.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'train between station,irctc train enquiry between two stations,indian railway enquiry between two station,irctc train enquiry' });
  this.show_enter_valid_srcCode= false;
  this.show_enter_valid_dstCode =false;
  }

  ngOnInit() {
  
  }
  
  // getDate1(){
  //   var res;
  //   return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  // }
  
  getTrains(){
    if(this.search.srcCode && this.search.dstCode){ 
      var srcCodeCheck = this.searchForStation(this.search.srcCode);
      var dstCodeCheck = this.searchForStation(this.search.dstCode);
      if(srcCodeCheck && dstCodeCheck){
       // this.search.date = this.getDate1();
        this.router.navigate(['/running-trains-between-stations',this.search.srcCode,this.search.dstCode]);
      }
      if(!srcCodeCheck){
        this.show_enter_valid_srcCode= true;

      }
      if(!dstCodeCheck){
        this.show_enter_valid_dstCode =true;
      }
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

getStations(i){
    this.show_enter_valid_srcCode= false;
    this.show_enter_valid_dstCode =false;
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

}
