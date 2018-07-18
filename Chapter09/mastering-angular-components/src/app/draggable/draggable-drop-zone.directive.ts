import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {DraggableType} from '../model';

@Directive({
  selector: '[macDraggableDropZone]'
})
export class DraggableDropZoneDirective {
  @Input() dropAcceptType: DraggableType;
  @Output() outDropDraggable = new EventEmitter<any>();
  @HostBinding('class.over') over = false;

  dragEnterCount = 0;

  private typeIsAccepted(event: DragEvent) {
    const draggableType = Array.from(event.dataTransfer.types).find((key) =>
      key.indexOf('draggable-type') === 0);
    return draggableType && draggableType.split(':')[1] === this.dropAcceptType;
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  }

  @HostListener('drop', ['$event'])
  drop(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      const data = JSON.parse(event.dataTransfer.getData('application/json'));
      this.over = false;
      this.dragEnterCount = 0;
      this.outDropDraggable.next(data);
    }
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event: DragEvent) {
    if (this.typeIsAccepted(event)) {
      this.over = true;
      this.dragEnterCount++;
    }
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event: DragEvent) {
    if (this.typeIsAccepted(event) && --this.dragEnterCount === 0) {
      this.over = false;
    }
  }
}
