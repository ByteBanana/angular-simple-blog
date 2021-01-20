import { Component, OnInit } from '@angular/core';
import { PostResponse } from '../../models/post-response.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Array<PostResponse> = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.fetchAllPost().subscribe((data) => {
      this.posts = data;
    });
  }
}
