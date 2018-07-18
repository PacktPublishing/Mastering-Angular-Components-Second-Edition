import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {Observable, combineLatest, BehaviorSubject} from 'rxjs';
import {Activity, ActivitySliderSelection} from '../../model';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../../activities/activities.service';

@Component({
  selector: 'mac-project-activities-container',
  templateUrl: './project-activities-container.component.html',
  styleUrls: ['./project-activities-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectActivitiesContainerComponent {
  activities: Observable<Activity[]>;
  selection = new BehaviorSubject<ActivitySliderSelection | null>(null);
  selectedActivities: Observable<Activity[]>;

  constructor(private projectService: ProjectService,
              private activitiesService: ActivitiesService,
              private route: ActivatedRoute) {
    this.activities = combineLatest(
      this.activitiesService.getActivities(),
      route.parent.params
    ).pipe(
      map(([activities, routeParams]) =>
        activities
          .filter(activity => activity.kind === 'project' &&
            activity.projectId === +routeParams.projectId)
      )
    );

    this.selectedActivities = combineLatest(
      this.activities,
      this.selection
    ).pipe(
      map(([activities, selection]) => {
        if (selection) {
          return activities.filter(
            (activity) => activity.time >= selection.start && activity.time <= selection.end
          );
        } else {
          return activities;
        }
      })
    );
  }

  selectionChange(selection: ActivitySliderSelection) {
    this.selection.next(selection);
  }
}
