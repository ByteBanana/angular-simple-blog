import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { PostResponse } from '../../models/post-response.payload';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  showPublishButton = false;
  showUpdateButton = false;
  showUpdateSaveDraftButton = false;

  username = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        var url = event.url;
        this.showPublishButton = this.isNewPostUrl(url);
        this.showUpdateButton = this.isUpdatePostUrl(url);
        this.showUpdateSaveDraftButton = this.isUpdateDraftUrl(url);
      }
    });
  }
  onPublishPost(published: boolean) {
    this.postService.onPublishPostEvent.emit(published);
  }

  onUpdatePost(published: boolean) {
    this.postService.onUpdatePostEvent.emit(published);
  }

  isNewPostUrl(url: string): boolean {
    if (url === '/post/new') {
      return true;
    }
    return false;
  }

  isUpdatePostUrl(url: string): boolean {
    if (url.indexOf('?') !== -1) {
      url = url.substr(0, url.indexOf('?'));
    }
    if (url.startsWith('/post') && url.endsWith('/edit')) {
      return true;
    }
    return false;
  }

  isUpdateDraftUrl(url: string): boolean {
    if (this.isUpdatePostUrl(url)) {
      if (url.indexOf('?') !== -1) {
        var qryParam = url.substr(url.indexOf('?')).replace('?', '');
        console.log(url.substr(url.indexOf('?')));
        var jsonStr = '{"' + qryParam.replace('=', '":') + '}';
        console.log(jsonStr);
        const json = JSON.parse(jsonStr);

        return json.draft;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
