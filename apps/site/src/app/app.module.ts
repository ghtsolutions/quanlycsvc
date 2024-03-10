import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TaikhoanSiteComponent } from './taikhoan/taikhoan-site/taikhoan-site.component';
@NgModule({
  declarations: [			
    AppComponent,
    MainComponent,
    QuetqrcodeComponent,
    ListthietbiComponent,
    DangnhapComponent,
    LichsuComponent,
    CaidatComponent,
    TrangchuComponent,
    HeaderComponent,
    FooterComponent
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
          {
            path: 'taikhoan',
            component: TaikhoanSiteComponent
          },
        ]
      },
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
