import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostResponse } from '../post-response.payload';
import { PostService } from '../post.service';

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
  constructor(private route: ActivatedRoute, private postService: PostService) {
    const postId = this.route.snapshot.params['postId'];
    this.fetchPostData(postId);

    this.route.params.subscribe((params) => {
      const postId = params['postId'];
      this.fetchPostData(postId);
    });
  }

  ngOnInit(): void {}

  fetchPostData(postId) {
    this.postService.fetchPostById(postId).subscribe((post: PostResponse) => {
      this.post = post;
    });
  }
}
