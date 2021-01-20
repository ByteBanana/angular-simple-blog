import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/post-response.model';
import { UserProfileRequest } from '../models/user-profile-request.model';
import { UserProfileResponse } from '../models/user-profile-response.model';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  constructor(private http: HttpClient) {}

  fetchMyProfile(): Observable<UserProfileResponse> {
    return this.http.post<UserProfileResponse>(
      'http://localhost:8080/api/me/profile',
      {}
    );
  }

  updateMyProfile(request: UserProfileRequest): Observable<any> {
    return this.http.put('http://localhost:8080/api/me/profile', request);
  }

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
