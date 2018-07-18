import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener,
  Input, OnChanges, Output, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {Activity, ActivitySliderSelection} from '../../model';

@Component({
  selector: 'mac-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Native
})
export class ActivitySliderComponent implements OnChanges {
  @Input() activities: Activity[];
  @Output() outSelectionChange = new EventEmitter<ActivitySliderSelection>();
  padding = 20;
  timeFirst: number;
  timeLast: number;
  timeSpan: number;
  ticks: number[];
  selection: ActivitySliderSelection;
  modifySelection: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activities && this.activities) {
      if (this.activities.length === 1) {
        this.timeFirst = this.timeLast = this.activities[0].time;
      } else if (this.activities.length > 1) {
        this.timeFirst = this.activities[this.activities.length - 1].time;
        this.timeLast = this.activities[0].time;
      } else {
        this.timeFirst = this.timeLast = new Date().getTime();
      }

      this.timeSpan = Math.max(1, this.timeLast - this.timeFirst);
      this.computeTicks();

      this.selection = {
        start: this.timeFirst,
        end: this.timeLast
      };
      this.outSelectionChange.next(this.selection);
    }
  }

  computeTicks() {
    const count = 5;
    const timeSpanTick = this.timeSpan / count;
    this.ticks = Array.from({length: count}).map((element, index) => {
      return this.timeFirst + timeSpanTick * index;
    });
  }

  totalWidth() {
    return this.elementRef.nativeElement.clientWidth - this.padding * 2;
  }

  projectTime(time: number) {
    const position = this.padding +
      (time - this.timeFirst) / this.timeSpan * this.totalWidth();
    return position / this.elementRef.nativeElement.clientWidth * 100;
  }

  projectLength(length: number) {
    return this.timeFirst + (length - this.padding) / this.totalWidth() * this.timeSpan;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.selection.start = this.selection.end = this.projectLength(event.offsetX);
    this.outSelectionChange.next(this.selection);
    this.modifySelection = true;
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.modifySelection) {
      this.selection.end = Math.max(this.selection.start, this.projectLength(event.offsetX));
      this.outSelectionChange.next(this.selection);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.modifySelection = false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.modifySelection = false;
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    this.selection = {
      start: this.timeFirst,
      end: this.timeLast
    };
    this.outSelectionChange.next(this.selection);
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
