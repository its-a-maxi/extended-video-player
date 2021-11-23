import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  bookmarks: string[] = [];

  constructor() {
    // Gets "bookmarks" JSON stored in the local storage
    let temp = localStorage.getItem("bookmarks");

    // If "bookmarks" existed in local storage its content will
    // be parsed and saved on <bookmarks>
    if (temp)
      this.bookmarks = JSON.parse(temp);
  }

  getBookmarks(): Observable<string[]>
  {
    return (of(this.bookmarks));
  }

  addBookmark(videoURL: string): Observable<string[]>
  {
    this.bookmarks.push(videoURL);

    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));

    return (of(this.bookmarks))
  }

  clearBookmarks(): Observable<string[]>
  {
    // Clears <bookmarks>, leaving it empty
    this.bookmarks = [];

    // Removes "bookmarks" from local storage so its no longer stored
    localStorage.removeItem("bookmarks");

    return (of(this.bookmarks));
  }

  removeBookmark(videoURL: string)
  {
    // Search index number of the pased video id in <bookmarks>
    let index: number = this.bookmarks.findIndex(value => value == videoURL);

    // Checks if the index is positive, meaning the video URL is inside the <bookmarks> array
    if (index >= 0)
    {
      // Removes video URL from <bookmarks>, replacing the array
      // with a new one without the video URL
      this.bookmarks.splice(index, 1);

      // Transforms the array to JSON and updates it in local storages
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    }

    return (of(this.bookmarks))
  }
}
