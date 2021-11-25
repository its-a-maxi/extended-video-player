import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface HistoryEntry
{
  videoURL: string;
}

@Injectable({
  providedIn: 'root'
})

export class HistoryService {

  // A BehaviorSubject which will save all data from the history is created
  // Initializes the BehaviourSubject empty
  private historySource = new BehaviorSubject<HistoryEntry[]>([]);

  // An observable of the behaviourSubject is declared
  public history$ = this.historySource.asObservable();

  // Initializes the behaviourSubject, for the app to work in case the backend is down
  // the app will use localStorage in conjuction with a DB.
  constructor(private http: HttpClient)
  {
    // If some data were present in localStorage <localHistory> will be updated
    let localHistory: HistoryEntry[] = [];
    let temp = localStorage.getItem("videoHistory");
    if (temp) {
        localHistory = JSON.parse(temp);
    }

    // Gets the DB bookmarks value from the backend
    this.http.get<HistoryEntry[]>('http://localhost:8000/history').subscribe(
      history => {
        // Checks if <localHistory> is empty, if it is the BehaviourSubject will
        // be uptated with the DB history, else it will be updated with <localHistory>
        if (!temp) {
          this.historySource.next(history);
        }
        else {
          this.historySource.next(localHistory);
        }
      },
      error => {
        console.log("Backend error: " + error.name);
        // If the backend is not accesible the behaviourSubject is assigned <localHistory>
        this.historySource.next(localHistory)
      });
  }

  // Adds a new video to the history list
  addVideoURL(videoURL: string): Observable<HistoryEntry[]>
  {
    // Pushes the new video in the list
    let historyValue: HistoryEntry[] = this.historySource.value.filter(value => value.videoURL != videoURL);
    historyValue.push({videoURL: videoURL});
    // Updates the BehaviourSubject with the updated list
    this.historySource.next(historyValue);
    
    // Calls the backend to add a new history entry in the DB
    this.http.post<string>('http://localhost:8000/history', {videoURL}).subscribe()

    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history$);
  }

  // Removes all videos from the history
  clearHistory(): Observable<HistoryEntry[]>
  {
    // Updates the behaviourSubject with an empty list
    this.historySource.next([]);

    // Calls the backend to clear the history collection on the DB
    this.http.delete('http://localhost:8000/history').subscribe();


    // Removes the bookmarks data stored in localStorage
    localStorage.removeItem("videoHistory");

    return (this.history$);
  }

  // Removes an specific video from the history
  removeVideoURL(videoURL: string): Observable<HistoryEntry[]>
  {
    // Search index number of the pased video id in <history> and
    // removes the video from <history>, replacing the array
    // with a new one without the video.
    let historyValue: HistoryEntry[] = this.historySource.value;
    historyValue.splice(historyValue.findIndex(value => value.videoURL == videoURL), 1);
    // Updates the BehaviourSubject with the updated list
    this.historySource.next(historyValue);

    // Calls the backend to remove passed video from the bookmarks in the DB 
    this.http.delete('http://localhost:8000/history/' + videoURL).subscribe();

    // Saves the updated list in the localStorage
    localStorage.setItem("videoHistory", JSON.stringify(historyValue));

    return (this.history$);
  }
}
