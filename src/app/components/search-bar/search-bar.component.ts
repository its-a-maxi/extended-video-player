import { ConditionalExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  // Searchbar input is stored here
  videoURL: string = "";

  // If nothing is written in the searchbar this variable will be showed
  // When the video is changed this variable is updated with its id
  @Input() currentVideoURL: string = "";

  // Toggles video change function in App-component
  @Output() currentVideoURLChange = new EventEmitter<string>();

  ngOnInit(): void {
  }

  // Youtube video URL id parser from -> https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code/21607897
  private getVideoId(videoURL: string): string | null
  {
    let rst = videoURL.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
    if (rst && rst[7].length==11)
      return (rst[7]);
    else
      return (null);
 }

  // Executed at searchbar submit trigger
  search()
  {
    // Runs video URL parser and saves its return value in a variable
    let videoId = this.getVideoId(this.videoURL)

    // If the parser returns a valid URL the video will be changed
    if (videoId)
      this.currentVideoURLChange.emit(videoId);
    // If the parser returns an invalid URL an alert is shown
    else
      alert("Incorrect URL");
      
    // Resets input value
    this.videoURL = "";
  }

}
