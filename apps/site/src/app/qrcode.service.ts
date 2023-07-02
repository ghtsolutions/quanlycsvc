import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private APIURL = environment.APIURL;
  private _testapi: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _testapis: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get testapis$(): Observable<any[]> {
    return this._testapis.asObservable();
  }
  get testapi$(): Observable<any> {
    return this._testapi.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/testapi/id`).pipe(
      tap((response: any) => {
        this._testapi.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/testapi`).pipe(
      tap((response: any[]) => {
        this._testapis.next(response);
      })
    );
  }
  createPage(dulieu: any): Observable<any> {
    return this.testapis$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/testapi`, dulieu).pipe(
        map((res: any) => {
          this._testapis.next([res[1], ...datas]);
          return res[1];
        })
      ))
    );
  }
  updatePage(dulieu: any): Observable<any> {
    return this.testapis$.pipe(
      take(1),
      switchMap((testapis: any) =>
        this._httpClient.patch(`${this.APIURL}/testapi/${dulieu.id}`, dulieu).pipe(
          map((testapi: any) => {
            const index = testapis.findIndex((item: any) => item.id === testapi.id);
            testapis[index] = testapi;
            this._testapis.next(testapis);
            return testapi;
          })
        )
      ))
  }
  deletePage(dulieu: any) {
    return this.testapis$.pipe(
      take(1),
      switchMap((testapis: any) =>
        this._httpClient.delete(`${this.APIURL}/testapi/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = testapis.filter((e: any) => e.id != dulieu.id);
            this._testapis.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
