import { Injectable } from "@angular/core";
import { SharedService } from "../../shared/services/shared.service";
import { RestApiService } from "../../core/services/rest-api.service";
import { restApiConstants } from "../../../app/constant/rest-api.constant";
@Injectable({
  providedIn: "root"
})
export class GameListService {
  private BASE_URL: string;

  constructor(
    private ss: SharedService,
    private restApiService: RestApiService
  ) {
    this.BASE_URL = ss.getBaseUrl();
  }

  getGameList() {
    return this.restApiService.get(
      this.BASE_URL + restApiConstants.GET_GAMESEXT,
      true
    );
  }
  getLocalJsonFile() {
    return this.restApiService.get("assets/responce.json", true);
  }
}
