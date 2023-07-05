import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  take,
  switchMap,
  map,
} from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  private _user: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _profile: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _cauhinhuser: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  private APIURL: string = environment.APIURL;
  constructor(private _httpClient: HttpClient) {}
  get users$(): Observable<any[]> {
    return this._users.asObservable();
  }
  get user$(): Observable<any> {
    return this._user.asObservable();
  }
  get profile$(): Observable<any> {
    return this._profile.asObservable();
  }
  get cauhinhuser$(): Observable<any> {
    return this._cauhinhuser.asObservable();
  }
  getUsers(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/test_users`).pipe(
      tap((ves: any[]) => {
        this._users.next(ves);
      })
    );
  }
  Dangky(user: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/test_users/dangky`, user);
  }
  getUserByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/test_users/${id}`).pipe(
      tap((response: any) => {
        this._user.next(response);
        return response;
      })
    );
  }
  updateUser(dulieu: any): Observable<any> {
    return this.users$.pipe(
      take(1),
      switchMap((Users: any) =>
        this._httpClient.patch(`${this.APIURL}/test_users/${dulieu.id}`, dulieu).pipe(
          map((user:any) => {
            const index = Users.findIndex((item: any) => item.id === user.id);
            Users[index] = user;
            this._users.next(Users);
            return user;
          })
        )
      )
    );
  }
  changepass(data:any): Observable<any> {
     return this._httpClient.post(`${environment.APIURL}/test_auth/changepass`, data).pipe(
        tap((response: any) => {
                return response;
        })
    );
}
  Randompass(data:any): Observable<any> {
     return this._httpClient.post(`${environment.APIURL}/test_auth/randompass`, data).pipe(
        tap((response: any) => {
                return response;
        })
    );
}

getCauhinhUser(): Observable<any[]> {
  return this._httpClient.get<any[]>(`${this.APIURL}/test_cauhinh`).pipe(
    tap((data: any[]) => {
      this._cauhinhuser.next(data);
    })
  );
}
updateCauhinhUser(dulieu: any): Observable<any> {
  return this.cauhinhuser$.pipe(
    take(1),
    switchMap((datas: any) =>
      this._httpClient.patch(`${this.APIURL}/test_cauhinh/${dulieu.id}`, dulieu).pipe(
        map((data:any) => {
          const index = datas.findIndex((item: any) => item.id === data.id);
          datas[index] = data;
          this._cauhinhuser.next(datas);
          return data;
        })
      )
    )
  );
}
getProfile(): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/test_auth/profile`).pipe(
      tap((response) => {
        this._profile.next(response);
      })
    );
  }
}
