import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../post/post-response.payload';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  constructor(private http: HttpClient) {}

  fetchMyDraftPost(): Observable<any> {
    return this.http.post<PostResponse[]>(
      'http://localhost:8080/api/me/draft',
      {}
    );
  }
  fetchMyPublishedPost(): Observable<any> {
    return this.http.post<PostResponse[]>(
      'http://localhost:8080/api/me/published',
      {}
    );
  }
}
