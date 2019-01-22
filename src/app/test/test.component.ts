import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
trains;
list=[];
constructor(private service: CommonService) { 

  this.service.getUrlsFromAssets().subscribe(data => {
        //console.log(data);
          this.trains=data.urls;
          this.getCodes();
    })
}
  ngOnInit() {
  }


  getCodes(){
        const regex = /\b([A-Z]+)\b/g;
        const list=['https://www.trainman.in/trains/Panipat-Jn-PNP/Samastipur-Jn-SPJ','https://www.trainman.in/trains/Panipat-Jn-PNP/Durgapur-DGR'];
        const str = `https://www.trainman.in/trains/Panipat-Jn-PNP/Samastipur-Jn-SPJ`;
        for (let entry of this.trains){
        const result = entry.match(regex);
        this.list.push('https://railwayenquiry.net/running-trains-between-stations/'+result[0] +'/'+result[1]);
        //this.list.push(entry);
        //console.log(this.list);
        //console.log('Substitution result: ', this.result[0]+'/'+this.result[1]);
        }
  }
}
