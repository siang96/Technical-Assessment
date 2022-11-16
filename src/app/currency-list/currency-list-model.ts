import { nullAbleType } from "@app/type/null-type";

export class CurrencyListModel {
    countryCode: nullAbleType<string> = null;
    countryName: nullAbleType<string> = null;
    currencyCode: nullAbleType<string> = null;
    population: nullAbleType<number> = null;
    capital: nullAbleType<string> = null;
    continentName: nullAbleType<string> = null;
    constructor(currenyList?: CurrencyListModel) {
        if (currenyList)
            Object.assign(this, currenyList);
    }
}
