import { Component, OnInit } from '@angular/core';
import { LichsuService } from '../../lichsu.service';
import { UsersService } from '../../shared/users.service';
import { QrcodeService } from '../../thietbi.service';

@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.component.html',
  styleUrls: ['./lichsu.component.css']
})
export class LichsuComponent implements OnInit {
    ListData:any[]=[]
    FilterListData:any[]=[]
  constructor(
    private _QrcodeService:QrcodeService,
    private _LichsuService:LichsuService,
    private _UsersService:UsersService,
  ) { }

  ngOnInit() {
    this._UsersService.getUsers().subscribe((users)=>{
    this._QrcodeService.getAll().subscribe(thietbi=>
      {
        this._LichsuService.getAll().subscribe(lichsu=>
          {
            lichsu.forEach(v=>{
              v.Thietbi = thietbi.find(v1=>v1.id==v.idTB)?thietbi.find(v1=>v1.id==v.idTB):{Tieude:''}
              v.User = users.find(v2=>v2.id==v.idTao)
            })
            this.FilterListData =   this.ListData = lichsu
            console.log(this.ListData);
          })
      })
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    if (value.length > 2) {
      this.FilterListData = this.ListData.filter((v) => v.User.Hoten.toLowerCase().includes(value)||v.Thietbi.Tieude.toLowerCase().includes(value))
    }
    else
    {
      this.FilterListData = this.ListData
    }
  }
}
