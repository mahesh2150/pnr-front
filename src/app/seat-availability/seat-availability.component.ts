import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-seat-availability',
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.css']
})
export class SeatAvailabilityComponent implements OnInit {
  private apiUrl= environment.apiUrl;
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
  constructor(private meta: Meta, private titleService: Title, private http: Http, private service: CommonService, private route: ActivatedRoute, private router:Router, private pipe: DatePipe) { 
    //this.meta.addTag({ name: 'title', content: 'Check Current Seat Availability in train | Indian Railways Berth Info' });
    this.titleService.setTitle('Check IRCTC Current Seat Availability in trains | Indian Railways');
    this.meta.addTag({ name: 'description', content: 'Check IRCTC current seat availability information of trains with single click of a mouse at Railway Enquiry. Select source and destination, our ntes gives you all the information about seat availability for selected reservation classes of all trains.Visit us today for train seat availability enquiry.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'Seat Availability,indian railway seat availability, train enquiry, irctc availability, railway reservation,train seat availability' });
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(
    //   params => {
    //    this.search.trainNumber=params['id'];
    //    });
    //   if(this.search.trainNumber){
    //   this.getSourceStationCodes(this.search.trainNumber);
    //   }
  }

//   getDate1(){
//     var res;
//     return res = this.pipe.transform(this.myDate, 'dd-MM-yyyy');
//   }
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
        
//       }
//       else{
//         this.show_enter_valid_trainNumber=true;
//       }
      
//     console.log(this.search.trainNumber);
    
//   }
//   getSourceStationCodes(i){
//     this.sourceStationsList=[]; // empty it before pushing data into it...
//     var regex=/^[0-9]+$/;
//     if(this.search.trainNumber.length == 5 && this.search.trainNumber.match(regex) ){
//          var url = this.apiUrl+'/api/getTrainRoute';
//          // var url = '/api/getTrainRoute';          
//         console.log(url);
//         this.subscription =this.service.getTrainsList(url,this.search).subscribe(data => {
//           if(data.response_code==200){
//             console.log(data);
//             this.sourceStationsList=data.route;
//             this.classes=data.train.classes;
//             console.log(this.sourceStationsList);
//             console.log(this.classes);
//          }
         
//           if(data.response_code == 404 || data.response_code == 405 || data.response_code == 502){
//               //this.show_message_try_again = true;
//           }
//           //this.show_spinner=false;
//         })
//     }
// }
//   setDestCodes(){
//     var ind = this.getIndexBySourceCode();
//     for(var i = ind+1,j=0; i < this.sourceStationsList.length; i++,j++){
//       this.destinationStationsList[j] = this.sourceStationsList[i];
//     }
//     console.log(this.destinationStationsList);
//   }
//   getIndexBySourceCode() {
//           for (var i = 0; i < this.sourceStationsList.length; i++) {
//           if (this.sourceStationsList[i].station.code == this.search.srcCode) {
//           return i;
//           }
//           }
//           return null;
//   }

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

