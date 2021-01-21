import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { CommentRequest } from 'src/app/models/comment-request.model';
import { CommentResponse } from 'src/app/models/comment-response.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment: CommentResponse;

  editCommentForm: FormGroup;
  editMode = false;
  previewComment = false;

  constructor(
    private localSt: LocalStorageService,
    private commentService: CommentService,
    private postService: PostService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.editCommentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onEditComment() {
    this.editMode = !this.editMode;
    this.editCommentForm.patchValue({
      comment: this.comment.message,
    });
  }

  onDeleteComment() {
    const modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.title = 'Confirm';
    modal.componentInstance.body = 'Do you really want to delete this comment?';
    modal.result.then((result) => {
      if (result) {
        this.commentService.deleteCommentById(this.comment.commentId).subscribe(
          () => {
            this.toastr.success('Comment deleted');
            this.postService.onFetchCommentsEvent.emit();
          },
          (err) => {
            this.toastr.error('Comment delete failed');
          }
        );
      }
    });
  }

  isCurrentUserOwnedComment(): boolean {
    return this.localSt.retrieve('username') === this.comment.username;
  }

  onPreviewComment(preview: boolean) {
    this.previewComment = preview;
  }

  onCancelComment() {
    this.editMode = false;
  }

  onUpdateComment(commentId: number, postId: number) {
    const message = this.editCommentForm.get('comment').value;
    const commentRequest: CommentRequest = {
      message,
      postId,
    };
    this.commentService.updateComment(commentId, commentRequest).subscribe(
      () => {
        this.toastr.success('Comment updated');
        this.editMode = false;
        this.loadPost(commentId);
      },
      (err) => {
        this.toastr.error('Commen update failed');
      }
    );
  }

  loadPost(commentId: number) {
    this.commentService.fetchByCommentId(commentId).subscribe((comment) => {
      this.comment = comment;
    });
  }
}
