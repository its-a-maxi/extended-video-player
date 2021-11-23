import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CurrentVideoService } from 'src/app/services/currentVideo/current-video.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  constructor(public sanitizer:DomSanitizer, private currentVideoService: CurrentVideoService) { 
  }

  // Bookmark button state
  isInBookmarks: boolean = false;

  // URL for the youtube video is stored here
  URL: any = '';

  currentVideo: string = "";

  // Gets the video id from App-component
  @Input() currentVideoURL: string = "";

  // Toggles bookmark a video function in App-component
  @Output() bookmarkVideo = new EventEmitter<string>();
  
  // Toggles unmark a video function in App-component
  @Output() unmarkVideo = new EventEmitter<string>();


  ngOnInit(): void {
    this.currentVideoService.videoURL.subscribe(video => this.currentVideo = video);
    this.currentVideoService.videoURL.subscribe(video => this.URL = this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + video));
  }

  private checkBookmarks(): boolean
  {
    // Creates a variable were bookmarks will be stored
    let bookmarks: string[];

    // Gets "bookmarks" from local storage
    let temp = localStorage.getItem("bookmarks");

    // Checks if "bookmarks" exists in local storage
    if (temp)
    {
      // Saves parsed "bookmarks" on <bookmarks>
      bookmarks = JSON.parse(temp);

      // Returns (true) if the video URL exists on <bookmarks>
      if (bookmarks.find(value => value == this.currentVideoURL))
        return (true);
    }

    // Returns (false) if the video URL doesn't exist in <bookmarks>
    // or "bookmarks" doesn't exist in local storage
    return (false);
  }

  // // Loads on any simple change of the component,
  // // only on <currentVideoURL> changes in this case
  // ngOnChanges(changes: SimpleChanges): void
  // {
  //   // Checks if the video is in bookmarks and changes
  //   // the bookmark button state in consequence
  //   this.isInBookmarks = this.checkBookmarks();

  //   // Sanitize the URL to avoid errors
  //   this.URL = this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + this.currentVideoURL);
  // }

  // Runs when bookmark button is clicked
  updateBookmarks(): void
  {
    // If the video isn't bookmarked the bookmarkVideo Output is emitted
    if (!this.isInBookmarks)
      this.bookmarkVideo.emit(this.currentVideoURL);
      
    // If the video is bookmarked the unmarkVideo Output is emitted
    else
      this.unmarkVideo.emit(this.currentVideoURL);

    // Changes the bookmark button state
    this.isInBookmarks = !this.isInBookmarks;
  }

}
