import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/post/post-response.payload';
import { MeService } from '../me.service';

@Component({
  selector: 'app-my-draft-posts',
  templateUrl: './my-draft-posts.component.html',
  styleUrls: ['./my-draft-posts.component.scss'],
})
export class MyDraftPostsComponent implements OnInit {
  draftPosts: PostResponse[] = [];
  constructor(private meService: MeService) {}

  ngOnInit(): void {
    this.meService.fetchMyDraftPost().subscribe((data) => {
      this.draftPosts = data;
    });
  }
}
