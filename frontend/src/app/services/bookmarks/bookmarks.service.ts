import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Bookmark
{
  videoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  // A BehaviorSubject which will save al data from the bookmarks is created
  // Initializes the BehaviourSubject empty
  private bookmarksSource = new BehaviorSubject<Bookmark[]>([]);

  // An observable of the behaviourSubject is declared
  public bookmarks$ = this.bookmarksSource.asObservable();

  // Initializes the behaviourSubject, for the app to work in case the backend is down
  // the app will use localStorage in conjuction with a DB.
  constructor(private http: HttpClient)
  {
    // If some data were already stored in localStorage the BehaviourSubject ill be updated
    let localBookmarks: Bookmark[] = [];
    let temp = localStorage.getItem("bookmarks");
    if (temp)
      localBookmarks = JSON.parse(temp);
    
    // Gets the DB bookmarks value from the backend
    this.http.get<Bookmark[]>('http://localhost:8000/bookmarks').subscribe(
      bookmark => {
      // Checks if <localBookmarks> is empty, if it is the BehaviourSubject will
      // be uptated with the DB bookmarks list, else it will be updated with <localBookmarks>
      if (!temp) {
        this.bookmarksSource.next(bookmark);
      }
      else {
        this.bookmarksSource.next(localBookmarks);
      }
    },
    error => {
      console.log("Backend error: " + error.name);
      // If the backend is not accesible the behaviourSubject is assigned <localBookmarks>
      this.bookmarksSource.next(localBookmarks)
    });
  }

  // Adds a new bookmark to the bookmarks list
  addBookmark(videoURL: string): Observable<Bookmark[]>
  {
    // Pushes the new bookmark in the list
    let bookmarksValue: Bookmark[] = this.bookmarksSource.value;
    bookmarksValue.push({videoURL : videoURL});
    // Updates the BehaviourSubject with the updated list
    this.bookmarksSource.next(bookmarksValue);

    // Calls the backend to add a new bookmark in the DB
    this.http.post<string>('http://localhost:8000/bookmarks', {videoURL}).subscribe()

    // Saves the updated list in the localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksValue));

    return (this.bookmarks$);
  }

  // Removes all bookmarks from the bookmarks list
  clearBookmarks(): Observable<Bookmark[]>
  {
    // Updates the behaviourSubject with an empty list
    this.bookmarksSource.next([]);

    // Calls the backend to clear the bookmark collection on the DB
    this.http.delete('http://localhost:8000/bookmarks').subscribe();

    // Removes the bookmarks data stored in localStorage
    localStorage.removeItem("bookmarks");

    return (this.bookmarks$);
  }

  // Removes an specific video from the bookmarks list
  removeBookmark(videoURL: string): Observable<Bookmark[]>
  {
    // Search index number of the pased video id in <bookmarks> and
    // removes video URL from <bookmarks>, replacing the array
    // with a new one without the video URL
    let bookmarksValue: Bookmark[] = this.bookmarksSource.value;
    bookmarksValue.splice(bookmarksValue.findIndex(value => value.videoURL == videoURL), 1);
    // Updates the BehaviourSubject with the updated list
    this.bookmarksSource.next(bookmarksValue);

    // Calls the backend to remove passed video from the bookmarks in the DB 
    this.http.delete('http://localhost:8000/bookmarks/' + videoURL).subscribe();

    // Saves the updated list in the localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksValue));

    return (this.bookmarks$);
  }

  // Checks if the passed video exist in the bookmarks list
  isInBookmarks(videoURL: string): boolean
  {
    let bookmarksValue: Bookmark[] = this.bookmarksSource.value;
    if (bookmarksValue.find(value => value.videoURL == videoURL)) {
      return (true);
    }
    return (false);
  }
}
