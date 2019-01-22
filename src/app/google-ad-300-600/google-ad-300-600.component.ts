import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-ad-300-600',
  templateUrl: './google-ad-300-600.component.html',
  styleUrls: ['./google-ad-300-600.component.css']
})
export class GoogleAd300600Component implements AfterViewInit {

  constructor() { }

   ngAfterViewInit() {
    setTimeout(()=>{
          try{
            (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
          }catch(e){
            console.error("error");
          }
        },2000);
  }

}

