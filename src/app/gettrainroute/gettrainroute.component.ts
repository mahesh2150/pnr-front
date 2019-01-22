import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-gettrainroute',
  templateUrl: './gettrainroute.component.html',
  styleUrls: ['./gettrainroute.component.css']
})
export class GettrainrouteComponent implements OnInit {
private apiUrl= environment.apiUrl;
displayedColumns = ['no','station','scheduled_time','halt','day','distance'];
dataSource =[] ;
search={"trainNumber":""
          };
trainsList=[];
classes_array;
//days_array;
id;
myDate = new Date();
private sub: any;
subscription;
statusResult={
  "train":{
    "classes":{
      "available":""
    }
  }
};
show_enter_valid_trainNumber:boolean;
show_message_try_again:boolean;
show_spinner:boolean; 
show_classes:boolean;
show_train_details:boolean;
show_table:boolean;
srcStationName;
dstStationName;
srcStationCode;
dstStationCode;
srcSchDep;
dstSchArr;
arrDay;
stops;
show_train_related_post:boolean;
todayDateFormat;
  constructor(private meta: Meta, private titleService: Title,private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router,  private pipe: DatePipe) {
    this.show_enter_valid_trainNumber=false;
    this.show_message_try_again = false;
    this.show_spinner=false; 
    this.show_classes=false;
    this.show_train_details=false;
    this.show_table=false;
    this.show_train_related_post=false;
    this.meta.addTag({ name: 'description', content: 'Enter five digit train number or train name to get details about all the stations in the train’s route i.e get where you are going with some of the most scenic views. our service is one of the fast & reliable to check the route map of any Train related to Indian Railways (NTES) here.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Route,Train Route Map, Train Map,Indian Railways Route Map' });
  
   }

  ngOnInit() {
    this.titleService.setTitle('NTES Indian Railway Enquiry | Check Live Running & PNR Status');
       this.sub = this.route.params.subscribe(params => {
       this.search.trainNumber=params['id'];
       this.id=this.search.trainNumber;
       
       //this.router.navigate(['/live-status',this.id]);
       this.getStatus();
        });
    //}
  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  getTrainRoute(){
    if(this.id==this.search.trainNumber){
      this.getStatus();
    }
    this.router.navigate(['/indian-train-routes',this.search.trainNumber]);
    
  }

  getStatus(){   
    this.show_spinner=true;  
    this.show_table=false;      
    this.show_message_try_again = false;
    this.show_enter_valid_trainNumber=false;
    this.show_train_details=false;  
    this.show_classes=false;
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) &&  this.search.trainNumber.length==5){
          var url = this.apiUrl+'/api/getTrainRoute';
          //var url = '/api/getTrainRoute';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
            console.log(data);
            this.statusResult = data;
            this.stops=data.route.length;
            this.show_classes = true;
            this.show_train_details=true;
            this.show_table=true;
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = data.route;
            this.classes_array = [];
            //this.days_array = [];
            for(let i of data.train.classes){
              if(i.available=="Y"){
                this.classes_array.push(i.code);
              }
            }
            this.classes_array.sort();
            // for(let i of data.train.days){
            //   if(i.runs=="Y"){
            //     this.days_array.push(i.code);
            //   }
            // }
            console.log(this.classes_array);
            //console.log(this.days_array);
            console.log("Getting Live Status of " + this.search.trainNumber);
            this.titleService.setTitle(''+ data.train.name+' Route Map, '+ data.train.number+' Train Schedule & Time Table | Railway Enquiry');
            this.getSrcDst();
            this.meta.updateTag({ name: 'description', content: ''+ data.train.name+' Route Map, '+ data.train.number+' Train Schedule & Time Table at railwayenquiry.net, '+this.srcStationCode+'-'+this.dstStationCode+' '+data.train.name+' '+ this.srcStationName+' To '+this.dstStationName+' .Enter five digit train number or train name to get details like Train Schedule, Route Map and Time Table.' },`name='description'`);
            this.meta.updateTag({ name: 'keywords', content: data.train.number+' '+data.train.name+' Route Map,'+data.train.name+' Train Schedule,'+data.train.number+ 'Train Schedule,'+data.train.name+' Time Table' },`name='keywords'`);
            this.show_train_related_post=true;
            this.setTodayDateForTrainsBetween();
          }
         
          if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
              this.show_message_try_again = true;
          }
          this.show_spinner=false;
        })
       
      }
      else{
        this.show_enter_valid_trainNumber=true;
        this.show_spinner=false;
      }
    } 
  }
  getSrcDst(){
    //console.log(this.dataSource);
    for(let i in this.dataSource){
      //console.log(this.dataSource[i]);
      if(this.dataSource[i].scharr=="SOURCE"){
        this.srcStationName = this.dataSource[i].station.name;
        this.srcStationCode = this.dataSource[i].station.code;
        this.srcSchDep=this.dataSource[i].schdep;
      }
      if(this.dataSource[i].schdep=="DEST"){
        this.dstStationName = this.dataSource[i].station.name;
        this.dstStationCode = this.dataSource[i].station.code;
        this.dstSchArr=this.dataSource[i].scharr;
        this.arrDay=this.dataSource[i].day;
      }
    }
  }
   getTrains(j) {
    var i = j.target.value;
    if(!(j.key === "ArrowDown" || j.key === "ArrowUp")){
      console.log(i);
      var regex=/^[0-9]+$/;
      this.trainsList= [];
      if (i.length >= 3) {
      this.service.getTrainsFromAssets().subscribe(data => {
        this.trainsList = data.trains;
        if(i.match(regex)){
          this.trainsList= this.trainsList.filter(x => x.number.includes(i));
        }
        else{
          this.trainsList= this.trainsList.filter(x => x.name.toLowerCase().includes(i.toLowerCase()));
        }   
       console.log(this.trainsList);
      })
    }
  }
    
  } 
    getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }

 setTodayDateForTrainsBetween(){
    this.todayDateFormat = this.getDate1();
  }
}
