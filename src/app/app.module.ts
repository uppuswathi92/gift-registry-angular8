import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistryUserComponent } from './registry-user/registry-user.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddInviteesComponent } from './add-invitees/add-invitees.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { OtherEventsComponent } from './other-events/other-events.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { FileTestComponent } from './file-test/file-test.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { EventLocationComponent } from './event-location/event-location.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistryUserComponent,
    AddUserComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    MyEventsComponent,
    AddEventComponent,
    ViewEventComponent,
    AddProductsComponent,
    AddInviteesComponent,
    ViewProductsComponent,
    OtherEventsComponent,
    PurchaseProductComponent,
    FileTestComponent,
    UpcomingEventsComponent,
    EventLocationComponent,
  ],
  imports: [
    BrowserModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG59Hss9r5APBVC0bL-Kz9oQf5Qdne6W4',
      libraries: ['places']
    }),
	AgmDirectionModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	NgbModule,
	NgbTypeaheadModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
