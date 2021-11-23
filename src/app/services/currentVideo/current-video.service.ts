import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryService } from '../history/history.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentVideoService {

  URL: string = "";
  videoURL: BehaviorSubject<string>;

  constructor(private historyService: HistoryService) {
    this.videoURL = new BehaviorSubject(this.URL)
  }

  changeVideoURL(videoURL: string)
  {
    this.historyService.addVideoURL(videoURL);
    this.videoURL.next(videoURL);
  }
}
