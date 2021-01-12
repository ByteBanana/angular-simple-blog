import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { PostRequest } from '../post-request.payload';
import { PostService } from '../post.service';

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
  constructor(private postService: PostService) {
    this.newPostForm = new FormGroup({
      title: new FormControl('',Validators.required),
    });
  }
  ngOnInit(): void {}

  addBindingCreated(quill) {
    this.quill = quill;
    console.log(quill);
  }
  onContentChanged(event) {
    this.content = event.html;
  }

  onPublish() {
    const postRequest: PostRequest = {
      title: this.newPostForm.get('title').value,
      content: this.content,
    };
    this.postService.publish(postRequest);
  }
}
