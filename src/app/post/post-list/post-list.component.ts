import { Component, OnInit } from '@angular/core';
import { PostResponse } from '../post-response.payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Array<PostResponse>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.fetchAllPost();
    this.postService.onFetchPosts.subscribe((data) => {
      this.posts = data;
    });

  }
}
