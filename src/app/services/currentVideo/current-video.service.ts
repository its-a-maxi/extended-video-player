import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryService } from '../history/history.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentVideoService {

  // Declares a behaviourSubject where the current video URL will be saved
  videoURL: BehaviorSubject<string>;

  constructor(private historyService: HistoryService)
  {
    // The BehaviourSubject Is initialized empty
    this.videoURL = new BehaviorSubject("")
  }

  // Changes the current video to the new one passed
  changeVideoURL(videoURL: string)
  {
    // Adds the new video to the history
    this.historyService.addVideoURL(videoURL);
    // Updates the BehaviourSubject
    this.videoURL.next(videoURL);
  }
}
