import { environment } from "../../environments/environment";
export function ConvertDriveData(data:any){
  return data.slice(1).map((row:any) => {
    return {
      Title: row[0],
      Danhmuc: row[1],
      SKU: row[2],
    };
  });
} 

export function GetImage(data:any) {
   if(data)
   {
    const checkdomain =  data.toLowerCase().includes('tazagroup')
    const checkhttp =  data.toLowerCase().includes('http')
    const result = checkhttp?data:checkdomain?`${environment.BaseImage+data}`:`${environment.BaseImage+'tazagroup/'+data}`
    return result
   }
   else {
     return environment.BaseImage+"assets/image/logo.svg";
   }

}
export function nest(items: any[], id:any = '', link:any = 'pid'):any {
      if (items) {
        return items.filter((item) => item[link] == id)
          .map((item) => ({
            ...item,
            children: nest(items, item.id),
          }));
      };
}
export function sharedFunction(): void {
          // Your shared function logic goes here
}
