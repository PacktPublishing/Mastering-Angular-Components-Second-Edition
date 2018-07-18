import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ProjectService} from '../project/project.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ProjectContainerGuard implements CanActivate {
  constructor(private projectService: ProjectService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot) {
    return this.projectService.getProjects()
      .pipe(
        map(projects => {
          const projectExists = !!projects.find(project => project.id === +next.params.projectId);
          if (!projectExists) {
            this.router.navigate(['/projects', projects[0].id]);
          }
          return projectExists;
        })
      );
  }
}
