import { Component, OnInit } from "@angular/core";
import { SharedService } from "./shared/services/shared.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "sapient-test";
  showPageLoading = false;
  constructor(public ss: SharedService) {}
  ngOnInit() {
    this.ss.showSpinner$.subscribe(res => {
      if (res === true) {
        this.showPageLoading = true;
      } else {
        this.showPageLoading = false;
      }
    });
  }
}
