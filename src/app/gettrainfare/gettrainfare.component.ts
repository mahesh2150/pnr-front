import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-gettrainfare',
  templateUrl: './gettrainfare.component.html',
  styleUrls: ['./gettrainfare.component.css']
})
export class GettrainfareComponent implements OnInit {
  private apiUrl= environment.apiUrl;
displayedColumns = ['train_number','train_name','fare','src','dst','quota'];
displayedColumns1 = ['date','availability'];
dataSource =[] ;
dataSource1 =[] ;
search={
  "trainNumber":"",
  "srcCode":"",
  "dstCode":"",
  "classCode":"",
  "quota":"",
  "date":"",
  "age":""
};
trainsList=[];
classes_array;
days_array;
id;
show_enter_valid_trainNumber:boolean;
private sub: any;
subscription;
statusResult={
  "train":{
    "classes":{
      "available":""
    }
  }
};

  constructor(private meta: Meta,private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router) {
    this.show_enter_valid_trainNumber = false;
     this.meta.addTag({ name: 'description', content: 'Get fares of all trains in India, Check Train fare enquiry between two stations on mobile or PC without login. Also Get specific train fare enquiry of Indian Railway. How to calculate? Enter valid train number , select source and destination station, Reservation class, enter age, select quota.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Train Fare Enquiry, Fare calculator,IRCTC Indian Railways Fare,train fare prices.' });
 
   }

  ngOnInit() {
       this.sub = this.route.params.subscribe(
      params => {
       this.search.trainNumber=params['id'];
       this.search.srcCode=params['id1'];
       this.search.dstCode=params['id2'];
       this.search.classCode=params['id3'];
       this.search.quota=params['id4'];
       this.search.date=params['id5'];
       this.search.age=params['id6'];
       });
    this.getSeatAvailability();
  }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
  // getTrainRoute(){
  //   if(this.id==this.search.trainNumber){
  //     this.getStatus();
  //   }
  //   this.router.navigate(['/seat-availability',this.search.trainNumber]);
    
  // }

  getSeatAvailability(){   
    // this.show_spinner=true;  
    // this.show_table=false;      
    // this.show_message_try_again = false;
    // this.show_enter_valid_trainNumber=false;
    // this.show_train_details=false;  
    // this.show_classes=false;
    if(this.search.trainNumber){
      var regex=/^[0-9]+$/;
      if(this.search.trainNumber.match(regex) &&  this.search.trainNumber.length==5){
          //var url = 'http://localhost:4000/api/getTrainFare';
          var url = this.apiUrl+'/api/getTrainFare';  
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          console.log(data);          
          if(data.response_code==200){
             //this.dataSource = []; // empty it before pushing data into it...
            this.dataSource = []; // empty it before pushing data into it...
            this.dataSource.push(data);
            this.titleService.setTitle(this.search.srcCode+' '+this.search.dstCode+' '+ data.train.number+' '+ data.train.name+' '+ this.search.quota+' Fare Calculator');
            this.meta.updateTag({ name: 'keywords', content: this.search.srcCode+' to '+this.search.dstCode+' fare, Indian Railways fare breakup,Indian Rail Fare Calculator,Fare Enquiry, '+data.train.name+' Fare' },`name='keywords'`);
          }
        })
      }
      else{
        this.show_enter_valid_trainNumber=true;
      }
    } 
  }

  getTrains(i) {
      if(this.subscription){
        this.subscription.unsubscribe();
      }

      this.trainsList= [];
      console.log(i);
      if (i.length >= 3) {
        //var url = 'http://localhost:4000/api/getTrainsList';
        var url = this.apiUrl+'/api/getTrainsList';
        //var url = "https://api.railwayapi.com/v2/suggest-train/train/" + i + "/apikey/8n6hg4r3ga/";
        console.log(url);
        this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
          console.log(data);
          this.trainsList = data.trains;
        })
      }

      
  }
 
}
