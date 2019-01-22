import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-ad-300-250',
  templateUrl: './google-ad-300-250.component.html',
  styleUrls: ['./google-ad-300-250.component.css']
})
export class GoogleAd300250Component implements AfterViewInit {

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
