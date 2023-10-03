import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-app',
  templateUrl: './calculator-app.component.html',
  styleUrls: ['./calculator-app.component.css']
})
export class CalculatorAppComponent implements OnInit{


  result: string = "0";
  value: {active: boolean, value: string } = {active: true, value:"0"};

  buttons:string[][] = [
    ["AC","+/-","%","÷"],
    ["1","2","3","×"],
    ["4","5","6","-"],
    ["7","8","9","+"],
    [".","0","00","="]
  ]

  constructor(){}

  ngOnInit(): void {
      
  }
}
