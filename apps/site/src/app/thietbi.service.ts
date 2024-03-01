import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private APIURL = environment.APIURL;
  private _thietbi: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _thietbis: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get thietbis$(): Observable<any[]> {
    return this._thietbis.asObservable();
  }
  get thietbi$(): Observable<any> {
    return this._thietbi.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/test_thietbi/id`).pipe(
      tap((response: any) => {
        this._thietbi.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/test_thietbi`).pipe(
      tap((response: any[]) => {
        this._thietbis.next(response);
      })
    );
  }
  async getDrive() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1RyWwzXmkr9grKRMGJJ_WSaHJpB5o6ysrFNY04xVv6QY/values/Thietbi?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();  
    console.log(data);
    
          //this._sanphams.next(data)                 
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  createPage(dulieu: any): Observable<any> {
    return this.thietbis$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/test_thietbi`, dulieu).pipe(
        map((res: any) => {
          this._thietbis.next([res, ...datas]);
          console.log(res);
          return res;
        })
      ))
    );
  }
  updatePage(dulieu: any): Observable<any> {
    return this.thietbis$.pipe(
      take(1),
      switchMap((thietbis: any) =>
        this._httpClient.patch(`${this.APIURL}/test_thietbi/${dulieu.id}`, dulieu).pipe(
          map((thietbi: any) => {
            const index = thietbis.findIndex((item: any) => item.id === thietbi.id);
            thietbis[index] = thietbi;
            this._thietbis.next(thietbis);
            return thietbi;
          })
        )
      ))
  }
  deletePage(dulieu: any) {
    return this.thietbis$.pipe(
      take(1),
      switchMap((thietbis: any) =>
        this._httpClient.delete(`${this.APIURL}/test_thietbi/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = thietbis.filter((e: any) => e.id != dulieu.id);
            this._thietbis.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
