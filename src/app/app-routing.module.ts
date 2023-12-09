
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplyMessageComponent } from './reply-message/reply-message.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    {path:'send_message/:id',component:ReplyMessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
