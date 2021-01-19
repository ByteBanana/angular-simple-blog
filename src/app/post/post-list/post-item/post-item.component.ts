import { Component, Input, OnInit } from '@angular/core';
import { PostRequest } from '../../post-request.payload';
import { PostResponse } from '../../post-response.payload';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post: PostResponse;

  constructor() {}

  ngOnInit(): void {
  }

}
