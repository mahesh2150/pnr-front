import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rescheduled-trains',
  templateUrl: './rescheduled-trains.component.html',
  styleUrls: ['./rescheduled-trains.component.css']
})
export class RescheduledTrainsComponent implements OnInit {
minDate = new Date();
maxDate = new Date(new Date().setDate(new Date().getDate()+30));
myDate = new Date();
search={
  "date":""
};
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { 
    //this.meta.addTag({ name: 'title', content: 'IRCTC Rescheduled Trains List - Indian Railways - Railwayenquiry.net' });
    this.titleService.setTitle('IRCTC Rescheduled Trains List - Indian Railways - Railwayenquiry.net');
    this.meta.addTag({ name: 'description', content: 'Get list of all Indian Railways rescheduled trains on a particular date. Just enter date to check List of IRCTC trains rescheduled by Indian railways due to various reasons, Our NTES returns Train Number, Train Name, Rescheduled Time, Source, Destination, Rescheduled Date and Time Difference.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'rescheduled trains, train rescheduled status,train rescheduled today,list of trains rescheduled today' });
 
  }

  ngOnInit() {
  }
  getTrains(){
    this.search.date = this.getDate1();
    console.log(this.search.date);
    if(this.search.date){
      this.search.date = this.getDate1();
      this.router.navigate(['/check-rescheduled-trains',this.search.date]);
    }
  }
  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }

}
