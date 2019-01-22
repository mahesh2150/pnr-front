import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-live-status',
  templateUrl: './live-status.component.html',
  styleUrls: ['./live-status.component.css']
})
export class LiveStatusComponent implements OnInit {
show_enter_valid_trainNumber:boolean;
search={"trainNumber":""};
trainsList=[];
trainsList1=[];
id;
subscription;
private sub: any;
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
    this.show_enter_valid_trainNumber = false;
    //this.meta.addTag({ name: 'title', content: 'Live Train Running Status | NTES Track & Spot you train Online' });
    this.titleService.setTitle('Live Train Running Status | NTES Spot Your Train | Railway Enquiry');
    this.meta.addTag({ name: 'description', content: 'Check live train running status of Indian Railways online at RailwayEnquiry.net. ntes provides real time status of all running trains in India. enter train number to Spot Your Train with delay information. Track current location of train with expected time of departure & arrival at each station.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Live train running status,status,Indian Railways,track train,realtime status.' });
  }

  ngOnInit() {
  }
 
    
  getLiveStatus(){
    this.show_enter_valid_trainNumber=false;
    if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.length == 5 && this.search.trainNumber.match(regex) ){
        this.id=this.search.trainNumber;
        this.router.navigate(['/train-live-running-status',this.id]);
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    //console.log(this.search.trainNumber);
    }
  }
  
  // getTrains(i) {
  //    if(this.subscription){
  //       this.subscription.unsubscribe();
  //     }
  //     this.trainsList= [];
  //     console.log(i);
  //     if (i.length >= 3) {
  //       //var url = 'http://localhost:4000/api/getTrainsList';
  //       var url = '/api/getTrainsList';
  //       //var url = "https://api.railwayapi.com/v2/suggest-train/train/" + i + "/apikey/8n6hg4r3ga/";
  //       console.log(url);
  //      this.subscription = this.service.getTrainsList(url,this.search).subscribe(data => {
  //         console.log(data);
  //         // if(){

  //         // }
  //         this.trainsList = data.trains;
  //       })
  //     }
  // }

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

}
