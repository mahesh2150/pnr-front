import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  constructor(private http:Http) { }
getPnr(url,pnrNumber):Observable<any>{
      return this.http.post(url,pnrNumber).map(res=>res.json());
    }
getTrainsList(url,search):Observable<any>{
      return this.http.post(url,search).map(res=>res.json());
    }
getStationsList(url,search):Observable<any>{
    console.log(search);
      return this.http.post(url,search).map(res=>res.json());
    }
getTrainsFromAssets(){
  return this.http.get("./assets/trains.json")
                         .map((res:any) => res.json());
                         
  }
getStationsFromAssets(){
  return this.http.get("./assets/stations.json")
                         .map((res:any) => res.json());
                         
  }
                        getUrlsFromAssets(){
  return this.http.get("./assets/stations1.json")
                         .map((res:any) => res.json());
                         
  }
}
