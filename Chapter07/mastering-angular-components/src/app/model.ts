export interface Task {
  readonly id?: number;
  readonly projectId?: number;
  readonly title: string;
  readonly done: boolean;
  readonly order: number;
}

export type TaskListFilterType = 'all' | 'open' | 'done';

export interface Project {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly comments: Comment[];
}

export interface User {
  readonly id?: number;
  readonly name: string;
  readonly pictureUrl: string;
}

export interface Tab {
  readonly id: any;
  readonly title: string;
}

export interface Comment {
  readonly time: number;
  readonly user: User;
  readonly content: string;
}

export interface CommentUpdate {
  readonly index: number;
  readonly comment: Comment;
}

export type ActivityAlignment = 'left' | 'right';

export interface ActivitySliderSelection {
  start: number;
  end: number;
}

export interface ActivityBase {
  kind: string;
  id?: number;
  user: User;
  time: number;
  category: string;
  title: string;
  message: string;
}

export interface ProjectActivity extends ActivityBase {
  kind: 'project';
  projectId: number;
}

export type Activity = ProjectActivity;

export interface InputPosition {
  top: number;
  left: number;
  caretOffset: number;
}

export interface HashTagInput {
  hashTag: string;
  position: InputPosition;
}

export interface Tag {
  type: string;
  hashTag: string;
  title: string;
  link: string;
}

export interface TagSelection {
  tag: Tag;
  hashTagInput: HashTagInput;
}

export type DraggableType = 'task';
