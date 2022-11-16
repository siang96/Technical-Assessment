import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { CurrencyListService } from "@app/currency-list/currency-list.service";
import * as currenctListActions from "./currency-list-action"

@Injectable()
export class CurrencyListEffect {
    constructor(
        private actions:Actions,
        private currencyListService:CurrencyListService
    ){}
    loadCurrencyList=createEffect(()=>this.actions.pipe(
        ofType(currenctListActions.loadCurrenctList),
        mergeMap(action=>this.currencyListService.getcurrenctList().pipe(
            map(response=>currenctListActions.loadCurrenctListSuccess({payload:response})),
            catchError(errorMessage=>{throw new Error("error orrcured "+ errorMessage)})
        ))
    ))
}
