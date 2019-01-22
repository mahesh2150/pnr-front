import { Component, OnInit } from '@angular/core';
//import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  //public location = '' ;
  constructor(public router: Router) {
    //console.log(this.meta)
    //this.meta.addTag({ name: 'title', content: 'NTES Indian Railway Enquiry | Check Live Running & PNR Status' });
  //   this.meta.addTag({ name: 'description', content: 'RailwayEnquiry.net is a free online service for travelers who travel on Indian railways. Our service helps you to check Live Train Status, PNR Status, Train Route, Reservation Seat availability, Train Name/Number, Fare, Arrivals, Cancelled & Rescheduled Trains etc.' });
  //   this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
  //   this.meta.addTag({ name: 'keywords', content: 'Indian Railways,IRCTC, Reservation Enquiry, PNR Status, Running Status, Train Time Table, Train Route, Train Route Map, Arrival/Departure,Fare Enquiry.' });
  // 
  //this.location = router.url;
}
  ngOnInit() {
    //console.log(this.meta)
  }

}
