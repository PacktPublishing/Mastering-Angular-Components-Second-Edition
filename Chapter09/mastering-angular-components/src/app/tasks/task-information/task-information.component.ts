import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Task} from '../../model';

@Component({
  selector: 'mac-task-information',
  templateUrl: './task-information.component.html',
  styleUrls: ['./task-information.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskInformationComponent {
  @Input() task: Task;
}
