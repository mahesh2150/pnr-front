import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {Router, NavigationExtras} from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
pnrnumber={"pnr":""};
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
  "date":""
};
classes;
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
private sub: any;
  constructor(private meta: Meta,private router:Router,  private titleService: Title,  private service: CommonService) {
    this.meta.addTag({ name: 'title', content: 'NTES Indian Railway Enquiry | Check Live Running & PNR Status' });
    this.meta.addTag({ name: 'description', content: 'RailwayEnquiry.net is a free online service for travelers who travel on Indian railways. Our national train enquiry system NTES helps you to check live train running status, PNR status, Train Route, IRCTC Seat availability, Train Name/Number, Fare, Arrivals, Cancelled and Rescheduled Trains.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Indian Railways,IRCTC, Reservation Enquiry, PNR Status, Running Status, Train Time Table, Train Route, Train Route Map, Arrival/Departure,Fare Enquiry.' });
   }

  ngOnInit() {
     this.titleService.setTitle('NTES Indian Railway Enquiry | Check Live Running & IRCTC PNR Status');
  }

  getPNR(){
  if(this.pnrnumber.pnr){
    var regex=/^[0-9]+$/;
      if(  this.pnrnumber.pnr.length == 10 && this.pnrnumber.pnr.match(regex) ){

       this.check();
        return false;
      }

  }
}

check(){
   let navigationExtras: NavigationExtras = {
            queryParams: {
                "pnrnumber": this.pnrnumber.pnr
               }
        };
  this.router.navigate(['/check-pnr-status-online'],navigationExtras);
}

getSeatAvailability(){
    //this.search.date = this.getDate1();
    this.show_enter_valid_trainNumber=false;
     if(this.search.trainNumber){
       var regex=/^[0-9]+$/;
      if(this.search.trainNumber.length == 5 && this.search.trainNumber.match(regex) ){
        this.id=this.search.trainNumber;
        this.router.navigate(['/train-seat-availability',this.id]);
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    //console.log(this.search.trainNumber);
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
