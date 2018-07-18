import {Component, ViewEncapsulation} from '@angular/core';
import {TaskService} from './tasks/task.service';
import {UserService} from './user/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Project, Task, User} from './model';
import {ProjectService} from './project/project.service';

@Component({
  selector: 'mac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  openTasksCount: Observable<number>;
  user: Observable<User>;
  projects: Observable<Project[]>;

  constructor(taskListService: TaskService,
              userService: UserService,
              private projectService: ProjectService) {
    this.openTasksCount = taskListService.getTasks()
      .pipe(
        map((tasks: Task[]) => {
          return tasks
            .filter((task) => !task.done)
            .length;
        })
      );
    this.projects = projectService.getProjects();
    this.user = userService.getCurrentUser();
  }

  trackByProjectId(index: number, project: Project) {
    return project.id;
  }
}
