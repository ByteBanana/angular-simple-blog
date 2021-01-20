import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private postService: PostService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const postId = route.params['postId'];

    const promise = new Promise<boolean>((resolve, reject) => {
      this.postService
        .checkPermiss(postId)
        .toPromise()
        .then(
          () => {
            resolve(true);
          },
          (err) => {
            resolve(false);
            this.router.navigate(['/post', postId]);
          }
        );
    });

    return promise;
  }
}
