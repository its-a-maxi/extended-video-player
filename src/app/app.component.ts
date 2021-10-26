import { Component, Directive, ViewChild } from '@angular/core';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { HistoryComponent } from './components/history/history.component';
import { VideoViewComponent } from './components/video-view/video-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-video-player';

  currentVideoURL: string = "";

  @ViewChild(HistoryComponent) private videoHistory?: HistoryComponent;
  @ViewChild(BookmarksComponent) private bookmarks?: BookmarksComponent;
  @ViewChild(VideoViewComponent) private videoView?: VideoViewComponent;

  changeVideoURL(id: string): void
  {
    if (id != "")
    {
      this.currentVideoURL = id;
      this.videoHistory?.updateHistory(id);
    }
  }

  bookmarkVideo(id: string): void
  {
    this.bookmarks?.updateBookmarks(id);
  }

  unmarkVideo(id: string): void
  {
    this.bookmarks?.removeURLBookmarks(id);
  }
}
