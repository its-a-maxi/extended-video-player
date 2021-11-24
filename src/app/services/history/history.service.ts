import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  // A BehaviorSubject which will save all data from the history is created
  // Initializes the BehaviourSubject empty
  private historySource = new BehaviorSubject<string[]>([]);

  // An observable of the behaviourSubject is declared
  public history$ = this.historySource.asObservable();

  constructor()
  {
    // If some data were already stored in localStorage the BehaviourSubject ill be updated
    let temp = localStorage.getItem("videoHistory");
    if (temp)
      this.historySource.next(JSON.parse(temp));
  }

  // Adds a new video to the history list
  addVideoURL(videoURL: string): Observable<string[]>
  {
    // Pushes the new video in the list
    let historyValue: string[] = this.historySource.value.filter(value => value != videoURL);
    historyValue.push(videoURL);
    // Updates the BehaviourSubject with the updated list
    this.historySource.next(historyValue);
    
    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history$);
  }

  // Removes all videos from the history
  clearHistory(): Observable<string[]>
  {
    // Updates the behaviourSubject with an empty list
    this.historySource.next([]);

    // Removes the bookmarks data stored in localStorage
    localStorage.removeItem("videoHistory");

    return (this.history$);
  }

  // Removes an specific video from the history
  removeVideoURL(videoURL: string): Observable<string[]>
  {
    // Search index number of the pased video id in <history> and
    // removes the video from <history>, replacing the array
    // with a new one without the video.
    let historyValue: string[] = this.historySource.value;
    historyValue.splice(historyValue.findIndex(value => value == videoURL), 1);
    // Updates the BehaviourSubject with the updated list
    this.historySource.next(historyValue);

    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history$);
  }
}
