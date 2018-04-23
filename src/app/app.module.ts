import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatAutocompleteModule, MatChipsModule, MatButtonToggleModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';


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
    GettrainbetweenstationsComponent
  ],
  imports: [
    BrowserModule,
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
    RouterModule.forRoot([
     {path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: "home", component: HomeComponent },
     { path: "pnr", component: PnrCheckComponent },
     { path: "live-status", component: LiveStatusComponent },
     { path: "live-status/:id", component: GetlivestatusComponent },
     { path: "train-schedule", component: TrainRouteComponent },
     { path: "train-schedule/:id", component: GettrainrouteComponent },
     { path: "seat-availability", component: SeatAvailabilityComponent },
     { path: "seat-availability/:id", component: GetseatavailabilityComponent }
    ])
  ],
  providers: [CommonService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
