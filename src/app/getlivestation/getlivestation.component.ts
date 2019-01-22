import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-getlivestation',
  templateUrl: './getlivestation.component.html',
  styleUrls: ['./getlivestation.component.css']
})
export class GetlivestationComponent implements OnInit {
  private apiUrl= environment.apiUrl;
private sub: any;
search={
  "srcCode":"",
  "hours":""
};
total;
displayedColumns = ['no','Trains','scheduled','actual','delay'];
dataSource =[] ;
stationsList =[];
allStationsList=[];
show_livestation_table:boolean;
show_spinner:boolean; 
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
    this.show_livestation_table=false;
    this.show_spinner = false;
    this.meta.addTag({ name: 'description', content: 'View live train status, arrivals and departure information of trains at a station within a window period.  Check specific Indian Railways train on-time or delay status at specific station, and also check list of all trains at a station.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Arrivals, Train Departures,train schedule,IRCTC Live Status,Live Train Arrivals' });
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
       this.search.srcCode=params['id'];
       this.search.hours=params['id1'];
       });
        this.getTrains();
  }
  getTrains(){
    this.show_spinner=true;
    this.show_livestation_table = false;
     if(this.search.srcCode && this.search.hours){
          //var url = '/api/getLiveStation';
    var url = this.apiUrl+'/api/getLiveStation';
     this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
              // this.show_train_details=true;
              // this.search_day=this.getDay();
              // this.search_month=this.getMonth();
              // this.statusResult.src=data.trains[0].from_station.name;
              // this.statusResult.dst=data.trains[0].to_station.name;
               this.dataSource = [];
               this.dataSource = data.trains;
               this.total = data.total; 
              console.log(data);
              this.show_spinner=false;
              this.show_livestation_table = true;
              this.titleService.setTitle( this.search.srcCode +' Station Live Arrival Departure Status | Railway Enquiry');
              this.meta.updateTag({ name: 'description', content: 'Know in real time which trains are passing through '+this.search.srcCode+' in next 2 to 4 hours. Indian Railways live Arrivals and Departures information of trains at a station within a window period.  Check train on-time or delay status at specific station, and also check list of all trains at a station.' },`name='description'`);
              this.meta.updateTag({ name: 'keywords', content: this.search.srcCode+' Station Arrival,'+this.search.srcCode+' Station Departure,Arrival Departure at '+this.search.srcCode },`name='keywords'`);
          }
          if(data.response_code == 405){
              this.show_livestation_table = false;
              this.show_spinner=false;
            
          }
        })
       }
       else{
              this.router.navigate(['/live-station']);
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
    console.log("all stations"+this.allStationsList);
      for(let i in this.allStationsList){
        if(this.allStationsList[i].code.toLowerCase() == item.toLowerCase()){
          console.log(this.allStationsList[i].code);
          return true;
        }
      }
      return false;
  }

}
