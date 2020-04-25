import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { GameListService } from "../services/game-list.service";
import { SharedService } from "../../shared/services/shared.service";
import { MatSort, Sort, SortDirection } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ListItem } from "../models/game-list.model";
import { Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"]
})
export class GameListComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  listData: ListItem[];
  displayedColumns: string[];
  selectedColumn = "score";
  selectedDir: SortDirection = "asc";
  dataSource = new MatTableDataSource<ListItem>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private gl: GameListService, private ss: SharedService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.ss.showLoading(true);
    // this.listData$ = this.gl.getGameList();
    this.subscription = this.gl
      .getLocalJsonFile()
      .subscribe((resp: ListItem[]) => {
        this.ss.showLoading(false);
        this.listData = resp;
        this.dataSource.data = resp;
        // this.dataSource = new MatTableDataSource<ListItem>(resp);
        this.displayedColumns = Object.keys(resp[0]);
        let urlIndex = this.displayedColumns.indexOf("url");
        if (urlIndex > -1) {
          this.displayedColumns.splice(urlIndex, 1);
        }
        this.dataSource.sort = this.sort;
        this.changeSortedColumn();
      });
  }
  changeSortedColumn() {
    const sortState: Sort = {
      active: this.selectedColumn,
      direction: this.selectedDir
    };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  changeSortedDir() {
    const sortState: Sort = {
      active: this.selectedColumn,
      direction: this.selectedDir
    };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
