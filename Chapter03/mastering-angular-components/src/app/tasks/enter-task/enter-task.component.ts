import {Component, Output, ViewEncapsulation, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'mac-enter-task',
  templateUrl: './enter-task.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterTaskComponent {
  @Output() outEnterTask = new EventEmitter<string>();

  enterTask(titleInput: HTMLInputElement) {
    this.outEnterTask.emit(titleInput.value);
    titleInput.value = '';
    titleInput.focus();
  }
}
