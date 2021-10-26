import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor() { }

  bookmarks: string[] = [];
  showBookmarks: boolean = false;

  @Output() currentVideoURLChange = new EventEmitter<string>();

  ngOnInit(): void {
    let temp = localStorage.getItem("bookmarks");
    if (temp)
      this.bookmarks = JSON.parse(temp);
  }

  updateBookmarks(videoURL: string): void
  {
    this.bookmarks.push(videoURL);
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
  }

  clearBookmarks(): void
  {
    this.bookmarks = [];
    localStorage.removeItem("bookmarks");
  }

  removeURLBookmarks(videoURL: string)
  {
    let index: number = this.bookmarks.findIndex(value => value == videoURL);
    if (index >= 0)
    {
      this.bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    }
  }
  

}
