import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { AuthGuard } from './guards/auth.guard';
import { MyDraftPostsComponent } from './pages/my-draft-posts/my-draft-posts.component';
import { MyPublishedPostsComponent } from './pages/my-published-posts/my-published-posts.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PermissionGuard } from './guards/permission.guard';

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
        canActivate: [AuthGuard, PermissionGuard],
      },
    ],
  },
  {
    path: 'me',
    children: [
      {
        path: 'profile',
        component: MyProfileComponent,
      },
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
