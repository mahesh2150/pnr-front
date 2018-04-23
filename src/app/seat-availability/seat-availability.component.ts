import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seat-availability',
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.css']
})
export class SeatAvailabilityComponent implements OnInit {
minDate = new Date(2000, 0, 1);
maxDate = new Date(2020, 0, 1);
myDate = new Date().setDate(new Date().getDate());
show_enter_valid_trainNumber:boolean;
search={"trainNumber":""};
trainsList=[];
id;
subscription;
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { }

  ngOnInit() {
  }

  getDate1(){
    var res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
      
    console.log(res);
  }
  getTrainRoute(){
    this.show_enter_valid_trainNumber=false;
    if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) ){
        this.id=this.search.trainNumber;
        this.router.navigate(['/seat-availability',this.id]);
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    console.log(this.search.trainNumber);
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
       this.subscription = this.service.getTrainsList(url,this.search).subscribe(data => {
          console.log(data);
          // if(){

          // }
          this.trainsList = data.trains;
        })
      }
  }

}

