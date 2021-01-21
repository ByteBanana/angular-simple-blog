import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { PostResponse } from 'src/app/models/post-response.model';
import { PostService } from 'src/app/services/post.service';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-my-published-posts',
  templateUrl: './my-published-posts.component.html',
  styleUrls: ['./my-published-posts.component.scss'],
})
export class MyPublishedPostsComponent implements OnInit {
  publishedPosts: PostResponse[] = [];
  deletePostSubscription: Subscription = null;

  constructor(
    private meService: MeService,
    private modalService: NgbModal,
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPublishedPosts();
  }

  loadPublishedPosts() {
    this.meService.fetchMyPublishedPost().subscribe((data: PostResponse[]) => {
      this.publishedPosts = data;
    });
  }

  onDeletePost(postId: number) {
    const modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.title = 'Confirm';
    modal.componentInstance.body = 'Do you really want to delete this post?';
    modal.result.then((result) => {
      this.deletePostSubscription = this.postService
        .deletePost(postId)
        .subscribe(
          () => {
            this.toastr.success('Post deleted');
            this.loadPublishedPosts();
          },
          (err) => {
            this.toastr.error('Something went wrong!');
          }
        );
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    if (this.deletePostSubscription !== null) {
      this.deletePostSubscription.unsubscribe();
    }
  }
}
