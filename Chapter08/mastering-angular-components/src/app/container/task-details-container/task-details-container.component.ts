import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../tasks/task.service';
import {Observable, combineLatest} from 'rxjs';
import {Tag, Task} from '../../model';
import {map} from 'rxjs/operators';
import {TagsService} from '../../tags/tags.service';

@Component({
  selector: 'mac-task-details-container',
  templateUrl: './task-details-container.component.html',
  styleUrls: ['./task-details-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsContainerComponent {
  task: Observable<Task>;
  tags: Observable<Tag[]>;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private tagsService: TagsService) {
    this.task = combineLatest(
      this.taskService.getTasks(),
      route.params
    ).pipe(
      map(([tasks, routeParams]) =>
        tasks.find((task) => task.id === +routeParams.taskId)
      )
    );
    this.tags = this.tagsService.tags;
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }
}
