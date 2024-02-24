import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrcodeService } from '../thietbi.service';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { TrangchuComponent } from '../trangchu/trangchu.component';
import { LichsuService } from '../lichsu.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  CUser: any = {}
  Ketqua: any = { Tieude: '' };
  Detail: any = {}
  IsshowCam: boolean = false;
  displayedColumns: string[] = ['hinhanh', 'Tieude', 'Mota', 'Ngaytao', 'qrcode'];
  dataSource!: MatTableDataSource<any>;
  Listdata: any[] = [];
  Lichsudata: any[] = [];
  public showWebcam = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('canvas') canvas!: ElementRef;
  public webcamImage: WebcamImage | undefined;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private _QrcodeService: QrcodeService,
    private _LichsuService: LichsuService,
    private _UsersService: UsersService,
    private _NotifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this._LichsuService.getAll().subscribe(data => this.Lichsudata = data)
    this._UsersService.getProfile().subscribe(data => this.CUser = data)
    this._QrcodeService.getAll().subscribe()
    this._QrcodeService.thietbis$.subscribe((data) => {
      this.Listdata = data
      console.log(this.Listdata);

      this.dataSource = new MatTableDataSource(data);
    })
  }
  ngOnInit(): void {
  }
  isActive(route: string): boolean {
    return this.router.url === route;
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
  onScanSuccess(data: string) {
    const result = this.Listdata.find(v => v.id == data)
    const result1 = this.Lichsudata.filter(v => v.idTB == data && v.idUser == this.CUser.id)
    if(result)
    {
      console.log(result);
      
      if(result.Tinhtrang==0)
      {
          let dulieu: any = {};
          dulieu.idTao = dulieu.idUser = this.CUser.id
          dulieu.idTB = result.id
          dulieu.Type = result.Tinhtrang = !result.Tinhtrang
          this._QrcodeService.updatePage(result).subscribe();
          this._LichsuService.createPage(dulieu).subscribe((data) => {
            this.router.navigateByUrl('/lichsu');
          })
          this.stopScanner()
      }
      else {
        if (result1 == undefined) {
          this._NotifierService.notify('error', 'Thiết bị đã được sử dụng bởi nhân viên khác')
        }
      }
    }
    else{
      this._NotifierService.notify('error', 'Thiết bị không tồn tại trong hệ thống')
    }
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
  CreateThietbi(data: any) {
    this._QrcodeService.createPage(data).subscribe()
  }
  Today() {
    return new Date();
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    this.Detail.Hinhanh = webcamImage.imageAsDataUrl
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}

