import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "DollarToRupees",
  standalone:  true
})

export class CustomPipe implements PipeTransform {
  private exchangeRate: number = 80;

  transform(value: number): string {
    const rupees = value * this.exchangeRate;
    return `₹ ${rupees.toFixed(2)}`;
  }
}
