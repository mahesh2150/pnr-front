import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private meta: Meta) {
    console.log(this.meta)
    this.meta.addTag({ name: 'description', content: 'How to use Angular 4 meta service' });
    this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
  }
  ngOnInit() {
    console.log(this.meta)
  }

}
