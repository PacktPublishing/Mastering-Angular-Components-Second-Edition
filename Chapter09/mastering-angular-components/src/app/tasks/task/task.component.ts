import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output,
  ViewEncapsulation
} from '@angular/core';
import {Task} from '../../model';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  @Input() task: Task;
  @Output() outUpdateTask = new EventEmitter<Task>();
  @Output() outDeleteTask = new EventEmitter<Task>();
  @Output() outShowDetails = new EventEmitter<Task>();

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
  }

  updateTask(done: boolean) {
    this.outUpdateTask.emit({
      ...this.task,
      done,
      completed: done ? +new Date() : this.task.completed
    });
  }

  updateTitle(title: string) {
    this.outUpdateTask.emit({
      ...this.task,
      title
    });
  }

  deleteTask() {
    this.outDeleteTask.emit(this.task);
  }

  showDetails() {
    this.outShowDetails.emit(this.task);
  }
}
