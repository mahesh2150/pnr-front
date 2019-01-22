import { Component, OnInit , ChangeDetectorRef, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent  {

@ViewChild('sidenav') sidenav: MatSidenav;
  constructor(public router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
     iconRegistry.addSvgIcon(
        'menu_icon',
        sanitizer.bypassSecurityTrustResourceUrl('assets/menu_icon.svg'));
    iconRegistry.addSvgIcon(
      'down_arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/down_arrow.svg'));
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/facebook.png'));
  }



  reason = '';
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}

