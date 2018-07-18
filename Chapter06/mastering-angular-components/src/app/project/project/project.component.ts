import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Project, Tab} from '../../model';

@Component({
  selector: 'mac-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  @Input() project: Project;
  @Input() tabs: Tab[];
  @Input() activeTab: Tab;
  @Output() outActivateTab = new EventEmitter<Tab>();
  @Output() outUpdateProject = new EventEmitter<Project>();

  activateTab(tab: Tab) {
    this.outActivateTab.emit(tab);
  }

  updateTitle(title: string) {
    this.outUpdateProject.emit({
      ...this.project,
      title
    });
  }

  updateDescription(description: string) {
    this.outUpdateProject.emit({
      ...this.project,
      description
    });
  }
}
