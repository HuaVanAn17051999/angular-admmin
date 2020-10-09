import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';

import { HomeComponent } from 'src/app/view/components/home/home.component';
import { ContactComponent } from 'src/app/view/components/contact/contact.component';
import { DefaultComponent } from './default.component';
import { PageNotFoundComponent } from 'src/app/view/components/page-not-found/page-not-found.component';
import { ProductCreateComponent } from 'src/app/view/components/product/product-create/product-create.component';
import { ProductDetailComponent } from 'src/app/view/components/product/product-detail/product-detail.component';
import { ProductListComponent } from 'src/app/view/components/product/product-list/product-list.component';
import { CategoryListComponent } from 'src/app/view/components/category/category-list/category-list.component';
import { ClendarComponent } from 'src/app/view/components/clendar/clendar.component';
import { CategoryCreateComponent } from 'src/app/view/components/category/category-create/category-create.component';
import { UserListComponent } from 'src/app/view/components/user/user-list/user-list.component';
import { ProductEditComponent } from 'src/app/view/components/product/product-edit/product-edit.component';

import { ErrordialogComponent } from 'src/app/view/components/errordialog/errordialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from 'src/app/view/components/user/user-edit/user-edit.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
     HomeComponent,
     ContactComponent,
     DefaultComponent,
     PageNotFoundComponent,
     ProductCreateComponent,
     ProductDetailComponent,
     ProductListComponent,
     CategoryListComponent,
     ClendarComponent,
     CategoryCreateComponent,
     UserListComponent,
     UserEditComponent,
     ProductEditComponent,
     ErrordialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule ,
    ToastrModule.forRoot(),
    MatCardModule,
    MatDialogModule,
    DataTablesModule
  ],
  entryComponents: [ErrordialogComponent],  

})
export class DefaultModule { }
