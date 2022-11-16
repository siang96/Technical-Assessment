import { ActionReducerMap } from "@ngrx/store";
import * as currencyListReducer from '@app/currency-list/store/currency-list-reducer'

export interface AppState{
    currencyList:currencyListReducer.State
}

export const appReducer:ActionReducerMap<AppState>= {
    currencyList:currencyListReducer.reducer
}
