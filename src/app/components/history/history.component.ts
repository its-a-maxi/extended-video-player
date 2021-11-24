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

  // Runs at component load
  ngOnInit(): void
  {
    // Subscribes <bookmarks> to bookmark$ observable
    this.historyService.history$.subscribe(history => {this.videoHistory = history})
  }

  // Calls updateHistory() from the historyService service
  updateHistory(videoURL: string): void
  {
    this.historyService.addVideoURL(videoURL)
        .subscribe();
  }

  // Calls clearHistory() from the historyService service
  clearHistory(): void
  {
    this.historyService.clearHistory()
        .subscribe();
  }

  // Calls removeVideoURL() from the historyService service
  removeURLHistory(videoURL: string)
  {
    this.historyService.removeVideoURL(videoURL)
        .subscribe();
  }

  // Calls changeVideoURL() from the currentVideoService service
  changeCurrentVideo(videoURL: string)
  {
    this.currentVideoService.changeVideoURL(videoURL);
  }

}