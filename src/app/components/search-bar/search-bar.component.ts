import { ConditionalExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  videoURL: string = "";

  @Input() currentVideoURL: string = "";
  @Output() currentVideoURLChange = new EventEmitter<string>();

  ngOnInit(): void {
  }

  // https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code/21607897
  private getVideoId(videoURL: string): string | null
  {
    let rst = videoURL.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
    if (rst && rst[7].length==11)
      return (rst[7]);
    else
      return (null);
 }

  search()
  {
    let videoId = this.getVideoId(this.videoURL)
      if (videoId)
        this.currentVideoURLChange.emit(videoId);
      else
        alert("Incorrect URL");
      this.videoURL = "";
  }

}
