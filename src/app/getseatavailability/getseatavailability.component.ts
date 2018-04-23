import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-getseatavailability',
  templateUrl: './getseatavailability.component.html',
  styleUrls: ['./getseatavailability.component.css']
})
export class GetseatavailabilityComponent implements OnInit  {
displayedColumns = ['no','station','scheduled_time','halt','day','distance'];
dataSource =[] ;
search={"trainNumber":""
          };
trainsList=[];
classes_array;
days_array;
id;
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
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) {
    this.show_enter_valid_trainNumber=false;
    this.show_message_try_again = false;
    this.show_spinner=false; 
    this.show_classes=false;
    this.show_train_details=false;
    this.show_table=false;
   }

  ngOnInit() {
       this.sub = this.route.params.subscribe(params => {
       this.search.trainNumber=params['id'];
       this.id=this.search.trainNumber;
       
       //this.router.navigate(['/live-status',this.id]);
       this.getStatus();
        });
    //}
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getTrainRoute(){
    if(this.id==this.search.trainNumber){
      this.getStatus();
    }
    this.router.navigate(['/seat-availability',this.search.trainNumber]);
    
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
      if(this.search.trainNumber.match(regex) ){
          var url = 'http://localhost:4000/api/getSeatAvailability';
          //var url = '/api/getTrainRoute';          
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          
          if(data.response_code==200){
            this.statusResult = data;
            this.show_classes = true;
            this.show_train_details=true;
            this.show_table=true;
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = data.route;
            this.classes_array = [];
            this.days_array = [];
            for(let i of data.train.classes){
              if(i.available=="Y"){
                this.classes_array.push(i.code);
              }
            }
            this.classes_array.sort();
            for(let i of data.train.days){
              if(i.runs=="Y"){
                this.days_array.push(i.code);
              }
            }
            console.log(this.statusResult);
            console.log(this.classes_array);
            console.log(this.days_array);
            console.log("Getting Live Status of " + this.search.trainNumber);
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
 
}
