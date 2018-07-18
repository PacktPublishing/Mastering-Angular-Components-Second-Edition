import {
  Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter
} from '@angular/core';
import {Comment, Tag, User} from '../../model';

@Component({
  selector: 'mac-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input() comment: Comment;
  @Input() user: User;
  @Input() tags: Tag[];
  @Output() outUpdateComment = new EventEmitter<Comment>();

  updateComment(content: string) {
    this.outUpdateComment.emit({
      ...this.comment,
      content
    });
  }
}
