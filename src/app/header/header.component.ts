import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
//import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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


   ngOnInit() {
   }


}
