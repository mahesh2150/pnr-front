import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-getlivestatus',
  templateUrl: './getlivestatus.component.html',
  styleUrls: ['./getlivestatus.component.css']
})
export class GetlivestatusComponent implements OnInit {
private apiUrl= environment.apiUrl;
displayedColumns = ['sss','station','scheduled_time','actual_time','delay'];
dataSource =[] ;
today = new Date().setDate(new Date().getDate() + 0);
yesterday = new Date().setDate(new Date().getDate() - 1);
twoDaysBefore = new Date().setDate(new Date().getDate() - 2);
threeDaysBefore = new Date().setDate(new Date().getDate() - 3);
myDate = new Date();
search={"trainNumber":"",
        "date":""  
  };
trainsList=[];
id;
private sub: any;
subscription;
dates=[];
srcStationName;
dstStationName;
srcStationCode;
dstStationCode;
srcSchDep;
dstSchArr;
arrDay;
distance;
stops;
statusResult={
  "train":{
  }
};
show_enter_valid_trainNumber:boolean;
show_Train_doesnt_run_on_the_date_queried:boolean;
show_message_try_again:boolean;
show_spinner:boolean; 
show_position:boolean;
show_train_details:boolean;
show_table:boolean;
show_invalid_train_number:boolean;
show_train_related_post:boolean;
show_dates:boolean;
show_days:boolean;
test;
todayDateFormat;

  constructor(private meta: Meta,private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router,  private pipe: DatePipe) {
    this.show_enter_valid_trainNumber=false;
    this.show_train_related_post=false;
    this.show_message_try_again = false;
    this.show_spinner=false; 
    this.show_position=false;
    this.show_train_details=false;
    this.show_table=false;
    this.show_dates=false;
    this.show_days=false;
    this.show_Train_doesnt_run_on_the_date_queried=false;
    this.dates.push({name:'today',value:this.pipe.transform(this.today, 'dd MMM')});
    this.dates.push({name:'yesterday',value:this.pipe.transform(this.yesterday, 'dd MMM')});
    this.dates.push({name:'twoDaysBefore',value:this.pipe.transform(this.twoDaysBefore, 'dd MMM')});
    this.dates.push({name:'threeDaysBefore',value:this.pipe.transform(this.threeDaysBefore, 'dd MMM')});
    this.meta.addTag({ name: 'description', content: 'Check live train running status of Indian Railways (NTES) online at RailwayEnquiry.net. we provide real-time status of all running trains in India. Provide train number to track current location of train with complete delay information and expected time of departure and arrival at each station.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Live train running status,status,Indian Railways,track train,realtime status.' });
  }

  ngOnInit() {
       this.sub = this.route.params.subscribe(params => {
       this.search.trainNumber=params['id'];
       this.id=this.search.trainNumber;
       
       //this.router.navigate(['/live-status',this.id]);
       this.setTodayDate();
       this.getStatus();
        });
    //}
  }
  

  getLiveStatus(){
    if(this.id==this.search.trainNumber){
      this.getStatus();
    }
    this.router.navigate(['/train-live-running-status',this.search.trainNumber]);
  }

  getStatus(){   
    this.show_spinner=false;  
    this.show_table=false;      
    this.show_message_try_again = false;
    this.show_Train_doesnt_run_on_the_date_queried=false;
    this.show_enter_valid_trainNumber=false;
    this.show_train_details=false;  
    this.show_position=false;
    this.show_days=false; 
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) &&  this.search.trainNumber.length==5){
          this.show_spinner=true; 
          var url = this.apiUrl+'/api/getLiveTrainStatus';
          //var url = '/api/getLiveTrainStatus';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          this.show_dates=true;
          
          if(data.response_code==200){
            this.statusResult = data;
            this.stops=data.route.length;
            this.show_position = true;
            this.show_train_details=true;
            this.show_table=true;
            this.show_days=true;
            this.show_train_related_post=true;
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = data.route;
            this.test=data.current_station.code;
            console.log(this.statusResult);
            console.log("Getting Live Status of " + this.search.trainNumber);
            this.titleService.setTitle(''+ data.train.name+' '+ data.train.number+' Train Running Status Live | Railway Enquiry');
            this.getSrcDst();
            this.meta.updateTag({ name: 'description', content: 'Live train running status of '+data.train.number+' '+ data.train.name +'  online. Spot your Train '+ data.train.number+' '+data.train.name + ' Current running and delay history starts from ' +this.srcStationName+ ' to '+this.dstStationName+' at railwayenquiry.net. National Train Enquiry System (NTES) provides real time status of Indian Railways.' },`name='description'`);
            this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
            this.meta.addTag({ name: 'keywords', content: data.train.number+' train running status, '+data.train.name+' Status,'+data.train.name+' schedule,Live Train Running Status' });
            this.setTodayDateForTrainsBetween();
          console.log(this.dates[0]);
          }
          if(data.response_code==210){
            this.show_Train_doesnt_run_on_the_date_queried=true;
          }
          if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
              this.show_invalid_train_number = true;
          }
          this.show_spinner=false;
        })
       
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    } 
  }
  getSrcDst(){
    //console.log(this.dataSource);
    for(let i in this.dataSource){
      //console.log(this.dataSource[i]);
      if(this.dataSource[i].scharr=="Source"){
        this.srcStationName = this.dataSource[i].station.name;
        this.srcStationCode = this.dataSource[i].station.code;
        this.srcSchDep=this.dataSource[i].schdep;
      }
      if(this.dataSource[i].schdep=="Destination"){
        this.dstStationName = this.dataSource[i].station.name;
        this.dstStationCode = this.dataSource[i].station.code;
        this.dstSchArr=this.dataSource[i].scharr;
        this.arrDay=this.dataSource[i].day+1;
        this.distance=this.dataSource[i].distance;
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
  
  getDate(i) {
    
    var res;
    if (i == "today") {
      return res = this.pipe.transform(this.today, 'dd-MM-yyyy');
      
    }
    else if (i == "yesterday") {
      return res = this.pipe.transform(this.yesterday, 'dd-MM-yyyy');

    }
    else if (i == "twoDaysBefore") {
      return res = this.pipe.transform(this.twoDaysBefore, 'dd-MM-yyyy');

    }
    else if (i == "threeDaysBefore") {
      return res = this.pipe.transform(this.threeDaysBefore, 'dd-MM-yyyy');

    }
  }
  setDate(i){
    //console.log(i);
    this.search.date = this.getDate(i);
    this.getStatus();
    //console.log(this.search.date);
  }
  setTodayDate(){
    var i ="today";
    this.search.date=this.getDate(i);
    //console.log(this.search.date);
  }

  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }

  setTodayDateForTrainsBetween(){
    this.todayDateFormat = this.getDate1();
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}
