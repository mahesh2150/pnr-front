import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 pnrNumber;
  constructor(private router:Router) { }

  ngOnInit() {
  }
check(){
   let navigationExtras: NavigationExtras = {
            queryParams: {
                "pnrNumber": this.pnrNumber
               }
        };
  this.router.navigate(['/pnr'],navigationExtras);
}
}
