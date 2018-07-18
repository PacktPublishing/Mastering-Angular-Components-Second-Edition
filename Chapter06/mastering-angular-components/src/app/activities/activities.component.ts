import {Component, Input, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';
import {Activity, ActivitySliderSelection} from '../model';

@Component({
  selector: 'mac-activities',
  templateUrl: './activities.component.html',
  styleUrls:  ['./activities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
  @Input() activities: Activity[];
  @Input() selectedActivities: Activity[];
  @Output() outSelectionChange = new EventEmitter<ActivitySliderSelection>();

  selectionChange(selection: ActivitySliderSelection) {
    this.outSelectionChange.emit(selection);
  }
}
