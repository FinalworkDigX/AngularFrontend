import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UtilsModule {

  public static arrayToDictOnId(array_: Array<any>): Array<any> {
    const returnDict = [];
    for (const item_ of array_) {
        const obj = {};
        obj[item_['id']] = item_;
        returnDict.push(obj);
    }
    return returnDict;
  }
}
