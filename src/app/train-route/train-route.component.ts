import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-train-route',
  templateUrl: './train-route.component.html',
  styleUrls: ['./train-route.component.css']
})
export class TrainRouteComponent implements OnInit {
show_enter_valid_trainNumber:boolean;
search={"trainNumber":""};
trainsList=[];
id;
subscription;
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
  }

    getTrainRoute(){
    this.show_enter_valid_trainNumber=false;
    if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) ){
        this.id=this.search.trainNumber;
        this.router.navigate(['/train-schedule',this.id]);
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
