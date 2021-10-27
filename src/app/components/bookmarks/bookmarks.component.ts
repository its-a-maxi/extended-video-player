import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor() { }

  // Array of strings, all the bookmarks will be stored here
  bookmarks: string[] = [];

  // Button state
  showBookmarks: boolean = false;

  // Toggles video change function in App-component
  @Output() currentVideoURLChange = new EventEmitter<string>();

  // Toggles snackbar function in App-component
  @Output() numberOfBookmarksOnLoad = new EventEmitter<number>();

  // Runs at component load
  ngOnInit(): void
  {
    // Gets "bookmarks" JSON stored in the local storage
    let temp = localStorage.getItem("bookmarks");

    // If "bookmarks" existed in local storage its content will
    // be parsed and saved on <bookmarks>
    if (temp)
      this.bookmarks = JSON.parse(temp);

    // Emits output of <numberOfBookmarksOnLoad> which will show a snackbar
    this.numberOfBookmarksOnLoad.emit(this.bookmarks?.length);
  }

  updateBookmarks(videoURL: string): void
  {
    // Adds new video id to <bookmarks>
    this.bookmarks.push(videoURL);

    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
  }

  clearBookmarks(): void
  {
    // Clears <bookmarks>, leaving it empty
    this.bookmarks = [];

    // Removes "bookmarks" from local storage so its no longer stored
    localStorage.removeItem("bookmarks");
  }

  removeURLBookmarks(videoURL: string)
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
  }
  

}
