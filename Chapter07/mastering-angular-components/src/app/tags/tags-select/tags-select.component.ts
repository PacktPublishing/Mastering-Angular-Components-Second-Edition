import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output} from '@angular/core';
import {HashTagInput, Tag, TagSelection} from '../../model';

const tagListLimit = 4;

@Component({
  selector: 'mac-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsSelectComponent implements OnChanges {
  @Input() tags: Tag[];
  @Input() hashTagInput: HashTagInput | null;
  @Output() outSelectTag = new EventEmitter<TagSelection>();

  filteredTags: Tag[];

  @HostBinding('style.display')
  get hasFilteredTags() {
    return this.filteredTags && this.filteredTags.length > 0 ? 'block' : 'none';
  }

  @HostBinding('style.top')
  get topPosition() {
    return this.hashTagInput && this.hashTagInput.position ?
      `${this.hashTagInput.position.top}px` : 0;
  }

  @HostBinding('style.left')
  get leftPosition() {
    return this.hashTagInput && this.hashTagInput.position ?
      `${this.hashTagInput.position.left}px` : 0;
  }

  filterTags() {
    const filter = this.hashTagInput.hashTag.slice(1).toLowerCase();
    this.filteredTags = this.tags
      .filter(tag =>
        tag.hashTag.toLowerCase().includes(filter) ||
        tag.title.toLowerCase().includes(filter)
      )
      .slice(0, tagListLimit);
  }

  selectTag(tag: Tag) {
    this.outSelectTag.next({
      tag,
      hashTagInput: this.hashTagInput
    });
  }

  ngOnChanges(changes) {
    if ((changes.hashTagInput || changes.tags) && this.hashTagInput) {
      this.filterTags();
    }
  }
}
