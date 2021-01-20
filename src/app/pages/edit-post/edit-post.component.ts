import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from '../../models/post-request.model';
import { PostResponse } from '../../models/post-response.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;

  @ViewChild('editor', {
    static: true,
  })
  editor: QuillEditorComponent;

  content = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.editPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subTitle: new FormControl(''),
      content: new FormControl('', Validators.required),
    });

    this.postService.onUpdatePostEvent.subscribe((published: boolean) => {
      if (this.editPostForm.invalid) {
        if (this.editPostForm.get('content').errors) {
          if (this.editPostForm.get('content').errors.required) {
            toastr.error('Content  is required.');
          }
        }
        if (this.editPostForm.get('title').errors) {
          if (this.editPostForm.get('title').errors.required) {
            toastr.error('Title is required.');
          }
        }
        return;
      }

      const postRequest: PostRequest = {
        title: this.editPostForm.get('title').value,
        subTitle: this.editPostForm.get('subTitle').value,
        content: this.content,
        published: published,
      };
      const postId = this.route.snapshot.params['postId'];
      this.postService.updatePost(postId, postRequest).subscribe(
        (post: PostResponse) => {
          toastr.success('Post updated');
          if (published) {
            this.router.navigate(['/post/', post.postId]);
          } else {
            this.router.navigate(['/me', 'posts', 'draft']);
          }
        },
        (err) => {
          toastr.error('Something went wrong!');
        }
      );
    });
  }

  ngOnInit(): void {}

  loadPostData(postId: number) {
    this.postService.fetchPostById(postId).subscribe((post: PostResponse) => {
      this.editPostForm.get('title').setValue(post.title);
      this.editPostForm.patchValue({
        subTitle: post.subTitle !== undefined ? post.subTitle.trim() : '',
        content: post.content,
      });
      this.content = post.content;
    });
  }

  addBindingCreated(quill) {
    const postId = this.route.snapshot.params['postId'];
    this.loadPostData(postId);
  }

  onContentChanged(event) {
    this.content = event.html;
  }
}
