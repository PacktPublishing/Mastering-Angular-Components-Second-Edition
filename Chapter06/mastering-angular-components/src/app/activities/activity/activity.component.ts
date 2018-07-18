import {Component, Input, HostBinding, ChangeDetectionStrategy} from '@angular/core';
import {Activity, ActivityAlignment} from '../../model';

@Component({
  selector: 'mac-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent {
  @Input() activity: Activity;
  @Input() alignment: ActivityAlignment;
  @Input() @HostBinding('class.start-mark') startMark;
  @Input() @HostBinding('class.end-mark') endMark;

  isAlignedRight() {
    return this.alignment === 'right';
  }
}
