import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  getHistory() : Observable<string[]>
  {
    // Gets "videoHistory" JSON stored in the local storage
    let temp = localStorage.getItem("videoHistory");

    // If "videoHistory" existed in local storage its content will
    // be returned
    if (temp)
      return (of(JSON.parse(temp)));
    else 
      return (of([]));
  }
}
