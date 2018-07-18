import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {Project, ProjectSummary} from '../../model';

@Component({
  selector: 'mac-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProjectsDashboardComponent {
  @Input() projectSummaries: ProjectSummary[];
  @Output() outActivateProject = new EventEmitter<Project>();

  activateProject(project: Project) {
    this.outActivateProject.emit(project);
  }
}
