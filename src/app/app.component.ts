import { Component, OnInit } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public $time: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));
  fiveHourRowElements = new Array(4).fill(null);
  singleHourRowElements = new Array(4).fill(null);
  fiveMinuteRowElements = new Array(11).fill(null);
  singleMinuteRowElements = new Array(4).fill(null);
  inkCircle = false;
  inkFiveHourRow = 0;
  inkSingleHourRow = 0;
  inkFiveMinuteRow = 0;
  inkSingleMinuteRow = 0;

  ngOnInit() {
    this.$time.subscribe((time) => {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      this.inkCircle = !!(seconds % 2);
      this.inkFiveHourRow = Math.floor(hours / 5);
      this.inkSingleHourRow = hours % 5;
      this.inkFiveMinuteRow = Math.floor(minutes / 5);
      this.inkSingleMinuteRow = minutes % 5;
    });
  }

  isQuarterHourMark(index: number) {
    return !((index + 1) % 3) && this.inkFiveMinuteRow > index;
  }
}
