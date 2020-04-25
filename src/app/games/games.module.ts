import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GamesRoutingModule } from "./games-routing.module";
import { GameListComponent } from "./game-list/game-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [GameListComponent],
  imports: [CommonModule, GamesRoutingModule, SharedModule]
})
export class GamesModule {}
