import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LichsuService {
  private APIURL = environment.APIURL;
  private _lichsu: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _lichsus: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get lichsus$(): Observable<any[]> {
    return this._lichsus.asObservable();
  }
  get lichsu$(): Observable<any> {
    return this._lichsu.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/test_lichsu/id`).pipe(
      tap((response: any) => {
        this._lichsu.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/test_lichsu`).pipe(
      tap((response: any[]) => {
        this._lichsus.next(response);
      })
    );
  }
  createPage(dulieu: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/test_lichsu`, dulieu).pipe(
      map((res: any) => {
        this._lichsus.next(res);
        return res;
      }))
  }
  // createPage(dulieu: any): Observable<any> {
  //   return this.lichsus$.pipe(
  //     take(1),
  //     switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/test_lichsu`, dulieu).pipe(
  //       map((res: any) => {
  //         this._lichsus.next([res[1], ...datas]);
  //         return res[1];
  //       })
  //     ))
  //   );
  // }
  updatePage(dulieu: any): Observable<any> {
    return this.lichsus$.pipe(
      take(1),
      switchMap((lichsus: any) =>
        this._httpClient.patch(`${this.APIURL}/test_lichsu/${dulieu.id}`, dulieu).pipe(
          map((lichsu: any) => {
            const index = lichsus.findIndex((item: any) => item.id === lichsu.id);
            lichsus[index] = lichsu;
            this._lichsus.next(lichsus);
            return lichsu;
          })
        )
      ))
  }
  deletePage(dulieu: any) {
    return this.lichsus$.pipe(
      take(1),
      switchMap((lichsus: any) =>
        this._httpClient.delete(`${this.APIURL}/test_lichsu/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = lichsus.filter((e: any) => e.id != dulieu.id);
            this._lichsus.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
