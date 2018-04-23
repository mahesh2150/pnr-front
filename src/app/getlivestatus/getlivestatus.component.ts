import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-getlivestatus',
  templateUrl: './getlivestatus.component.html',
  styleUrls: ['./getlivestatus.component.css']
})
export class GetlivestatusComponent implements OnInit {
displayedColumns = ['sss','station','scheduled_time','actual_time','delay'];
dataSource =[] ;
today = new Date().setDate(new Date().getDate() + 0);
yesterday = new Date().setDate(new Date().getDate() - 1);
twoDaysBefore = new Date().setDate(new Date().getDate() - 2);
threeDaysBefore = new Date().setDate(new Date().getDate() - 3);
search={"trainNumber":"",
        "date":""  
  };
trainsList=[];
id;
private sub: any;
subscription;
dates=[];
statusResult={};
show_enter_valid_trainNumber:boolean;
show_Train_doesnt_run_on_the_date_queried:boolean;
show_message_try_again:boolean;
show_spinner:boolean; 
show_position:boolean;
show_train_details:boolean;
show_table:boolean;
test;
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router,  private pipe: DatePipe) {
    this.show_enter_valid_trainNumber=false;
    this.show_message_try_again = false;
    this.show_spinner=false; 
    this.show_position=false;
    this.show_train_details=false;
    this.show_table=false;
    this.show_Train_doesnt_run_on_the_date_queried=false;
    this.dates.push({name:'today',value:this.pipe.transform(this.today, 'dd MMM')});
    this.dates.push({name:'yesterday',value:this.pipe.transform(this.yesterday, 'dd MMM')});
    this.dates.push({name:'twoDaysBefore',value:this.pipe.transform(this.twoDaysBefore, 'dd MMM')});
    this.dates.push({name:'threeDaysBefore',value:this.pipe.transform(this.threeDaysBefore, 'dd MMM')});
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getLiveStatus(){
    if(this.id==this.search.trainNumber){
      this.getStatus();
    }
    this.router.navigate(['/live-status',this.search.trainNumber]);
    
  }

  getStatus(){   
    this.show_spinner=true;  
    this.show_table=false;      
    this.show_message_try_again = false;
    this.show_Train_doesnt_run_on_the_date_queried=false;
    this.show_enter_valid_trainNumber=false;
    this.show_train_details=false;  
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) ){
          var url = 'http://localhost:4000/api/getLiveTrainStatus';
          //var url = '/api/getLiveTrainStatus';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          
          if(data.response_code==200){
            this.statusResult = data;
            this.show_position = true;
            this.show_train_details=true;
            this.show_table=true;
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = data.route;
            this.test=data.current_station.code;
            console.log(this.statusResult);
            console.log("Getting Live Status of " + this.search.trainNumber);
          }
          if(data.response_code==210){
            this.show_Train_doesnt_run_on_the_date_queried=true;
          }
          if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
              this.show_message_try_again = true;
          }
          this.show_spinner=false;
        })
       
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    } 
  }

  getTrains(i) {
      if(this.subscription){
        this.subscription.unsubscribe();
      }

      this.trainsList= [];
      console.log(i);
      if (i.length >= 3) {
        var url = 'http://localhost:4000/api/getTrainsList';
        //var url = '/api/getTrainsList';
        //var url = "https://api.railwayapi.com/v2/suggest-train/train/" + i + "/apikey/8n6hg4r3ga/";
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          console.log(data);
          this.trainsList = data.trains;
        })
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

}
