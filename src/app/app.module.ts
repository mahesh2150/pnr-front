import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatAutocompleteModule, MatChipsModule, MatButtonToggleModule, MatListModule,MatSelectModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { PnrCheckComponent } from './pnr-check/pnr-check.component';
import {CommonService} from './common.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LiveStatusComponent } from './live-status/live-status.component';
import { GetlivestatusComponent } from './getlivestatus/getlivestatus.component';
import { TrainRouteComponent } from './train-route/train-route.component';
import { GettrainrouteComponent } from './gettrainroute/gettrainroute.component';
import { SeatAvailabilityComponent } from './seat-availability/seat-availability.component';
import { GetseatavailabilityComponent } from './getseatavailability/getseatavailability.component';
import { TrainBetweenStationsComponent } from './train-between-stations/train-between-stations.component';
import { GettrainbetweenstationsComponent } from './gettrainbetweenstations/gettrainbetweenstations.component';
import { LiveStationComponent } from './live-station/live-station.component';
import { GetlivestationComponent } from './getlivestation/getlivestation.component';
import { CancelledTrainsComponent } from './cancelled-trains/cancelled-trains.component';
import { GetcancelledtrainsComponent } from './getcancelledtrains/getcancelledtrains.component';
import { RescheduledTrainsComponent } from './rescheduled-trains/rescheduled-trains.component';
import { GetrescheduledtrainsComponent } from './getrescheduledtrains/getrescheduledtrains.component';
import { RightColumnComponent } from './right-column/right-column.component';
import { TrainFareComponent } from './train-fare/train-fare.component';
import { GettrainfareComponent } from './gettrainfare/gettrainfare.component';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './footer/footer.component';
import { Footer1Component } from './footer1/footer1.component';
import { GoogleAdTopBannerComponent } from './google.ad.top-banner/google.ad.top-banner.component';
import { GoogleAd300600Component } from './google-ad-300-600/google-ad-300-600.component';
import { GoogleAd300250Component } from './google-ad-300-250/google-ad-300-250.component';
import { GoogleAd72890Component } from './google-ad-728-90/google-ad-728-90.component';
import { MainNavComponent } from './main-nav/main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    PnrCheckComponent,
    HomeComponent,
    HeaderComponent,
    LiveStatusComponent,
    GetlivestatusComponent,
    TrainRouteComponent,
    GettrainrouteComponent,
    SeatAvailabilityComponent,
    GetseatavailabilityComponent,
    TrainBetweenStationsComponent,
    GettrainbetweenstationsComponent,
    LiveStationComponent,
    GetlivestationComponent,
    CancelledTrainsComponent,
    GetcancelledtrainsComponent,
    RescheduledTrainsComponent,
    GetrescheduledtrainsComponent,
    RightColumnComponent,
    TrainFareComponent,
    GettrainfareComponent,
    TestComponent,
    FooterComponent,
    Footer1Component,
    GoogleAdTopBannerComponent,
    GoogleAd300600Component,
    GoogleAd300250Component,
    GoogleAd72890Component,
    MainNavComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'pnr-enquiry-online-indian-railway' }),
    HttpModule,
    FormsModule,BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    RouterModule.forRoot([
    // {path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: "", component: HomeComponent },
     { path: "home", component: HomeComponent },
     { path: "check-pnr-status-online", component: PnrCheckComponent },
     { path: "train-live-running-status", component: LiveStatusComponent },
     { path: "train-live-running-status/:id", component: GetlivestatusComponent },
     { path: "indian-train-routes", component: TrainRouteComponent },
     { path: "indian-train-routes/:id", component: GettrainrouteComponent },
     { path: "train-seat-availability", component: SeatAvailabilityComponent },
     //{ path: "train-seat-availability/:id/:id1/:id2/:id3/:id4/:id5", component: GetseatavailabilityComponent },
     { path: "train-seat-availability/:id", component: GetseatavailabilityComponent },
     { path: "running-trains-between-stations", component: TrainBetweenStationsComponent },
     { path: "running-trains-between-stations/:id/:id1", component: GettrainbetweenstationsComponent },
     { path: "live-station", component: LiveStationComponent },
     { path: "live-station/:id/:id1", component: GetlivestationComponent },
     { path: "check-cancelled-trains", component: CancelledTrainsComponent },
     { path: "check-cancelled-trains/:id", component: GetcancelledtrainsComponent },
     { path: "check-rescheduled-trains", component: RescheduledTrainsComponent },
     { path: "check-rescheduled-trains/:id", component: GetrescheduledtrainsComponent },
     { path: "train-fare-enquiry", component: TrainFareComponent },
     { path: "train-fare-enquiry/:id/:id1/:id2/:id3/:id4/:id5/:id6", component: GettrainfareComponent },
     //{ path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
    ])
  ],
  providers: [CommonService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
