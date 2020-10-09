import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './layout/default/default.component';
import { HomeComponent } from './view/components/home/home.component';
import { ContactComponent } from './view/components/contact/contact.component';
import { PageNotFoundComponent } from './view/components/page-not-found/page-not-found.component';
import { CategoryListComponent } from './view/components/category/category-list/category-list.component';
import { ProductListComponent } from './view/components/product/product-list/product-list.component';
import { ProductCreateComponent } from './view/components/product/product-create/product-create.component';
import { LoginComponent } from './view/components/user/login/login.component';
import { ClendarComponent } from './view/components/clendar/clendar.component';
import { UserListComponent } from './view/components/user/user-list/user-list.component';
import { UserEditComponent } from './view/components/user/user-edit/user-edit.component';
import { ProductEditComponent } from './view/components/product/product-edit/product-edit.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DefaultComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'category',
        component: CategoryListComponent,
      },
      {
        path: 'product',
        component: ProductListComponent,
      },
      {
        path: 'product-create',
        component: ProductCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'calendar',
        component: ClendarComponent,
      },
      {
        path: 'user',
        component: UserListComponent,
      },
      {
        path: 'user-edit/:id',
        component: UserEditComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ],

  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
