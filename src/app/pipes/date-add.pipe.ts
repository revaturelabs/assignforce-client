import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "dateAddDays",
})
export class DateAddPipe implements PipeTransform {

  transform(value: number, days: number): number {
    return value + days * 24 * 60 * 60 * 1000;
  }

}
