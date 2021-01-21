import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { PostResponse } from 'src/app/models/post-response.model';
import { PostService } from 'src/app/services/post.service';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-my-draft-posts',
  templateUrl: './my-draft-posts.component.html',
  styleUrls: ['./my-draft-posts.component.scss'],
})
export class MyDraftPostsComponent implements OnInit {
  draftPosts: PostResponse[] = [];
  deletePostSubscription: Subscription;

  constructor(
    private meService: MeService,
    private modalService: NgbModal,
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDraftPosts();
  }

  loadDraftPosts() {
    this.meService.fetchMyDraftPost().subscribe((data) => {
      this.draftPosts = data;
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
            this.loadDraftPosts();
          },
          (err) => {
            this.toastr.error('Something went wrong!');
          }
        );
    });
  }
}
