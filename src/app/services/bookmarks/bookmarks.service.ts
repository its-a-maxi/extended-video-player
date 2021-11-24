import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  // A BehaviorSubject which will save al data from the bookmarks is created
  // Initializes the BehaviourSubject empty
  private bookmarksSource = new BehaviorSubject<string[]>([]);

  // An observable of the behaviourSubject is declared
  public bookmarks$ = this.bookmarksSource.asObservable();

  constructor()
  {
    // If some data were already stored in localStorage the BehaviourSubject ill be updated
    let temp = localStorage.getItem("bookmarks");
    if (temp)
      this.bookmarksSource.next(JSON.parse(temp));
  }

  // Adds a new bookmark to the bookmarks list
  addBookmark(videoURL: string): Observable<string[]>
  {
    // Pushes the new bookmark in the list
    let bookmarksValue: string[] = this.bookmarksSource.value;
    bookmarksValue.push(videoURL);
    // Updates the BehaviourSubject with the updated list
    this.bookmarksSource.next(bookmarksValue);

    // Saves the updated list in the localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksValue));

    return (this.bookmarks$);
  }

  // Removes all bookmarks from the bookmarks list
  clearBookmarks(): Observable<string[]>
  {
    // Updates the behaviourSubject with an empty list
    this.bookmarksSource.next([]);

    // Removes the bookmarks data stored in localStorage
    localStorage.removeItem("bookmarks");

    return (this.bookmarks$);
  }

  // Removes an specific video from the bookmarks list
  removeBookmark(videoURL: string)
  {
    // Search index number of the pased video id in <bookmarks> and
    // removes video URL from <bookmarks>, replacing the array
    // with a new one without the video URL
    let bookmarksValue: string[] = this.bookmarksSource.value;
    bookmarksValue.splice(bookmarksValue.findIndex(value => value == videoURL), 1);
    // Updates the BehaviourSubject with the updated list
    this.bookmarksSource.next(bookmarksValue);

    // Saves the updated list in the localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksValue));

    return (this.bookmarks$);
  }

  // Returns length of the bookmarks list
  numberOfBookmarks(): Observable<number>
  {
    let bookmarksValue: string[] = this.bookmarksSource.value;

    return (of(bookmarksValue.length));
  }

  // Checks if the passed video exist in the bookmarks list
  isInBookmarks(videoURL: string): boolean
  {
    let bookmarksValue: string[] = this.bookmarksSource.value;
    if (bookmarksValue.find(value => value == videoURL))
      return (true);
    return (false);
  }
}
