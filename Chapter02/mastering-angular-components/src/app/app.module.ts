import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TaskService} from './tasks/task.service';

import {AppComponent} from './app.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskComponent} from './tasks/task/task.component';
import {EnterTaskComponent} from './tasks/enter-task/enter-task.component';
import {CheckboxComponent} from './ui/checkbox/checkbox.component';
import {ToggleComponent} from './ui/toggle/toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    EnterTaskComponent,
    CheckboxComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
