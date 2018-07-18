import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import {User} from '../../model';

@Component({
  selector: 'mac-user-area',
  templateUrl: './user-area.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAreaComponent {
  @Input() user: User;
  @Input() openTasksCount: number;
}
