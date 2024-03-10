import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../shared/users.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-taikhoan-site',
  standalone:true,
  imports:[
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './taikhoan-site.component.html',
  styleUrls: ['./taikhoan-site.component.css']
})
export class TaikhoanSiteComponent implements OnInit {
  User:any={}
  constructor(
    private _UsersService:UsersService,
    private _NotifierService:NotifierService
    ) {    
      _UsersService.getProfile().subscribe()
    }

  ngOnInit() {
    this._UsersService.profile$.subscribe((data)=>{
      if(data){this.User = data}
    })
  }
  Update(User:any)
  {
    this._UsersService.updateOneUser(User).subscribe(()=>this._NotifierService.notify('success','Cập Nhật Thành Công'));
  }

}
