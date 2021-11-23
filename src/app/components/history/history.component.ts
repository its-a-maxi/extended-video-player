import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrentVideoService } from 'src/app/services/currentVideo/current-video.service';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService,
      private currentVideoService: CurrentVideoService) { }

  // Array of strings, all the bookmarks will be stored here
  videoHistory: string[] = [];
  
  // Toggles video change function in App-component
  @Output() currentVideoURLChange = new EventEmitter<string>();

  // Runs at component load
  ngOnInit(): void
  {
    this.getHistory();
  }

  getHistory(): void
  {
    this.historyService.getHistory()
        .subscribe(history => this.videoHistory = history);
  }

  updateHistory(videoURL: string): void
  {
    this.historyService.addVideoURL(videoURL)
        .subscribe(history => this.videoHistory = history);
  }

  clearHistory(): void
  {
    this.historyService.clearHistory()
        .subscribe(history => this.videoHistory = history);
  }

  removeURLHistory(videoURL: string)
  {
    this.historyService.removeVideoURL(videoURL)
        .subscribe(history => this.videoHistory = history);
  }

  changeCurrentVideo(videoURL: string)
  {
    this.currentVideoService.changeVideoURL(videoURL);
  }

}