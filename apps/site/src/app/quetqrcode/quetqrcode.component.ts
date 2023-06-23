import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrcodeService } from '../qrcode.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-quetqrcode',
  templateUrl: './quetqrcode.component.html',
  styleUrls: ['./quetqrcode.component.css']
})
export class QuetqrcodeComponent implements AfterViewInit{
  Ketqua:any={Tieude:''};
  Detail:any={}
  IsshowCam:boolean=true;
  displayedColumns: string[] = ['qrcode', 'Tieude', 'Mota', 'Ngaytao'];
  dataSource!: MatTableDataSource<any>;
  Listdata:any[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _QrcodeService:QrcodeService,
    private dialog:MatDialog,
  ) {
    this._QrcodeService.getAll().subscribe()
    this._QrcodeService.testapis$.subscribe((data)=>
    {
      this.Listdata = data
      this.dataSource = new MatTableDataSource(data);
    })
  }
  text = 'Hello, QR Code!';
  elementType = 'url'; // Other possible values: 'canvas', 'img', 'url'
  @ViewChild('scanner', { static: false })
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
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
  }
  CreateThietbi(data:any)
  {
    this._QrcodeService.createPage(data).subscribe()
  }
  Today()
  {
    return new Date();
  }
}

