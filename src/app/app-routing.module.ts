import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { RegistryUserComponent } from './registry-user/registry-user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddInviteesComponent } from './add-invitees/add-invitees.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OtherEventsComponent } from './other-events/other-events.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';

const routes: Routes = [
  { path:'registry-user', component: RegistryUserComponent},
  { path:'registration', component: AddUserComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'myevents', component: MyEventsComponent  },
  { path: 'addevent', component: AddEventComponent },
  { path: 'viewevent', component: ViewEventComponent },
  { path: 'addproduct', component: AddProductsComponent },
  { path: 'addinvitees', component: AddInviteesComponent },
  { path: 'viewproduct', component: ViewProductsComponent },
  { path: 'editproduct', component: EditProductComponent },
  { path: 'otherevents', component: OtherEventsComponent },
  { path: 'purchaseproduct', component: PurchaseProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
