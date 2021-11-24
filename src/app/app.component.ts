import { Component } from '@angular/core';
import { BookmarksService } from './services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-video-player';

  numberOfBookmarksOnLoad = 0;

  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.bookmarksService.bookmarks$.subscribe(bookmarks => {this.numberOfBookmarksOnLoad = bookmarks.length})
    this.showSnackbar();
  }

  // SNACKBAR ADAPTED FROM W3SCHOOLS - https://www.w3schools.com/howto/howto_js_snackbar.asp 
  showSnackbar(): void
  {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x!.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 2000);
  }
}
