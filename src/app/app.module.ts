import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPostComponent } from './post/new-post/new-post.component';
import { QuillModule } from 'ngx-quill';

import 'quill-emoji/dist/quill-emoji.js';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostItemComponent } from './post/post-list/post-item/post-item.component';
import { PostViewComponent } from './post/post-view/post-view.component';
import { TokenInterceptor } from './token.interceptor';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { MyDraftPostsComponent } from './me/my-draft-posts/my-draft-posts.component';
import { MyPublishedPostsComponent } from './me/my-published-posts/my-published-posts.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
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
