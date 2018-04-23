import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   pnrnumber={"pnr":""};
  constructor(private router:Router) { }

  ngOnInit() {
  }

  getPNR(){
  if(this.pnrnumber.pnr){
    var regex=/^[0-9]+$/;
      if(  this.pnrnumber.pnr.length == 10 && this.pnrnumber.pnr.match(regex) ){

       this.check();
        return false;
      }

  }
}

check(){
   let navigationExtras: NavigationExtras = {
            queryParams: {
                "pnrnumber": this.pnrnumber.pnr
               }
        };
  this.router.navigate(['/pnr'],navigationExtras);
}
}
