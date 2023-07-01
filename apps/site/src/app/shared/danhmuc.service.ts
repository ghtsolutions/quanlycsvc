import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanhmucService {

  private urlApi = environment.APIURL;
  private _danhmucs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get danhmucs$(): Observable<any[] | null> {
    return this._danhmucs.asObservable();
  }
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get danhmuc$(): Observable<any | null> {
    return this._danhmuc.asObservable();
  }
  constructor(private http: HttpClient) { }

  getDanhmucs() {
    return this.http.get(this.urlApi + '/tazagroup-danhmuc').pipe(
      map((data: any) => {
        this._danhmucs.next(data);
        return data;
      })
    );
  }
  getDanhmucDetail(slug: string) {
    return this.http.get(this.urlApi + `/tazagroup-danhmuc/${slug}`).pipe(
      map((data: any) => {
        this._danhmuc.next(data);
        return data;
      })
    );
  }
  postDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.post(this.urlApi + '/tazagroup-danhmuc', data).pipe(
          map((danhmuc) => {
            if (danhmucs?.length > 0) {
              this._danhmucs.next([...danhmucs, danhmuc]);
            } else {
              this._danhmucs.next([danhmuc]);
            }
            return danhmuc;
          })
        )
      )
    );
  }
  updateDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.patch(this.urlApi + `/tazagroup-danhmuc/${data.id}`, data).pipe(
          map((danhmuc) => {
            // Find the index of the updated tag
            const index = danhmucs.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if (index != -1) {
              danhmucs[index] = data;

              this._danhmucs.next(danhmucs as any[]);
            } else {
              this._danhmucs.next([danhmuc]);


            }


            // Return the updated tag
            return danhmuc;
          })
        )
      )
    );
  }
  deleteDanhmuc(id: String) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.delete(this.urlApi + `/tazagroup-danhmuc/${id}`).pipe(
          map((isDelete) => {
            const updateDanhmuc = danhmucs.filter((e: any) => e.id != id);

            this._danhmucs.next(updateDanhmuc);
            return isDelete;
          })
        )
      )
    );
  }
  uploadDriver(file: any): Observable<any> {
    return this.http.post(this.urlApi + '/upload/file', file).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
