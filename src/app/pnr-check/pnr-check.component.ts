import { Component, OnInit,Input } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute} from "@angular/router";
import * as $ from "jquery";


@Component({
  selector: 'app-pnr-check',
  templateUrl: './pnr-check.component.html',
  styleUrls: ['./pnr-check.component.css']
})
export class PnrCheckComponent implements OnInit {
  displayedColumns = ['trainNo','trainName','from','to'];
  displayedColumns1 = ['boarding_point','reserved_upto','doj','class'];
  pnrnumber={"pnr":""};
  // table = {
  //   "chart_prepared":"",
  //   "train": {}
  // };
  chart_prepared;
  passengers = [];
  dataSource =[] ;
  show_pnr_table: boolean;
  show_message_Flushed_PNR: boolean;
  show_message_No_Data_Available:boolean;
  show_pnr_required: boolean;
  show_spinner:boolean;
  show_message_try_again:boolean;
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute) {
    this.show_pnr_table = false;
    this.show_pnr_required = false;
    this.show_message_Flushed_PNR = false;
    this.show_message_No_Data_Available = false;
    this.show_spinner=false;
    this.route.queryParams.subscribe(params => {
            this.pnrnumber.pnr = params["pnrnumber"];
            if(this.pnrnumber.pnr){
                this.getPNR();
            }           
        });
  }

  ngOnInit() {
  }

getPNR(){
  this.show_pnr_required = false;
  this.show_message_No_Data_Available = false;
  this.show_message_Flushed_PNR = false;
  this.show_pnr_table = false;
  this.show_message_try_again =false;
  if(this.pnrnumber.pnr){
    var regex=/^[0-9]+$/;
      if(  this.pnrnumber.pnr.length == 10 && this.pnrnumber.pnr.match(regex) ){

       this.checkPNR();
        return false;
      }

  }
}
checkPNR() {
        this.show_spinner=true;
        var url = '/api/getPNR';
        //var url = 'http://localhost:4000/api/getPNR';

      // "http://api.erail.in/pnr?key=j6nyo09njd&pnr=4857412584";
      this.service.getPnr(url,this.pnrnumber).subscribe(data => {
          console.log(data);
          if(data.response_code==200){
              //this.table = data;
              this.dataSource = []; // empty it before pushing data into it...
              this.dataSource.push(data);
              console.log(this.dataSource[0].pnr);
              this.passengers = data.passengers;
              this.show_message_Flushed_PNR = false;
              this.show_message_No_Data_Available = false;
              this.show_pnr_table = true;
              if(data.chart_prepared==true){
                this.chart_prepared="YES";
              }
              else{
                this.chart_prepared="NO";
              }
          }
          if(data.response_code ==220){
              this.show_message_Flushed_PNR = true;
              this.show_pnr_table = false;
              this.show_message_No_Data_Available = false;
              this.show_message_try_again = false;
          }
          if(data.response_code ==221){
              this.show_message_Flushed_PNR = false;
              this.show_pnr_table = false;
              this.show_message_No_Data_Available = false;
              this.show_message_try_again = false;
              console.log("Invalid PNR");
          }
          if(data.response_code == 404 || data.response_code == 502){
              this.show_message_No_Data_Available = true;
              this.show_message_Flushed_PNR = false;
              this.show_pnr_table = false;
              this.show_message_try_again = false;
          }
          if(data.response_code == 405){
              this.show_message_try_again = true;
              this.show_message_No_Data_Available = false;
              this.show_message_Flushed_PNR = false;
              this.show_pnr_table = false;
          }
        this.show_spinner=false;  
      })
    // console.log(this.dataSource);
  }
}



//  $(document).ready(function () {          

//             setTimeout(function() {
//                 $('.autohide').slideUp("slow");
//             }, 3000);
// });
