import { Component, OnInit, ViewChild } from '@angular/core';

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

  isDarkMode: boolean = false;

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
    let ball = document.getElementById("ball") as HTMLElement;
    ball?.style.setProperty("left", "0");
  }

  toggleClicked() {
    let ball = document.getElementById("ball") as HTMLElement;

    if (this.isDarkMode) {
      ball?.style.removeProperty("right");
      ball?.style.setProperty("left", "0");
      document.documentElement.setAttribute('data-theme', 'light');
    }
    else {
      ball?.style.removeProperty("left");
      ball?.style.setProperty("right", "0");
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    this.isDarkMode = !this.isDarkMode;

    console.log("toggle clicked")
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
      case "+/-":
        this.toggleSign();
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

  percent() {
    if (this.value.active) {
      this.result = String(Number(this.value.value) / 100)
      this.value.active = false;
      return;
    }

    let value: null | number = null;
    let number = 0;
    if (this.operationSign.includes(this.result[this.result.length - 1])) {
      return;
    }
    for (let i = this.result.length - 1; i > 0; i--) {
      if (this.operationSign.includes(this.result[i])) {
        value = i;
        break;
      }
    }
    if (value != null) {
      number = Number(this.result.substring(value + 1, this.result.length))
      this.result = this.result.substring(0, value + 1) + String(number / 100)
    } else {
      number = Number(this.result)
      this.result = String(number / 100);
    }
  }

  calculate(resultValue: string) {
    var calculated = false;
    let value = 0;
    let contain = false;

    for (let i = 0; i < resultValue.length; i++) {
      if (this.operationSign.includes(resultValue[i])) {
        contain = true;
        break;
      }
    }
    if (!contain) {
      return resultValue;
    }
    let array = this.operationSignFind(resultValue);
    while (!calculated) {
      console.log(array)
      if (this.multiplicationDivision.includes(array[1])) {
        value = this.process(array[0], array[1], array[2])
        array.splice(0, 3, String(value));
      } else {
        if (this.multiplicationDivision.includes(array[3])) {
          value = this.process(array[2], array[3], array[4])
          array.splice(2, 3, String(value));
        } else {
          value = this.process(array[0], array[1], array[2])
          array.splice(0, 3, String(value));
        }
      }
      if (!this.operationSign.includes(array[1])) {
        calculated = true;
      }
    }
    return array[0];
  }

  operationSignFind(resultValue: string) {
    let array: string[] = [];
    let endValue = 0;
    for (let i = 1; i < resultValue.length; i++) {
      if (this.operationSign.includes(resultValue[i])) {
        array[array.length] = (resultValue.substring(endValue == 0 ? endValue : endValue + 1, i))
        endValue = i;
        array[array.length] = (resultValue[i])
      }
    }
    array[array.length] = resultValue.substring(endValue + 1, resultValue.length)
    return array;
  }

  toggleSign() {
    if (this.value.active) {
      this.result = String(Number(this.value.value) * -1)
      this.value.active = false;
      return;
    }

    let value: null | number = null;
    let number = 0;
    if (this.operationSign.includes(this.result[this.result.length - 1])) {
      return;
    }
    for (let i = this.result.length - 1; i > 0; i--) {
      if (this.operationSign.includes(this.result[i])) {
        value = i;
        break;
      }
    }
    if (value != null) {
      number = Number(this.result.substring(value + 1, this.result.length))
      this.result = this.result.substring(0, value + 1) + String(number / 100)
    } else {
      number = Number(this.result)
      this.result = String(number / 100);
    }
  }
  
  

  process(firstNumber: string, operation: string, secondNumber: string): number {
    switch (operation) {
      case "×":
        return Number(firstNumber) * Number(secondNumber);
      case "÷":
        return Number(firstNumber) / Number(secondNumber);
      case "+":
        return Number(firstNumber) + Number(secondNumber);
      case "-":
        return Number(firstNumber) - Number(secondNumber);
      default:
        return 0;
    }
  }
}
