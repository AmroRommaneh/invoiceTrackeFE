import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { ItemComponent } from './item/item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserComponent } from './user/user.component';



export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'invoice', component: InvoiceComponent },

  { path: 'item', component: ItemComponent },
  { path: 'attachment', component: AttachmentComponent },
  { path: 'user', component: UserComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
