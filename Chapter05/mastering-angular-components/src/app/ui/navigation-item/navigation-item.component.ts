import {
  ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mac-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() title: string;
  @Input() navId: any;
  @Output() outActivateNavigationItem = new EventEmitter<any>();

  @HostListener('click')
  activateNavigationItem() {
    this.outActivateNavigationItem.emit(this.navId);
  }
}
