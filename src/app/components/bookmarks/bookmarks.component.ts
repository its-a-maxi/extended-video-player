import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CurrentVideoService } from 'src/app/services/currentVideo/current-video.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private bookmarksService: BookmarksService,
    private currentVideoService: CurrentVideoService) { }

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
    this.getBookmarks();

    // Emits output of <numberOfBookmarksOnLoad> which will show a snackbar
    this.numberOfBookmarksOnLoad.emit(this.bookmarks?.length);
  }

  getBookmarks(): void
  {
    this.bookmarksService.getBookmarks()
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  updateBookmarks(videoURL: string): void
  {
    this.bookmarksService.addBookmark(videoURL)
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  clearBookmarks(): void
  {
    this.bookmarksService.clearBookmarks()
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  removeURLBookmarks(videoURL: string)
  {
    this.bookmarksService.removeBookmark(videoURL)
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  changeCurrentVideo(videoURL: string)
  {
    this.currentVideoService.changeVideoURL(videoURL);
  }
  
}
