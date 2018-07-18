import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, Tab} from '../../model';
import {ProjectService} from '../../project/project.service';

@Component({
  selector: 'mac-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {
  selectedProject: Observable<Project>;
  tabs: Tab[] = [
    {id: 'tasks', title: 'Tasks'},
    {id: 'comments', title: 'Comments'},
    {id: 'activities', title: 'Activities'}
  ];
  activeTab: Tab = this.tabs[0];

  constructor(private projectService: ProjectService) {
    this.selectedProject = projectService.getSelectedProject();
  }

  activateTab(tab: Tab) {
    this.activeTab = tab;
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project);
  }
}
