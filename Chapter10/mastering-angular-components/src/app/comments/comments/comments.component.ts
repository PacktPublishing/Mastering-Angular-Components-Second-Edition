import {
  Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output,
  EventEmitter, ViewChild, ElementRef
} from '@angular/core';
import {Comment, CommentUpdate, Tag, TagSelection, User} from '../../model';
import {TagsInputDirective} from '../../tags/tags-input.directive';
import {splice} from '../../utilities/string-utilities';

@Component({
  selector: 'mac-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Input() user: User;
  @Input() comments: Comment[];
  @Input() tags: Tag[];
  @Output() outUpdateComment = new EventEmitter<CommentUpdate>();
  @Output() outCreateComment = new EventEmitter<Comment>();
  @ViewChild('commentContentEditable') commentContentEditable: ElementRef;
  @ViewChild('commentContentEditable', {
    read: TagsInputDirective
  }) tagsInput: TagsInputDirective;

  createComment() {
    this.outCreateComment.emit({
      user: this.user,
      time: +new Date(),
      content: this.commentContentEditable.nativeElement.textContent
    });
    this.commentContentEditable.nativeElement.textContent = '';
  }

  updateComment(index: number, comment: Comment) {
    this.outUpdateComment.next({
      index,
      comment
    });
  }

  selectTag(tagSelection: TagSelection) {
    this.commentContentEditable.nativeElement.textContent =
      splice(
        this.commentContentEditable.nativeElement.textContent,
        tagSelection.hashTagInput.position.caretOffset,
        tagSelection.hashTagInput.hashTag.length,
        tagSelection.tag.hashTag
      );
    this.tagsInput.reset();
  }
}
