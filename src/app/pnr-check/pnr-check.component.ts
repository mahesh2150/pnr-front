import { Component, OnInit,Input } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute} from "@angular/router";
import * as $ from "jquery";
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pnr-check',
  templateUrl: './pnr-check.component.html',
  styleUrls: ['./pnr-check.component.css']
})
export class PnrCheckComponent implements OnInit {
  private apiUrl= environment.apiUrl;
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
  constructor(private titleService: Title, private meta: Meta, private http: Http, private service: CommonService, private route: ActivatedRoute) {
    //this.meta.addTag({ name: 'title', content: 'Check Train PNR Status Live | PNR Enquiry & Prediction Indian Railways' });
    this.meta.addTag({ name: 'description', content: 'Check PNR status of your train ticket at RailwayEnquiry.net online. you can check current live PNR status of your ticket booked at IRCTC or Railway Counters. Our national train enquiry system NTES helps to get Indian Railways PNR status and prediction of waiting list tickets. PNR Enquiry.' });
    this.meta.addTag({ name: 'author', content: 'RailwayEnquiry.net' });
    this.meta.addTag({ name: 'keywords', content: 'PNR status, Check PNR,Indian Railways,PNR Enquiry,IRCTC PNR status,PNR status Live' });
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
     this.titleService.setTitle('Check Train PNR Status Live | PNR Enquiry & Prediction Indian Railways');
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
        var url = this.apiUrl+'/api/getPNR';
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
