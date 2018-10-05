import { SubscriberComponent } from "./subscriber.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: SubscriberComponent}
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [RouterModule]
  })
  export class SubscriberRoutingModule { }
  