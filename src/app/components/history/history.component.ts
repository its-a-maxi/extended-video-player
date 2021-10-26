import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  videoHistory: string[] = [];
  @Output() currentVideoURLChange = new EventEmitter<string>();

  ngOnInit(): void {
    let temp = localStorage.getItem("videoHistory");
    if (temp)
      this.videoHistory = JSON.parse(temp);
  }

  updateHistory(videoURL: string): void
  {
    let temp = this.videoHistory.filter(value => value != videoURL);
    this.videoHistory = temp;
    this.videoHistory.push(videoURL);
    localStorage.setItem("videoHistory", JSON.stringify(this.videoHistory));
  }

  clearHistory(): void
  {
    this.videoHistory = [];
    localStorage.removeItem("videoHistory");
  }

  removeURLHistory(videoURL: string)
  {
    this.videoHistory.splice(this.videoHistory.findIndex(value => value == videoURL), 1);
    localStorage.setItem("videoHistory", JSON.stringify(this.videoHistory));
  }

}
