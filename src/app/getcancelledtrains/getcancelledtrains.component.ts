import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-getcancelledtrains',
  templateUrl: './getcancelledtrains.component.html',
  styleUrls: ['./getcancelledtrains.component.css']
})
export class GetcancelledtrainsComponent implements OnInit {
  private apiUrl= environment.apiUrl;
private sub: any;
search={
 "date":""
};
total;
displayedColumns = ['no','Trains','src','dst','type','start'];
dataSource =[] ;
  constructor(private meta: Meta,private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) { 
     this.meta.addTag({ name: 'description', content: 'Get list of all Indian Railways cancelled trains on a particular day. Also check the list of fully cancelled trains(not running from source to destination) of IRCTC and get notified if your train gets cancelled, also check cancelled trains history.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'trains cancelled, train cancellations today,trains cancelled today' });
  
  }

 ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
       this.search.date=params['id'];
       });
    this.getTrains();
  }

getTrains(){
  
    var url = this.apiUrl+'/api/getCancelledTrains';
     //var url = 'http://localhost:4000/api/getCancelledTrains';
     this.service.getTrainsList(url,this.search).subscribe(data => {
          if(data.response_code==200){  
               this.dataSource = [];
               this.dataSource = data.trains;
               this.total = data.total;
              console.log(data);
              this.titleService.setTitle(this.search.date+' Cancelled Trains');
          }
        })
  }

}
