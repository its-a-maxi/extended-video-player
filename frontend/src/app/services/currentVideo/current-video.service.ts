import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryService } from '../history/history.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentVideoService {

  // Declares a behaviourSubject where the current video URL will be saved
  // The BehaviourSubject Is initialized empty
  private videoURLSource = new BehaviorSubject("");

  // An observable of the behaviourSubject is declared
  public videoURL$ = this.videoURLSource.asObservable();

  constructor(private historyService: HistoryService)
  {
  }

  // Changes the current video to the new one passed
  changeVideoURL(videoURL: string)
  {
    // Adds the new video to the history
    this.historyService.addVideoURL(videoURL);
    // Updates the BehaviourSubject
    this.videoURLSource.next(videoURL);
  }
}
