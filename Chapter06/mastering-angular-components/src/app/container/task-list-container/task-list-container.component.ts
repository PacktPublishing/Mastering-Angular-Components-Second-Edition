import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../tasks/task.service';
import {Project, Task, TaskListFilterType} from '../../model';
import {Observable, combineLatest, BehaviorSubject} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {ProjectService} from '../../project/project.service';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../../activities/activities.service';
import {limitWithEllipsis} from '../../utilities/string-utilities';

@Component({
  selector: 'mac-task-list-container',
  templateUrl: './task-list-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent {
  selectedProject: Observable<Project>;
  tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  taskFilterTypes: TaskListFilterType[] = ['all', 'open', 'done'];
  activeTaskFilterType = new BehaviorSubject<TaskListFilterType>('all');

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private activitiesService: ActivitiesService) {
    this.selectedProject = combineLatest(
      projectService.getProjects(),
      route.parent.params
    ).pipe(
      map(([projects, routeParams]) =>
        projects.find((project) => project.id === +routeParams.projectId)
      )
    );

    this.tasks = this.selectedProject.pipe(
      switchMap((project) => this.taskService.getProjectTasks(project.id))
    );

    this.filteredTasks = combineLatest(this.tasks, this.activeTaskFilterType)
      .pipe(
        map(([tasks, activeTaskFilterType]) => {
          return tasks.filter((task: Task) => {
            if (activeTaskFilterType === 'all') {
              return true;
            } else if (activeTaskFilterType === 'open') {
              return !task.done;
            } else {
              return task.done;
            }
          });
        })
      );
  }

  activateFilterType(type: TaskListFilterType) {
    this.activeTaskFilterType.next(type);
  }

  addTask(title: string) {
    this.selectedProject
      .pipe(
        take(1)
      )
      .subscribe((project) => {
        const task: Task = {
          projectId: project.id, title, done: false
        };
        this.taskService.addTask(task);
        this.activitiesService.logProjectActivity(
          project.id,
          'tasks',
          'A task was added',
          `A new task "${limitWithEllipsis(title, 30)}" was added to #project-${project.id}.`
        );
      });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.activitiesService.logProjectActivity(
      task.projectId,
      'tasks',
      'A task was updated',
      `The task "${limitWithEllipsis(task.title, 30)}" was updated on #project-${task.projectId}.`
    );
  }
}
