import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/models/post-response.payload';
import { MeService } from '../../services/me.service';

@Component({
  selector: 'app-my-published-posts',
  templateUrl: './my-published-posts.component.html',
  styleUrls: ['./my-published-posts.component.scss'],
})
export class MyPublishedPostsComponent implements OnInit {
  publishedPosts: PostResponse[] = [];
  constructor(private meService: MeService) {}

  ngOnInit(): void {
    this.meService.fetchMyPublishedPost().subscribe((data: PostResponse[]) => {
      this.publishedPosts = data;
    });
  }
}
