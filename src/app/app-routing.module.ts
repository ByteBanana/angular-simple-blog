import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PostViewComponent } from './post/post-view/post-view.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AuthGuard } from './auth/auth.guard';
import { MyDraftPostsComponent } from './me/my-draft-posts/my-draft-posts.component';
import { MyPublishedPostsComponent } from './me/my-published-posts/my-published-posts.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'post',
    children: [
      { path: 'new', component: NewPostComponent, canActivate: [AuthGuard] },
      {
        path: ':postId',
        component: PostViewComponent,
      },
      {
        path: ':postId/edit',
        component: EditPostComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'me',
    children: [
      {
        path: 'posts/draft',
        component: MyDraftPostsComponent,
      },
      {
        path: 'posts/published',
        component: MyPublishedPostsComponent,
      },
      {
        path: 'posts',
        redirectTo: '/me/posts/draft',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: '/me/posts/draft',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
