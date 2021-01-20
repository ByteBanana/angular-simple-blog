import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from '../../models/post-request.payload';
import { PostResponse } from '../../models/post-response.payload';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup;
  content = '';
  froalaEditor;
  quill;
  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.newPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subTitle: new FormControl(''),
      content: new FormControl('', Validators.required),
    });

    this.postService.onPublishPostEvent.subscribe((published: boolean) => {
      if (this.newPostForm.invalid) {
        if (this.newPostForm.get('content').errors) {
          if (this.newPostForm.get('content').errors.required) {
            toastr.error('Content  is required.');
          }
        }
        if (this.newPostForm.get('title').errors) {
          if (this.newPostForm.get('title').errors.required) {
            toastr.error('Title is required.');
          }
        }
        return;
      }
      const postRequest: PostRequest = {
        title: this.newPostForm.get('title').value,
        subTitle: this.newPostForm.get('subTitle').value,
        content: this.content,
        published: published,
      };
      this.postService.publish(postRequest).subscribe(
        (post: PostResponse) => {
          toastr.success('Post created!');
          if (published) {
            router.navigate(['/post', post.postId]);
          } else {
            router.navigate(['/me/posts/draft']);
          }
        },
        (error) => {
          toastr.error('Something went wrong');
        }
      );
    });
  }
  ngOnInit(): void {}

  addBindingCreated(quill) {
    this.quill = quill;
  }
  onContentChanged(event) {
    this.content = event.html;
  }
}
