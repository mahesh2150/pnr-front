import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cancelled-trains',
  templateUrl: './cancelled-trains.component.html',
  styleUrls: ['./cancelled-trains.component.css']
})
export class CancelledTrainsComponent implements OnInit {
minDate = new Date();
maxDate = new Date(new Date().setDate(new Date().getDate()+30));
myDate = new Date();
search={
  "date":""
};
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { 
    //this.meta.addTag({ name: 'title', content: 'Check Indian Railways Cancelled Trains | Railwayenquiry.net' });
    this.titleService.setTitle('Check Indian Railways Cancelled Trains | Railwayenquiry.net');
    this.meta.addTag({ name: 'description', content: 'Get list of all Indian Railways cancelled trains on a particular day. Also check the list of fully cancelled trains(not running from source to destination) of IRCTC and get notified if your train gets cancelled, also check cancelled trains history.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'trains cancelled, train cancellations today,trains cancelled today' });
  }

  ngOnInit() {
  }
  getTrains(){
    this.search.date = this.getDate1();
    console.log(this.search.date);
    if(this.search.date){
      this.search.date = this.getDate1();
      this.router.navigate(['/check-cancelled-trains',this.search.date]);
    }
  }
  getDate1(){
    var res;
    return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
  }

}
