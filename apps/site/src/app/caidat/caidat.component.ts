import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-caidat',
  templateUrl: './caidat.component.html',
  styleUrls: ['./caidat.component.css']
})
export class CaidatComponent implements OnInit {
  User:any={}
  displayedColumns: string[] = ['Hoten', 'email', 'SDT'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _UsersService:UsersService,
    private _NotifierService:NotifierService
  ) {
    this._UsersService.getUsers().subscribe(data=>
      {
        this.dataSource = new MatTableDataSource(data);
      })
   }

  ngOnInit() {

  }
  Dangky(User:any)
  {
    this._UsersService.Dangky(User).subscribe((data)=>this._NotifierService.notify('success','Thêm Thành Công'));
  }
  Update(User:any)
  {
    this._UsersService.updateUser(User).subscribe((data)=>this._NotifierService.notify('success','Thêm Thành Công'));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
