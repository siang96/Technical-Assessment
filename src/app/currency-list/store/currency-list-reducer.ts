import { Action, createReducer, on } from "@ngrx/store";
import { CurrencyListModel } from "@app/currency-list/currency-list-model";
import * as currencyListAction from "./currency-list-action";

export interface State{
    currencyList:Map<number,CurrencyListModel>;
    isLoading:boolean;
}

export const currencyListFeatureKey='currencyList';

const initialSate:State={
    currencyList:new Map(),
    isLoading:true
}

const currencyListReducer=createReducer(
    initialSate,
    on(currencyListAction.loadCurrenctListSuccess,(state,{payload})=>{
        let newCurrenctList:Map<number,CurrencyListModel>=new Map();
        for(let [index,value]of payload.entries()){
            newCurrenctList.set(index,value)
        }
        return ({
            currencyList:newCurrenctList,
            isLoading:false
        })
    }),
    on(currencyListAction.loadCurrenctList,(state)=>{      
        return (initialSate)
    })
)

export function reducer(state:State|undefined,action:Action){
    return currencyListReducer(state,action)
}