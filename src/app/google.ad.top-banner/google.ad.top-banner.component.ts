import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-top-banner',
  templateUrl: './google.ad.top-banner.component.html',
  styleUrls: ['./google.ad.top-banner.component.css']
})
export class GoogleAdTopBannerComponent implements AfterViewInit {

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
