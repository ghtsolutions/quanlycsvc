import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrcodeService } from '../thietbi.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {
  CUser:any={}
  IsshowCam:boolean=false
  Ketqua:any={Tieude:''};
  Detail:any={}
  Listdata:any[]=[];
  constructor(
    private _QrcodeService:QrcodeService,
    private _UsersService:UsersService,
    private dialog:MatDialog,
  ) {
    this._UsersService.getProfile().subscribe(data=>this.CUser = data)
    this._QrcodeService.getAll().subscribe()
    this._QrcodeService.thietbis$.subscribe((data)=>
    {
      this.Listdata = data
    })
  }

  ngOnInit() {
  }
  scanner: ZXingScannerComponent = new ZXingScannerComponent;
  selectedDevice: MediaDeviceInfo | undefined;
  stopScanner() {
    this.IsshowCam = false
    if (this.scanner) {
      this.scanner.scanStop();
    }
  }
  startScanner() {
    this.IsshowCam = true
    if (this.scanner) {
      this.scanner.scanStart();
    }
  }
  onScanSuccess(result: string) {
    this.Ketqua = this.Listdata.find(v=>v.id==result)
    this.stopScanner()
  }
  Today()
  {
    return new Date();
  }
}
