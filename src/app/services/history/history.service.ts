import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  // A BehaviorSubject which will save al data from the history is created
  history: BehaviorSubject<string[]>;

  constructor()
  {
    // Initializes the BehaviourSubject empty
    let emptyArray: string[] = [];
    this.history = new BehaviorSubject(emptyArray);
    // If some data were already stored in localStorage the BehaviourSubject ill be updated
    let temp = localStorage.getItem("videoHistory");
    if (temp)
      this.history.next(JSON.parse(temp));
  }

  // Returns the BehaviourSubject observable, which contents the video history
  getHistory() : Observable<string[]>
  {
      return (this.history.asObservable());
  }

  // Adds a new video to the history list
  addVideoURL(videoURL: string): Observable<string[]>
  {
    // Pushes the new video in the list
    let historyValue: string[] = this.history.value.filter(value => value != videoURL);
    historyValue.push(videoURL);
    // Updates the BehaviourSubject with the updated list
    this.history.next(historyValue);
    
    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history.asObservable());
  }

  // Removes all videos from the history
  clearHistory(): Observable<string[]>
  {
    // Updates the behaviourSubject with an empty list
    this.history.next([]);

    // Removes the bookmarks data stored in localStorage
    localStorage.removeItem("videoHistory");

    return (this.history.asObservable());
  }

  // Removes an specific video from the history
  removeVideoURL(videoURL: string): Observable<string[]>
  {
    // Search index number of the pased video id in <history> and
    // removes the video from <history>, replacing the array
    // with a new one without the video.
    let historyValue: string[] = this.history.value;
    historyValue.splice(historyValue.findIndex(value => value == videoURL), 1);
    // Updates the BehaviourSubject with the updated list
    this.history.next(historyValue);

    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history.asObservable());
  }
}
