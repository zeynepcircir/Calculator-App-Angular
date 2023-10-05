import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-app',
  templateUrl: './calculator-app.component.html',
  styleUrls: ['./calculator-app.component.css']
})
export class CalculatorAppComponent implements OnInit {


  result: string = "0";
  value: { active: boolean, value: string } = { active: true, value: "0" };

  NUMBERS: string = "AC,+/-,%,÷,×,-,+";
  EQUAL: string = "=";
  AC: string = "AC";
  ZERO: string = "0";
  DOUBLE: string = "00";

  operationSign = "÷,×,-,+"
  multiplicationDivision = "÷×";
  additionSubstraction = "+-";
  numbers: string = "0123456789";

  regularButtons: string[][] = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", this.ZERO, this.DOUBLE]
  ]

  horizontalButtons: string[] = [
    this.AC, "+/-", "%"
  ]

  verticalButtons: string[] = [
    "÷", "×", "-", "+", "="
  ]

  constructor() { }

  ngOnInit(): void {

  }

  click(button: string) {
    switch (button) {
      case this.AC:
        this.ac();
        break;
      case this.EQUAL:
        this.equalsButton();
        break;
      case "%":
        this.percent();
        break;
      case ",":
        if (this.result == this.ZERO)
          this.result = `${this.ZERO}.`
        else
          this.result = this.result + ".";
        break;

      default:
        this.operation(button)
        break;
    }

  }



  operation(button: string) {
    if (this.value.active && this.operationSign.includes(button)) {
      this.result = this.value.value;
      this.value.active = false;
    }
    if (this.value.active && !this.operationSign.includes(button)) {
      this.result = this.ZERO
      this.value.active = false;
    }

    if (this.result == this.ZERO) {
      if (this.operationSign.includes(button) && !this.additionSubstraction.includes(button)) return;
      this.result = button;
    } else {
      if (this.operationSign.includes(this.result[this.result.length - 1])) {
        if (this.operationSign.includes(button)) {
          this.result = this.result.substring(0, this.result.length - 1) + button;
          return;
        }
      }
      this.result = this.result + button
    }
  }



  equalsButton() {
    if (this.result == this.ZERO) return;
    this.value.active = true
    this.value.value = this.calculate(this.result);
  }



  ac() {
    this.result = "0";
  }


  buttonColor(button: string): string {
    if (!this.NUMBERS.includes(button)) {
      switch (button) {
        case ",":
          return "";
        case this.EQUAL:
          return "equal-sign-button"
        default:
          return "other-button";
      }
    }
    return "";
  }

 