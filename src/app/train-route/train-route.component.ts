import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

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
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
    //this.meta.addTag({ name: 'title', content: 'Check IRCTC Train Routes & Stations | Indian Railways Route Map' });
    this.titleService.setTitle('Indian Train Route Map, schedule, timings Online | Railway Enquiry');
    this.meta.addTag({ name: 'description', content: 'Indian Train Route Map, schedule, timings Online at Railway Enquiry. Enter 5 digit train number or train name to get details about all the stations in the train’s route i.e get where you are going with some of the most scenic views.check route map of any Train related to Indian Railways (NTES).' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Route,Train Route Map, Train Map,Indian Railways Route Map' });
  }

  ngOnInit() {
  }

    getTrainRoute(){
    this.show_enter_valid_trainNumber=false;
    if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.length == 5 && this.search.trainNumber.match(regex) ){
        this.id=this.search.trainNumber;
        this.router.navigate(['/indian-train-routes',this.id]);
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
