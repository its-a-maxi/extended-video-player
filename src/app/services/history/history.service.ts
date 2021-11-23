import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  history: string[] = [];

  constructor()
  {
    let temp = localStorage.getItem("videoHistory");
    if (temp)
      this.history = JSON.parse(temp);
  }

  getHistory() : Observable<string[]>
  {
      return (of(this.history));
  }

  addVideoURL(videoURL: string): Observable<string[]>
  {
    // Code to avoid duplicates:
      // A new array will be created without duplicates of video URL
      let temp = this.history.filter(value => value != videoURL);
      console.log(temp);
      // The new array will be assigned to <videoHistory>
      this.history = temp;

    // Adds new video id to <videoHistory>
    this.history.push(videoURL);
    
    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("videoHistory", JSON.stringify(this.history));

    return (of(this.history));
  }

  clearHistory(): Observable<string[]>
  {
    // Clears <videoHistory>, leaving it empty
    this.history = [];

    // Removes "videoHistory" from local storage so its no longer stored
    localStorage.removeItem("videoHistory");

    return (of(this.history));
  }

  removeVideoURL(videoURL: string): Observable<string[]>
  {
    // Search index number of the pased video id in <bookmarks> and
    // removes video URL from <bookmarks>, replacing the array
    // with a new one without the video URL
    this.history.splice(this.history.findIndex(value => value == videoURL), 1);

    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("videoHistory", JSON.stringify(this.history));

    return (of(this.history))
  }
}
