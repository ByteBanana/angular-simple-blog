import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { QuillModule } from 'ngx-quill';

import 'quill-emoji/dist/quill-emoji.js';
import { HomeComponent } from './pages/home/home.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { MyDraftPostsComponent } from './pages/my-draft-posts/my-draft-posts.component';
import { MyPublishedPostsComponent } from './pages/my-published-posts/my-published-posts.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    NewPostComponent,
    HomeComponent,
    PostListComponent,
    PostItemComponent,
    PostViewComponent,
    MyDraftPostsComponent,
    MyPublishedPostsComponent,
    EditPostComponent,
    MyProfileComponent,
    ConfirmModalComponent,
    CommentCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    QuillModule.forRoot({
      modules: {
        'emoji-shortname': true,
        'emoji-textarea': true,
        'emoji-toolbar': true,
      },
    }),
    NgxBootstrapIconsModule.pick(allIcons),
    NgbDropdownModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
