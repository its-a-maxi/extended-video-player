import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService) { }

  // Array of strings, all the bookmarks will be stored here
  videoHistory: string[] = [];
  
  // Toggles video change function in App-component
  @Output() currentVideoURLChange = new EventEmitter<string>();

  // Runs at component load
  ngOnInit(): void
  {
    this.getHistory();
    // // Gets "videoHistory" JSON stored in the local storage
    // let temp = localStorage.getItem("videoHistory");

    // // If "videoHistory" existed in local storage its content will
    // // be parsed and saved on <videoHistory>
    // if (temp)
    //   this.videoHistory = JSON.parse(temp);
  }

  getHistory(): void
  {
    this.historyService.getHistory()
        .subscribe(history => this.videoHistory = history);
  }

  updateHistory(videoURL: string): void
  {
    // Code to avoid duplicates:
      // A new array will be created without duplicates of video URL
      let temp = this.videoHistory.filter(value => value != videoURL);
      // The new array will be assigned to <videoHistory>
      this.videoHistory = temp;

    // Adds new video id to <videoHistory>
    this.videoHistory.push(videoURL);
    
    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("videoHistory", JSON.stringify(this.videoHistory));
  }

  clearHistory(): void
  {
    // Clears <videoHistory>, leaving it empty
    this.videoHistory = [];

    // Removes "videoHistory" from local storage so its no longer stored
    localStorage.removeItem("videoHistory");
  }

  removeURLHistory(videoURL: string)
  {
    // Search index number of the pased video id in <bookmarks> and
    // removes video URL from <bookmarks>, replacing the array
    // with a new one without the video URL
    this.videoHistory.splice(this.videoHistory.findIndex(value => value == videoURL), 1);

    // Transforms the array to JSON and updates it in local storages
    localStorage.setItem("videoHistory", JSON.stringify(this.videoHistory));
  }

}
