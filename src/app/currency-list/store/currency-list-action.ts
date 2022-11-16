import { createAction, props } from "@ngrx/store";
import { CurrencyListModel } from "@app/currency-list/currency-list-model";

const componentName='currency list'

export const loadCurrenctList = createAction(
    '['+componentName+']'+' Load '+componentName
)

export const loadCurrenctListSuccess = createAction(
    '['+componentName+']'+' Load '+componentName+' success',
    props<{payload:CurrencyListModel[]}>()
)

// TODO add other actions, effects and etc will call API to manipulate data
