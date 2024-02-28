import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Dangonline:any=(Math.random()*100).toFixed()
  Homnay:any=(Math.random()*2000).toFixed()
  Homqua:any=(Math.random()*3000).toFixed()
  Tongcong:any=Number(this.Dangonline)+Number(this.Homnay)+Number(this.Homqua)
  constructor() { }

  ngOnInit() {
  }

}
