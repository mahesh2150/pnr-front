import { Component, OnInit,Input } from '@angular/core';
import { CommonService } from '../common.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment"

@Component({
  selector: 'app-pnr-check',
  templateUrl: './pnr-check.component.html',
  styleUrls: ['./pnr-check.component.css']
})
export class PnrCheckComponent implements OnInit {
  pnrNumber={"pnr":""};
  table = {
    "chart_prepared":"",
    "train": {}
  };
  passengers = [];
  show_pnr_table: boolean;
  show_message: boolean;
  constructor(private http: Http, private service: CommonService, private route: ActivatedRoute) {
    this.show_pnr_table = false;
    this.show_message = false;

    this.route.queryParams.subscribe(params => {
            this.pnrNumber.pnr = params["pnrNumber"];
            this.check();
        });
  }

  ngOnInit() {
  }

  check() {
      console.log(this.pnrNumber.pnr);
    if(this.pnrNumber.pnr){
        var url = `${environment.apiUrl}/api/getPNR`;

      // "http://api.erail.in/pnr?key=j6nyo09njd&pnr=4857412584";
      this.service.getPnr(url,this.pnrNumber).subscribe(data => {
          console.log(data);
          if(data.response_code==200){
              this.table = data;
              this.passengers = data.passengers;
              this.show_message = false;
              this.show_pnr_table = true;
              if(data.chart_prepared==true){
                this.table.chart_prepared="YES";
              }
              else{
                this.table.chart_prepared="NO";
              }
          }
          if(data.response_code ==220){
              this.show_message = true;
              this.show_pnr_table = false;
          }
          if(data.response_code ==221){
              this.show_message = false;
              this.show_pnr_table = false;
              console.log("Invalid PNR");
          }
      })
      
    }
  }
}
