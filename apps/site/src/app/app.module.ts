import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HosoComponent } from './hoso/hoso.component';
import { HocvanComponent } from './hocvan/hocvan.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { MainComponent } from './main/main.component';
import { BlogComponent } from './blog/blog.component';
import { QuetqrcodeComponent } from './quetqrcode/quetqrcode.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import { ListthietbiComponent } from './listthietbi/listthietbi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { AdminGuard } from './admin/auth/guards/admin.guard';
import { AuthService } from './admin/auth/auth.service';
import { UsersInterceptor } from './shared/users.interceptor';
import { NotifierModule } from 'angular-notifier';
import { DangnhapComponent } from './admin/dangnhap/dangnhap.component';
import { GuestGuard } from './admin/auth/guards/guest.guard';
import { AuthModule } from './admin/auth/auth.module';
import { AuthGuard } from './admin/auth/guards/auth.guard';
import { CaidatComponent } from './caidat/caidat.component';
import { LichsuComponent } from './admin/lichsu/lichsu.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
@NgModule({
  declarations: [	
    AppComponent,
    NxWelcomeComponent,
    HosoComponent,
    HocvanComponent,
    SanphamComponent,
    MainComponent,
    BlogComponent,
    QuetqrcodeComponent,
    ListthietbiComponent,
    DangnhapComponent,
    LichsuComponent,
    CaidatComponent,
    TrangchuComponent
   ],
  imports: [
    ZXingScannerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    WebcamModule,
    AuthModule,
    RouterModule.forRoot([
      // { path: '', pathMatch: 'full', redirectTo: 'quetqr' },
      {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: MainComponent,
        children:[
          // {
          //   path: '',
          //   component: TrangchuComponent
          // },
          {
            path: 'thietbi',
            component: ListthietbiComponent
          },
          {
            path: 'caidat',
            component: CaidatComponent
          },
          {
            path: 'lichsu',
            component: LichsuComponent
          },
        ]
      },
      // {
      //   path: '', 
      //   canActivate: [AdminGuard],
      //   component: QuetqrcodeComponent,
      //   // children:[
      //   //   { path: 'quetqr', component:QuetqrcodeComponent },
      //   //   { path: 'ho-so', component:HosoComponent },
      //   //   { path: 'hoc-van', component: HocvanComponent },
      //   //   { path: 'san-pham', component: SanphamComponent },
      //   //   { path: 'blog', component: BlogComponent },
      //   // ] 
      // },
      {
        path: 'dangnhap',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangnhapComponent,
      },

    ]),
    NotifierModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
        },
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    }),
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
