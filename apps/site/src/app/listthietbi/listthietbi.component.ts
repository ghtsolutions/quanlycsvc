import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QrcodeService } from '../thietbi.service';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { LichsuService } from '../lichsu.service';
@Component({
  selector: 'app-listthietbi',
  templateUrl: './listthietbi.component.html',
  styleUrls: ['./listthietbi.component.css']
})
export class ListthietbiComponent implements OnInit {
  Ketqua:any={Tieude:''};
  Detail:any={
    HSDGio:0,
    HSDNgay:0,
    HSDThang:0,
    HSDNam:0,
  }
  DVT:any=[
    {id:1,Tieude:'Giờ'},
    {id:2,Tieude:'Ngày'},
    {id:3,Tieude:'Tháng'},
    {id:4,Tieude:'Năm'}
  ]
  IsshowCam:boolean=false;
  displayedColumns: string[] = ['qrcode','hinhanh', 'Tieude', 'Mota','Tinhtrang','HSD','NgayHSD','Ngaytao','Action'];
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
    private _LichsuService:LichsuService,
    private dialog:MatDialog,
  ) {
    this._QrcodeService.getAll().subscribe()
    this._QrcodeService.thietbis$.subscribe((data)=>
    {
      if(data)
      {  
      this.Listdata = data
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    })
  }
  ngOnInit(): void {
  }
  text = 'Hello, QR Code!';
  elementType = 'url'; // Other possible values: 'canvas', 'img', 'url'
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent = new ZXingScannerComponent;
  selectedDevice: MediaDeviceInfo | undefined;
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
    this._QrcodeService.createPage(data).subscribe(()=>
    {
      this._QrcodeService.thietbis$.subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
    })
  }
  async UpdateThietbi(data:any)
  {
   const result = await this.getHSD(data);
   data.NgayHSD = result
   console.log(data.NgayHSD);
   
    this._QrcodeService.updatePage(data).subscribe(()=>
    {
      this._QrcodeService.thietbis$.subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
    })
  }
  async getHSD(data:any) {
    var cDate = new Date(data.Ngaytao);
    cDate.setFullYear(cDate.getFullYear() + data.HSDNam);
    cDate.setMonth(cDate.getMonth() + data.HSDThang);
    cDate.setDate(cDate.getDate() + data.HSDNgay);
    cDate.setHours(cDate.getHours() + data.HSDGio);
    const result = new Date(cDate);
    return result
  }
  DeleteThietbi(data:any)
  {

    this._QrcodeService.deletePage(data).subscribe(()=>
    {
      this._QrcodeService.thietbis$.subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
    })

  }
  Today(){return new Date();}

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
  
  GetPercent(begin:any,end:any)
  { 
    let Thoigian:number=100;
    let now = new Date();
    let startDate = new Date(begin);
    let endDate = new Date(end);
    const timeDiff1 = Math.abs(endDate.getTime() - startDate.getTime());
    const hoursDiff1 = Math.ceil(timeDiff1 / (1000 * 3600));
    const timeDiff2 = Math.abs(endDate.getTime() - now.getTime());
    const hoursDiff2 = Math.ceil(timeDiff2 / (1000 * 3600));
    if(hoursDiff1-hoursDiff2>0)
    {
      Thoigian = Number(((1-((hoursDiff1-hoursDiff2)/hoursDiff1))*100).toFixed(2))
    }
    if (Thoigian >= 80) {
      return { time: Thoigian, color: 'warn' };
    } else if (Thoigian > 50) {
      return { time: Thoigian, color: 'accent' };
    } else {
      return { time: Thoigian, color: 'primary' };
    }
    

  }
}
