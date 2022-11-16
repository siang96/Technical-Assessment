import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as currencyListActions from "@app/currency-list/store/currency-list-action";
import * as currencyListSelector from "@app/currency-list/store/currency-list-selector";
import * as appReducer from "@app/store/app-reducer";
import { Store } from '@ngrx/store';
import { DataResult, DataSourceChangedEventArgs, EditService, EditSettingsModel, GridComponent, GridModule, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { count, Subject, takeUntil } from 'rxjs';
import { CurrencyListModel } from './currency-list-model';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
  imports: [GridModule, DialogModule],
  providers: [EditService, ToolbarService],
  standalone: true
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  data!: DataResult;
  data2!: CurrencyListModel[]
  isDestroyed: Subject<boolean> = new Subject<boolean>()
  targetElement!: HTMLElement;
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  dialogContent!: string
  @ViewChild('table') dataTable!: GridComponent;
  editSettings!: EditSettingsModel;
  toolbar!: ToolbarItems[];
  constructor(
    private appStore: Store<appReducer.AppState>,

  ) { }

  ngOnDestroy(): void {
    this.isDestroyed.next(true);
    this.isDestroyed.complete()
  }

  ngOnInit(): void {
    this.editSettings = { allowAdding: true };
    this.toolbar = ['Add', 'Cancel', 'Update'];
    this.loadData();
    this.appStore.select(currencyListSelector.selectCurrencyListIsLoading).pipe(takeUntil(this.isDestroyed)).subscribe(loadStatus => {
      if (!loadStatus)
        this.selectData()
    })
  }

  loadData() {
    this.appStore.dispatch(currencyListActions.loadCurrenctList());
  }

  selectData() {
    this.appStore.select(currencyListSelector.selectCurrencyListInArray).pipe(takeUntil(this.isDestroyed)).subscribe(dataRespond => {
      this.data = {
        result: dataRespond,
        count: dataRespond.length
      }
      this.data2 = dataRespond
    })
  }

  onOverlayClick: EmitType<object> = () => {
    this.ejDialog.hide();
  }

  onDataChanged(state: DataSourceChangedEventArgs) {
    if (state.action === 'add') {
      this.data2.push(state.data as CurrencyListModel);
      this.data={
        result:this.data2,
        count:this.data2.length
      }
      this.dataTable.refresh();
      this.dialogContent = "Record added, please check data at the bottom of the table"
      this.ejDialog.show();
      if (state.endEdit) {
        state.endEdit();
      }
    }
  }
}
