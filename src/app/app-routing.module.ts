import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddInviteesComponent } from './add-invitees/add-invitees.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { OtherEventsComponent } from './other-events/other-events.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventLocationComponent } from './event-location/event-location.component';
const routes: Routes = [
  { path:'registration', component: AddUserComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'myevents', component: MyEventsComponent,canActivate:[AuthGaurdService]  },
  { path: 'addevent', component: AddEventComponent,canActivate:[AuthGaurdService] },
  { path: 'viewevent', component: ViewEventComponent,canActivate:[AuthGaurdService] },
  { path: 'addproduct', component: AddProductsComponent,canActivate:[AuthGaurdService] },
  { path: 'addinvitees', component: AddInviteesComponent,canActivate:[AuthGaurdService] },
  { path: 'viewproduct', component: ViewProductsComponent, canActivate:[AuthGaurdService] },
  { path: 'otherevents', component: OtherEventsComponent,canActivate:[AuthGaurdService] },
  { path: 'purchaseproduct', component: PurchaseProductComponent,canActivate:[AuthGaurdService] },
  { path: 'upcomingevents', component: UpcomingEventsComponent,canActivate:[AuthGaurdService] },
  { path: 'eventlocation', component: EventLocationComponent,canActivate:[AuthGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
