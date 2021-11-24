import { Component, OnInit } from '@angular/core';
import { Bookmark, BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
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

  // Runs at component load
  ngOnInit(): void
  {
    // Subscribes <bookmarks> to bookmark$ observable
    this.bookmarksService.bookmarks$.subscribe(bookmarks => {this.bookmarks = bookmarks})
  }

  // Calls removeBookmark() from the BookmarksService service
  removeURLBookmarks(videoURL: string)
  {
    this.bookmarksService.removeBookmark(videoURL)
      .subscribe();
  }

  // Calls changeVideoURL() from the CurrentVideoService service
  changeCurrentVideo(videoURL: string)
  {
    this.currentVideoService.changeVideoURL(videoURL);
  }
  
}
