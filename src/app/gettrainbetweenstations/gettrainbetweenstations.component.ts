import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-gettrainbetweenstations',
  templateUrl: './gettrainbetweenstations.component.html',
  styleUrls: ['./gettrainbetweenstations.component.css']
})
export class GettrainbetweenstationsComponent implements OnInit {
private apiUrl= environment.apiUrl;
private sub: any;
search={
  "srcCode":"",
  "dstCode":"",
  "date":""
};
id1;
displayedColumns = ['no','Trains','Dep','Arr','Travel_Time'];
dataSource =[] ;
statusResult={
  "src":"",
  "dst":"",
  "srcCode":"",
  "dstCode":""
};
total;
search_day = new Date();;
search_month;
show_train_details:boolean;
search_month_full;
show_spinner:boolean; 
show_table:boolean;
minDate = new Date();
maxDate = new Date(new Date().setDate(new Date().getDate()+30));
myDate = new Date();
show_enter_valid_srcCode:boolean;
show_enter_valid_dstCode:boolean;
show_trains_data:boolean;
stationsList=[];
allStationsList=[];
  constructor(private meta: Meta,private titleService: Title,private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router,private pipe: DatePipe) {
    this.meta.addTag({ name: 'description', content: 'Checkout the full list of running trains between stations by just entering source and destination station name or code. Our IRCTC Indian Railways enquiry system returns full information of trains Between Two Stations like Train Number, Name, Train Route, departure, arrival and travel time.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'train between station,irctc train enquiry between two stations,indian railway enquiry between two station,irctc train enquiry' });
  }

  ngOnInit() {
    this.show_train_details=false;
    this.show_spinner=false;
    this.show_table=false;
    this.show_trains_data=false;
    this.sub = this.route.params.subscribe(
      params => {
       this.search.srcCode=params['id'];
       this.search.dstCode=params['id1'];
       this.search.date=this.getDate1();
       });
    console.log(this.search.date);
    this.getTrains();
  }

  // getNewDate(){
  //   var res;
  //   return res = this.pipe.transform(this.search.date);
  // }
  //  getDay(){
  //   var res;
  //   return res = this.pipe.transform(this.search.date, 'dd');
  // }
  // getMonth(){
  //   var res;
  //   return res = this.pipe.transform(this.search.date, 'MMM');
  // }

  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }

  getTrains(){
    this.show_spinner=true; 
    this.show_table=false;
    this.show_trains_data=false;
    this.search.date=this.getDate1();
    var url = this.apiUrl+'/api/getTrainBetweenStations';
    //var url = 'http://localhost:4000/api/getTrainBetweenStations';
     this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
              this.show_table=true;
              this.show_spinner=false; 
              this.show_train_details=true;
              this.show_trains_data=true;
              //this.search_day=this.getDay();
              //this.search_month=this.getMonth();
              this.statusResult.src=data.trains[0].from_station.name;
              this.statusResult.dst=data.trains[0].to_station.name;
              this.statusResult.srcCode=data.trains[0].from_station.code;
              this.statusResult.dstCode=data.trains[0].to_station.code;
              this.dataSource = [];
              this.dataSource = data.trains;
              console.log(this.dataSource);
              this.total=data.total;
              console.log(data);
              this.titleService.setTitle(''+ data.trains[0].from_station.name+' to '+ data.trains[0].to_station.name+'  Trains | Railway Enquiry');
              this.meta.updateTag({ name: 'description', content: 'check all running trains between '+ this.statusResult.src +' to '+ this.statusResult.dst + ' at Railway Enquiry. Our IRCTC National Train Enquiry System (NTES) gives full information of trains like Train Number, Name, Route, departure, arrival & travel time. Visit us to get the list of indian railway trains between stations.' },`name='description'`);
              this.meta.updateTag({ name: 'keywords', content: this.statusResult.src+' to '+this.statusResult.dst+' Trains,Trains Between '+this.statusResult.src+' to '+this.statusResult.dst+' ,'+this.statusResult.src+' to '+this.statusResult.dst+' Time Table,'+this.statusResult.src+' to '+this.statusResult.dst+' Travel Time' },`name='keywords'`);
          }
        })
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
