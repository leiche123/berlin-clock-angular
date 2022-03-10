import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public $time: Observable<Date> = timer(0, 1000).pipe(map(() => new Date()));
  private unsubscribe$: Subject<void> = new Subject();
  row1Elements = ['square', 'square', 'square', 'square'];
  row2Elements = ['square', 'square', 'square', 'square'];
  row3Elements = [
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
    'square',
  ];
  row4Elements = ['square', 'square', 'square', 'square'];
  inkCircle = false;
  inkRow1 = 0;
  inkRow2 = 0;
  inkRow3 = 0;
  inkRow4 = 0;

  ngOnInit() {
    this.$time.pipe(takeUntil(this.unsubscribe$)).subscribe((time) => {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      this.inkCircle = !!(seconds % 2);
      this.inkRow1 = Math.floor(hours / 5);
      this.inkRow2 = hours % 5;
      this.inkRow3 = Math.floor(minutes / 5);
      this.inkRow4 = minutes % 5;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
