import {Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation} from '@angular/core';
import {Task} from '../../model';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent {
  // Our task model can be attached on the host within the view
  @Input() task: Task;
  @Output() outUpdateTask = new EventEmitter<Task>();

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
  }

  updateTask(done: boolean) {
    this.outUpdateTask.emit({
      ...this.task,
      done
    });
  }
}
