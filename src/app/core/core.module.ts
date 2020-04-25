import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [ContainerComponent]
})
export class CoreModule {}
