import {Injectable} from '@angular/core';
import {ProjectService} from '../project/project.service';
import {Project, Tag} from '../model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {limitWithEllipsis, replaceAll} from '../utilities/string-utilities';

@Injectable()
export class TagsService {
  tags: Observable<Tag[]>;

  constructor(private projectService: ProjectService) {
    this.tags = this.projectService.getProjects().pipe(
      map((projects: Project[]) => projects.map(project => ({
        type: 'project',
        hashTag: `#project-${project.id}`,
        title: limitWithEllipsis(project.title, 20),
        link: `/projects/${project.id}/tasks`
      })))
    );
  }

  parse(textContent: string): Observable<string> {
    const hashTags: string[] = textContent.match(/#[\w\/-]+/g);
    if (!hashTags) {
      return of(textContent);
    }

    return this.tags.pipe(
      map((tags: Tag[]) => {
        hashTags.forEach(hashTag => {
          const tag = tags.find(t => t.hashTag === hashTag);
          if (tag) {
            textContent = replaceAll(
              textContent,
              hashTag,
              `<a class="tag tag-${tag.type}" href="${tag.link}">${tag.title}</a>`
            );
          }
        });
        return textContent;
      })
    );
  }
}
