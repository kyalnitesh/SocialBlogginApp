import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { AuthComponent } from './auth/auth.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleResolverService } from './shared/article-resolver.service';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: AuthComponent},
    {path: 'articles', component: ArticlesComponent },
    {path: 'article/:id/details', component: ArticleDetailComponent, resolve: [ArticleResolverService] },
    {path: 'editor/new', component: ArticleEditComponent, canActivate: [AuthGuard]},
    {path: 'editor/:id/edit', component: ArticleEditComponent, resolve: [ArticleResolverService], canActivate: [AuthGuard]},
    {path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
