import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  constructor(public sanitizer:DomSanitizer) { }

  @Input() currentVideoURL: string = "";
  @Output() bookmarkVideo = new EventEmitter<string>();
  @Output() unmarkVideo = new EventEmitter<string>();

  isInBookmarks: boolean = false;
  URL: any;

  ngOnInit(): void {
  }

  private checkBookmarks(): boolean
  {
    let bookmarks: string[];
    let temp = localStorage.getItem("bookmarks");
    if (temp)
    {
      bookmarks = JSON.parse(temp);
      if (bookmarks.find(value => value == this.currentVideoURL))
        return (true);
    }
    return (false);
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    this.isInBookmarks = this.checkBookmarks();
    this.URL = this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + this.currentVideoURL);
  }

  updateBookmarks(): void
  {
    if (!this.isInBookmarks)
      this.bookmarkVideo.emit(this.currentVideoURL);
    else
      this.unmarkVideo.emit(this.currentVideoURL);
    this.isInBookmarks = !this.isInBookmarks;
  }

}
