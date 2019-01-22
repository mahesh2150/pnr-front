import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-train-fare',
  templateUrl: './train-fare.component.html',
  styleUrls: ['./train-fare.component.css']
})
export class TrainFareComponent implements OnInit {
  private apiUrl= environment.apiUrl;
  minDate = new Date();
maxDate = new Date(new Date().setDate(new Date().getDate()+30));
myDate = new Date();
show_enter_valid_trainNumber:boolean;
search={
  "trainNumber":"",
  "srcCode":"",
  "dstCode":"",
  "classCode":"",
  "quota":"",
  "date":"",
  "age":""
};
classes=[

     {value:"1A", name:"First AC"},
     {value:"2A", name: "AC 2-tier sleeper"},
     {value:"FC", name:"First class"},
     {value:"3A", name:"AC 3 Tier"},
     {value:"3E", name:"AC 3 Tier Economy"},
     {value:"CC", name:"AC chair Car"},
     {value:"SL", name:"Sleeper Class"},
     {value:"2S", name:"Second Sitting"}
];
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
trainsList=[];
id;
sourceStationsList=[];
destinationStationsList=[];
subscription;
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { 
    //this.meta.addTag({ name: 'title', content: 'Train Fare Enquiry | IRCTC Indian Railways Fare | Railwayenquiry.net' });
    this.titleService.setTitle('Train Fare Enquiry Indian Railways | IRCTC Fare | Railway Enquiry');
    this.meta.addTag({ name: 'description', content: 'Make train fare enquiry online of Indian Railways at Railway Enquiry.  Just enter a few details such as train number, date of journey, source station, destination station, class, quota and age and click enter. You will get all the details about train fare.Visit us today to make train fare enquiry.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Fare Enquiry, Fare calculator,IRCTC Indian Railways Fare,train fare prices.' });
 
  }

  ngOnInit() {
  }

  getSourceStationCodes(i){
    this.sourceStationsList=[]; // empty it before pushing data into it...
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
         if(this.search.trainNumber.match(regex) ){
          //var url = 'http://localhost:4000/api/getTrainRoute';
          var url = this.apiUrl+'/api/getTrainRoute';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
            console.log("data");
            this.sourceStationsList=data.route;
            console.log(this.sourceStationsList);
         }
         
          if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
              //this.show_message_try_again = true;
          }
          //this.show_spinner=false;
        })
       
      }
    }
}
  setDestCodes(){
    var ind = this.getIndexBySourceCode();
    for(var i = ind+1,j=0; i < this.sourceStationsList.length; i++,j++){
      this.destinationStationsList[j] = this.sourceStationsList[i];
    }
    console.log(this.destinationStationsList);
  }
  
  getIndexBySourceCode() {
          for (var i = 0; i < this.sourceStationsList.length; i++) {
          if (this.sourceStationsList[i].station.code == this.search.srcCode) {
          return i;
          }
          }
          return null;
  }

  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }
  getTrainFare(){
    this.search.date = this.getDate1();
    this.show_enter_valid_trainNumber=false;
    if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) ){
        this.router.navigate(['/train-fare-enquiry',this.search.trainNumber,this.search.srcCode,this.search.dstCode,this.search.classCode,this.search.quota,this.search.date,this.search.age]);
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    console.log(this.search.trainNumber);
    }
  }
  
  getTrains(j) {
    var i = j.target.value;
    if(!(j.key === "ArrowDown" || j.key === "ArrowUp")){
     if(this.subscription){
        this.subscription.unsubscribe();
      }
      var regex=/^[0-9]+$/;
      this.trainsList= [];
      console.log(i);
      if (i.length >= 3) {
       this.subscription = this.service.getTrainsFromAssets().subscribe(data => {
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

}

