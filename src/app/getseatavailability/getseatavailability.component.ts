import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-getseatavailability',
  templateUrl: './getseatavailability.component.html',
  styleUrls: ['./getseatavailability.component.css']
})
export class GetseatavailabilityComponent implements OnInit  {
  private apiUrl= environment.apiUrl;
displayedColumns = ['train_number','train_name','date','src','dst','quota'];
displayedColumns1 = ['date','availability'];
dataSource =[] ;
dataSource1 =[] ;
trainName;  
search={
  "trainNumber":"",
  "srcCode":"",
  "dstCode":"",
  "classCode":"",
  "quota":"",
  "date":""
};
trainsList=[];
classes_array;
days_array;
id;
minDate = new Date();
maxDate = new Date(new Date().setDate(new Date().getDate()+30));
myDate = new Date();
private sub: any;
subscription;
sourceStationsList=[];
destinationStationsList=[];
statusResult={
  "train":{
    "classes":{
      "available":""
    }
  }
};
show_train_related_post:boolean;
show_enter_valid_trainNumber:boolean;
show_message_No_Data_Available:boolean;
show_spinner:boolean;  
show_table:boolean;
classes;
availableClasses=[];
quotas=[
      {value:"GN", name:"General Quota"},
      {value:"LD", name: "Ladies Quota"},
      {value:"HO", name:"Head quarters/high official Quota"},
      {value:"DF", name:"Defence Quota"},
      {value:"PH", name:"Parliament house Quota"},
      {value:"FT", name:"Foreign Tourist Quota"},
      {value:"DP", name:"Duty Pass Quota"},
      {value:"TQ", name:"Tatkal Quota"},
      {value:"PT", name:"Premium Tatkal Quota"},
      {value:"SS", name:"Female(above 45 Year)/Senior Citizen/Travelling alone"},
      {value:"HP", name:"Physically Handicapped Quota"},
      {value:"RE", name:"Railway Employee Staff on Duty for the train"},
      {value:"GNRS", name:"General Quota Road Side"},
      {value:"OS", name:"Out Station"}
];
    srcSelected;
    dstSelected;
    quotaSelected='GN';
    classSelected;

  constructor(private meta: Meta,private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router,private pipe: DatePipe) {
    this.show_train_related_post=false;
    this.show_enter_valid_trainNumber=false;
    this.show_message_No_Data_Available=false;
    this.show_spinner=false;  
     this.show_table=false;
     this.meta.addTag({ name: 'description', content: 'Check Indian Railways Seat Availability of various trains, Routes, with class option (1A, 2A,3A,Slepper etc) upto 4 months advance at railwayenquiry.net. Get Details of IRCTC fares, trains list, current booking, stations list, train schedules, routes between source and destinations of your journey.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Seat Availability,indian railway seat availability, train enquiry, irctc availability, railway reservation,train seat availability' });
   }

  ngOnInit() {
       this.sub = this.route.params.subscribe(
      params => {
       this.search.trainNumber=params['id'];
       //this.id=this.search.trainNumber;
       });
      if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) &&  this.search.trainNumber.length==5){
       this.getSourceStationCodes();
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
      }
  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

   getSeats(){
     console.log("inside loop");
    // if(this.id==this.search.trainNumber){
      
    // }
    this.getSeatAvailability();
    this.router.navigate(['/train-seat-availability',this.search.trainNumber]);
    
  }
  getSeatAvailability(){   
     this.show_spinner=true;  
     this.show_table=false;  
     this.show_message_No_Data_Available=false;    
    // this.show_message_try_again = false;
     this.show_enter_valid_trainNumber=false;
    // this.show_train_details=false;  
    // this.show_classes=false;
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex)  &&  this.search.trainNumber.length==5){
          var url = this.apiUrl+'/api/getSeatAvailability';
          //var url = '/api/getSeatAvailability';  
        console.log(url);
        this.getSeatAvailabilityLoop(url);
        
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    } 
  }

  getSeatAvailabilityLoop(url){
    
    this.search.srcCode=this.srcSelected;
    this.search.dstCode=this.dstSelected;
    this.search.date=this.getDate1();
    this.search.quota=this.quotaSelected;
    this.search.classCode=this.classSelected;
    console.log(this.search);
    this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          console.log(data);          
          if(data.response_code==200){
             //this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource.push(data);
            this.dataSource1 = [];
            this.dataSource1 = data.availability;
            this.trainName=data.train.name;
            console.log(this.dataSource1);
            this.titleService.setTitle(data.train.name+' '+ data.train.number+' IRCTC Seat Availability | Railway Enquiry');
            this.meta.updateTag({ name: 'description', content: 'IRCTC Seat Availability of '+data.train.number+' '+data.train.name+' online. Our National Train Enquiry System (NTES) gives you current Seat Availability of all train running under Indian Railway.'+this.search.srcCode+' to '+this.search.dstCode+' '+data.train.name+' fares, current booking, timetable, train schedule and route.'},`name='description'`);
            this.show_train_related_post=true;
            this.show_spinner=false;  
            this.show_table=true;  
          }
          if(data.response_code==404){            
            this.show_message_No_Data_Available = true;
            this.show_spinner=false;
            this.show_table=false;
          }
          if(data.response_code==420){            
            console.log("420 error");
          }
        })
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

    getSourceStationCodes(){
      this.sourceStationsList=[]; // empty it before pushing data into it...
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.length == 5 && this.search.trainNumber.match(regex) ){
         var url = this.apiUrl+'/api/getTrainRoute';
         // var url = '/api/getTrainRoute';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
            console.log(data);
            var length = data.route.length;
            console.log(length);
            this.srcSelected=data.route[0].station.code;
           this.dstSelected=data.route[length-1].station.code;
           console.log(this.dstSelected);
            this.sourceStationsList=data.route;
            this.classes=data.train.classes;
            console.log(this.sourceStationsList);
            console.log(this.classes);
            this.setDestCodes();
            this.setClasses();
         }
         
          if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
              //this.show_message_try_again = true;
          }
          //this.show_spinner=false;
        })
    }
  }
  setDestCodes(){
    this.destinationStationsList=[];
    var ind = this.getIndexBySourceCode();
    for(var i = ind+1,j=0; i < this.sourceStationsList.length; i++,j++){
      this.destinationStationsList[j] = this.sourceStationsList[i];
    }
    console.log(this.destinationStationsList);
  }
  getIndexBySourceCode() {
          for (var i = 0; i < this.sourceStationsList.length; i++) {
          if (this.sourceStationsList[i].station.code == this.srcSelected) {
          return i;
          }
          }
          return null;
  }
  setClasses(){
    //this.classes=[];
    for(var j=0; j < this.classes.length; j++){
      if(this.classes[j].available=="Y"){
      this.availableClasses.push(this.classes[j]);
      // this.displayedColumns1.push(this.classes[j].code);
      // console.log(this.displayedColumns1);
    }
    //this.availableClasses.push(this.classes[j]);
    console.log(this.availableClasses);
  }
  this.classSelected=this.availableClasses[0].code;
  this.getSeatAvailability();
  }
  
  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }
 
}
