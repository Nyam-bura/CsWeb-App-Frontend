import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseURL = 'http://127.0.0.1:8000/message/';
  private messageURL = 'http://127.0.0.1:8000/element/'
  private customerUrl='https://eohsn0jvm4vhhft.m.pipedream.net'
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.baseURL);
  }
  getMessageById(id:any){
    return this.http.get(this.messageURL,id)
  }

  sendMessage(data:{
    user_id:string,
    message_body:string,
    reply:string

  }){
     return this.http.post(this.customerUrl,data);

  }
}
