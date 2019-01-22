import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-getrescheduledtrains',
  templateUrl: './getrescheduledtrains.component.html',
  styleUrls: ['./getrescheduledtrains.component.css']
})
export class GetrescheduledtrainsComponent implements OnInit {
  private apiUrl= environment.apiUrl;
private sub: any;
search={
 "date":""
};
total;
displayedColumns = ['no','Trains','src','dst','res_time','res_date','time_diff'];
dataSource =[] ;
  constructor(private meta: Meta,private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
    this.meta.addTag({ name: 'description', content: 'Get list of all Indian Railways rescheduled trains on a particular date. Just enter date to check List of IRCTC trains rescheduled by Indian railways due to various reasons, Our NTES returns Train Number, Train Name, Rescheduled Time, Source, Destination, Rescheduled Date and Time Difference.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'rescheduled trains, train rescheduled status,train rescheduled today,list of trains rescheduled today' });
 
  }

 ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
       this.search.date=params['id'];
       });
    this.getTrains();
  }

getTrains(){
  
    var url = this.apiUrl+'/api/getRescheduledTrains';
    // var url = 'http://localhost:4000/api/getRescheduledTrains';
     this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){
              this.dataSource = [];
              this.dataSource = data.trains;
              console.log(data);
              this.titleService.setTitle(this.search.date+' Rescheduled Trains');
              
          }
        })
  }

}
