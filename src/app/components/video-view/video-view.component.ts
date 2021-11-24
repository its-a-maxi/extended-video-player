import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrentVideoService } from 'src/app/services/currentVideo/current-video.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  constructor(public sanitizer:DomSanitizer,
      private currentVideoService: CurrentVideoService,
      private bookmarksService: BookmarksService) { 
  }

  // Bookmark button state
  isInBookmarks: boolean = false;

  // The siplayable URL of the youtube video is stored here
  URL: any = '';

  // The URL / ID of the video is saved in this variable
  currentVideo: string = "";

  // Runs at component load
  ngOnInit(): void {
    // Various variables will be subscribed to the BehaviourSubject of currentVideoService
    // so they will be updated each time the URL changes.
    this.currentVideoService.videoURL$.subscribe(video => {
      this.currentVideo = video;
      // The <URL> is formulated from the basic URL/ID of the video.
      this.URL = this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + video);
      // Checks if the video is bookmarked or not
      this.isInBookmarks = this.bookmarksService.isInBookmarks(video);
    });
  }

  // Runs when bookmark button is clicked
  updateBookmarks(): void
  {
    // Checks if the video is in bookmarks, if it is, the video will be eliminated from bookmarks
    if (this.isInBookmarks)
      this.bookmarksService.removeBookmark(this.currentVideo).subscribe();
    // If the video is not in bookmarks the video will be added
    else
      this.bookmarksService.addBookmark(this.currentVideo).subscribe();
    // Changes the button state to its contrary
    this.isInBookmarks = !this.isInBookmarks
  }


}
