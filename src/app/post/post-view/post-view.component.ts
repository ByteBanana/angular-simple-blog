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
  post: PostResponse;
  htmlString = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['postId'];
    this.postService.fetchPostById(postId)
      this.postService.onFetchPostById.subscribe((post:PostResponse)=>{
        this.post = post;
    })
  }
}
