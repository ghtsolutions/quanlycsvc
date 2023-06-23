import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
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
    ListthietbiComponent
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
    RouterModule.forRoot([
      // { path: '', pathMatch: 'full', redirectTo: 'quetqr' },
      {
        path: '', component: QuetqrcodeComponent,
        // children:[
        //   { path: 'quetqr', component:QuetqrcodeComponent },
        //   { path: 'ho-so', component:HosoComponent },
        //   { path: 'hoc-van', component: HocvanComponent },
        //   { path: 'san-pham', component: SanphamComponent },
        //   { path: 'blog', component: BlogComponent },
        // ] 
      },

    ])
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
