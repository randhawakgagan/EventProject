import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  
{ path: '', redirectTo: 'event', pathMatch: 'full' },
{ path: 'event', component: EventComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
