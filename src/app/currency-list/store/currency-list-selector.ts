import { createFeatureSelector,createSelector } from "@ngrx/store";
import { currencyListFeatureKey,State } from "./currency-list-reducer";

export const selectCurrencyListState=createFeatureSelector<State>(currencyListFeatureKey);

export const selectCurrencyListInMap=createSelector(selectCurrencyListState,(state:State)=>{
    return state.currencyList;
});

export const selectCurrencyListIsLoading=createSelector(selectCurrencyListState,(state:State)=>{
    return state.isLoading;
});

export const selectCurrencyListInArray=createSelector(selectCurrencyListInMap,currencyList=>{
    
    return [...currencyList.values()];
})