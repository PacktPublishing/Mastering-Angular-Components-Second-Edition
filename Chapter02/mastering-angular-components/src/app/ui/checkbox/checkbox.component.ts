import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

@Component({
  selector: 'mac-checkbox',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent {
  @Input() label: string;
  @Input() checked: boolean;
  @Output() outCheck = new EventEmitter<boolean>();

  check(checked: boolean) {
    this.outCheck.emit(checked);
  }
}
