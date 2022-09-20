import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postproduct(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((result:any)=>{
      return result;
    }))
  }

  getproduct(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((result:any)=>{
      return result;
    }))
  }

  updateproduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((result:any)=>{
      return result;
    }))
  }

  deleteproduct(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((result:any)=>{
      return result;
    }))
  }


}
