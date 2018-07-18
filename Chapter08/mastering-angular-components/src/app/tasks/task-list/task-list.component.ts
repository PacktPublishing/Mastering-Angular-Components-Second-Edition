import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Task, TaskListFilterType} from '../../model';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() taskFilterTypes: TaskListFilterType[];
  @Input() activeTaskFilterType: TaskListFilterType;
  @Input() tasks: Task[];
  @Output() outAddTask = new EventEmitter<string>();
  @Output() outActivateFilterType = new EventEmitter<TaskListFilterType>();
  @Output() outUpdateTask = new EventEmitter<Task>();
  @Output() outDeleteTask = new EventEmitter<Task>();
  @Output() outShowDetails = new EventEmitter<Task>();

  addTask(title: string) {
    this.outAddTask.emit(title);
  }

  activateFilterType(type: TaskListFilterType) {
    this.outActivateFilterType.emit(type);
  }

  updateTask(task: Task) {
    this.outUpdateTask.emit(task);
  }

  dropTask(target: Task, source: Task) {
    if (target.id === source.id) {
      return;
    }

    this.outUpdateTask.emit({
      ...target,
      order: source.order
    });
    this.outUpdateTask.emit({
      ...source,
      order: target.order
    });
  }

  deleteTask(task: Task) {
    this.outDeleteTask.emit(task);
  }

  showDetails(task: Task) {
    this.outShowDetails.emit(task);
  }
}
