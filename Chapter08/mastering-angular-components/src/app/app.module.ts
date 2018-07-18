import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {Database} from './database';

import {TaskService} from './tasks/task.service';

import {AppComponent} from './app.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskComponent} from './tasks/task/task.component';
import {EnterTaskComponent} from './tasks/enter-task/enter-task.component';
import {CheckboxComponent} from './ui/checkbox/checkbox.component';
import {ToggleComponent} from './ui/toggle/toggle.component';
import {TaskListContainerComponent} from './container/task-list-container/task-list-container.component';
import {ProjectContainerComponent} from './container/project-container/project-container.component';
import {ProjectComponent} from './project/project/project.component';
import {TabsComponent} from './ui/tabs/tabs.component';
import {NavigationComponent} from './ui/navigation/navigation.component';
import {NavigationSectionComponent} from './ui/navigation-section/navigation-section.component';
import {NavigationItemComponent} from './ui/navigation-item/navigation-item.component';
import {EditorComponent} from './ui/editor/editor.component';
import {UserAreaComponent} from './user/user-area/user-area.component';
import {UserService} from './user/user.service';
import {ProjectService} from './project/project.service';
import {FromNowPipe} from './pipes/from-now.pipe';
import {CommentComponent} from './comments/comment/comment.component';
import {ProfilePictureComponent} from './user/profile-picture/profile-picture.component';
import {CommentsComponent} from './comments/comments/comments.component';
import {ProjectCommentsContainerComponent} from './container/project-comments-container/project-comments-container.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ProjectContainerGuard} from './guards/project-container.guard';
import {ActivityComponent} from './activities/activity/activity.component';
import {ActivitySliderComponent} from './activities/activity-slider/activity-slider.component';
import {ActivitiesComponent} from './activities/activities.component';
import {ActivitiesService} from './activities/activities.service';
import {ProjectActivitiesContainerComponent} from './container/project-activities-container/project-activities-container.component';
import {CalendarTimePipe} from './pipes/calendar-time.pipe';
import {TagsSelectComponent} from './tags/tags-select/tags-select.component';
import {TagsService} from './tags/tags.service';
import {TagsInputDirective} from './tags/tags-input.directive';
import {TagsPipe} from './pipes/tags.pipe';
import {DraggableDirective} from './draggable/draggable.directive';
import {DraggableDropZoneDirective} from './draggable/draggable-drop-zone.directive';
import {TaskDetailsContainerComponent} from './container/task-details-container/task-details-container.component';
import {TaskDetailsComponent} from './tasks/task-details/task-details.component';
import {FormatDurationPipe} from './pipes/format-duration.pipe';
import {DurationComponent} from './ui/duration/duration.component';
import {EffortsComponent} from './efforts/efforts/efforts.component';
import {EffortsTimelineComponent} from './efforts/efforts-timeline/efforts-timeline.component';
import {FormatEffortsPipe} from './pipes/format-effort.pipe';
import {TaskInformationComponent} from './tasks/task-information/task-information.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    EnterTaskComponent,
    CheckboxComponent,
    ToggleComponent,
    TaskListContainerComponent,
    ProjectContainerComponent,
    ProjectComponent,
    TabsComponent,
    NavigationComponent,
    NavigationSectionComponent,
    NavigationItemComponent,
    EditorComponent,
    UserAreaComponent,
    FromNowPipe,
    CommentComponent,
    ProfilePictureComponent,
    CommentsComponent,
    ProjectCommentsContainerComponent,
    ActivityComponent,
    ActivitySliderComponent,
    ActivitiesComponent,
    ProjectActivitiesContainerComponent,
    CalendarTimePipe,
    TagsSelectComponent,
    TagsInputDirective,
    TagsPipe,
    DraggableDirective,
    DraggableDropZoneDirective,
    TaskDetailsContainerComponent,
    TaskDetailsComponent,
    FormatDurationPipe,
    DurationComponent,
    EffortsComponent,
    FormatEffortsPipe,
    TaskInformationComponent,
    EffortsTimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(Database, {
      delay: 0
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [TaskService, UserService, ProjectService, ProjectContainerGuard, ActivitiesService, TagsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
