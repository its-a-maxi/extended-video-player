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

  // Current video id will be stored here
  currentVideoURL: string = "";

  // Its used to show number of bookmnarks at aplication load
  numberOfBookmarksOnLoad: number = 0;

  // Declaring child components to be able to call their functions
  @ViewChild(HistoryComponent) private videoHistory?: HistoryComponent;
  @ViewChild(BookmarksComponent) private bookmarks?: BookmarksComponent;
  @ViewChild(VideoViewComponent) private videoView?: VideoViewComponent;

  // Called on (changeVideoURL) output
  changeVideoURL(id: string): void
  {
    // Checks if the passed id isn't empty
    if (id != "")
    {
      // Sets the current video id to the new id
      this.currentVideoURL = id;
      
      // Adds the new id to the history
      this.videoHistory?.updateHistory(id);
    }
  }

  // Called on (bookmarkVideo) output
  bookmarkVideo(id: string): void
  {
    // Adds a bookmark to bookmarks
    this.bookmarks?.updateBookmarks(id);
  }

  // Called on (unmarkVideo) output
  unmarkVideo(id: string): void
  {
    // removes a bookmark from bookmarks
    this.bookmarks?.removeURLBookmarks(id);
  }

  // SNACKBAR ADAPTED FROM W3SCHOOLS - https://www.w3schools.com/howto/howto_js_snackbar.asp 
  showSnackbar(n: number): void
  {
    this.numberOfBookmarksOnLoad = n;

    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x!.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 2000);
  }
}
