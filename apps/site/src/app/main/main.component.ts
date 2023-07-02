import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrcodeService } from '../qrcode.service';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { TrangchuComponent } from '../trangchu/trangchu.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  CUser:any={}
  Ketqua:any={Tieude:''};
  Detail:any={}
  IsshowCam:boolean=false;
  displayedColumns: string[] = ['hinhanh', 'Tieude', 'Mota', 'Ngaytao','qrcode'];
  dataSource!: MatTableDataSource<any>;
  Listdata:any[]=[];
  public showWebcam = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('canvas') canvas!: ElementRef;
  public webcamImage: WebcamImage | undefined;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private _QrcodeService:QrcodeService,
    private _UsersService:UsersService,
    private dialog:MatDialog,
    private router: Router,
  ) {
    this._UsersService.getProfile().subscribe(data=>this.CUser = data)
    this._QrcodeService.getAll().subscribe()
    this._QrcodeService.testapis$.subscribe((data)=>
    {
      this.Listdata = data
      this.dataSource = new MatTableDataSource(data);
      console.log(data); 
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

