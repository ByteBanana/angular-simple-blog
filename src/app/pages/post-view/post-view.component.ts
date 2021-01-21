import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentRequest } from 'src/app/models/comment-request.model';
import { CommentResponse } from 'src/app/models/comment-response.model';
import { PostResponse } from '../../models/post-response.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit {
  post: PostResponse = {
    title: '',
    subTitle: '',
    content: '',
    createDate: null,
    lastUpdateDate: null,
    username: '',
    postId: 0,
  };

  comments: CommentResponse[] = [];

  previewComment = false;

  commentForm: FormGroup;

  commenting = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    const postId = this.route.snapshot.params['postId'];
    this.fetchPostData(postId);

    this.route.params.subscribe((params) => {
      const postId = params['postId'];
      this.fetchPostData(postId);
      this.fetchComment(postId);
    });

    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
    });

    this.postService.onFetchCommentsEvent.subscribe(() => {
      this.fetchComment(postId);
    });
  }

  ngOnInit(): void {}

  fetchPostData(postId) {
    this.postService.fetchPostById(postId).subscribe((post: PostResponse) => {
      this.post = post;
    });
  }

  fetchComment(postId) {
    this.postService.fetchCommentsByPostId(postId).subscribe(
      (comments: CommentResponse[]) => {
        this.comments = comments;
        console.log(comments);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSetPreviewMode(isPreview: boolean) {
    this.previewComment = isPreview;
  }
  onCommentPost(postId: number) {
    if (this.commentForm.invalid) {
      return;
    }
    this.commenting = true;
    const commentRequest: CommentRequest = {
      message: this.commentForm.get('comment').value,
      postId: postId,
    };
    this.commentForm.patchValue({
      comment: '',
    });

    this.postService.commentPost(postId, commentRequest).subscribe(
      () => {
        this.toastr.success('Comment added');
        this.fetchComment(postId);
      },
      (err) => {
        this.toastr.error('Failed to add comment');
      },
      () => {
        this.commenting = false;
      }
    );
  }
}
