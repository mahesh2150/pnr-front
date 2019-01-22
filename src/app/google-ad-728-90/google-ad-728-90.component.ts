import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-ad-728-90',
  templateUrl: './google-ad-728-90.component.html',
  styleUrls: ['./google-ad-728-90.component.css']
})
export class GoogleAd72890Component implements AfterViewInit {

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
