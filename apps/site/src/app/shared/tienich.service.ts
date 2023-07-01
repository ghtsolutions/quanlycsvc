import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TienichService {

  constructor() { }
  checkrong(data:any)
  {
    if(data='')
    {
      return "Dữ Liệu Rỗng"
    }
    else return true;
  }
}
