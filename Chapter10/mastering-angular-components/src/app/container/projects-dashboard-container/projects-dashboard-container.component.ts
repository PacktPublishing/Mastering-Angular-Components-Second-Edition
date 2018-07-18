import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {Observable, combineLatest} from 'rxjs';
import {Project, ProjectSummary} from '../../model';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActivitiesService} from '../../activities/activities.service';
import {TaskService} from '../../tasks/task.service';
import {limitWithEllipsis} from '../../utilities/string-utilities';

@Component({
  selector: 'mac-projects-dashboard-container',
  templateUrl: './projects-dashboard-container.component.html',
  styleUrls: ['./projects-dashboard-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsDashboardContainerComponent {
  projectSummaries: Observable<ProjectSummary[]>;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private activitiesService: ActivitiesService,
              private router: Router) {
    this.projectSummaries = combineLatest(
      this.projectService.getProjects(),
      this.taskService.getTasks(),
      this.activitiesService.getActivities()
    ).pipe(
      map(([projects, tasks, activities]) =>
        projects
          .map(project => ({
            project,
            description: limitWithEllipsis(project.description, 100),
            tasks: tasks.filter(task => task.projectId === project.id),
            activities: activities.filter(activity => activity.projectId === project.id)
          }))
      )
    );
  }

  activateProject(project: Project) {
    this.router.navigate(['/projects', project.id]);
  }
}
