import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
isView:boolean;
  constructor() { }

  setIsView(data){
this.isView=data;
  }
  getIsView(){
    return this.isView;
  }
}
