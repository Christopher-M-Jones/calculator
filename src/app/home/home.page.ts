import { Component } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  display = '0';
  expression = '';
  history = [];
  tempNum = '0';
  secondNum = 0;
  nums = [];
  operators = [];
  total = 0;
  firsteq = true;
  firstpress = true;
  displaySize = 7;

  constructor() {}

  add(x: number, y: number) {
    return x + y;
  }
  sub(x: number, y: number) {
    return x - y;
  }
  mult(x: number, y: number) {
    return x * y;
  }
  divide(x: number, y: number) {
    return x / y;
  }

  clear(){
    this.display = '0';
    this.tempNum = '0';
    this.secondNum = 0;
    this.total = 0;
    this.nums = [];
    this.operators = [];
    this.firsteq = true;
    this.firstpress = true;
    const screen = document.querySelector('#screen') as HTMLInputElement;
    screen.style.fontSize = '7rem';
    screen.maxLength = 6;
    this.expression = '';
  }

  evaluate(){

    //this.expression += ' ' + this.tempNum;
    this.nums.push(parseFloat(this.tempNum));
    this.tempNum = '';

    this.display = '';

    if (this.firsteq === true){
    this.total = this.nums.shift();
    }

    while (this.operators.length > 0){
      if (this.operators[0] === '+'){
        this.operators.shift();
        this.secondNum = this.nums.shift();
        this.total = this.add(this.total, this.secondNum);
        //this.total += this.secondNum;
      }else if(this.operators[0] === '-'){
        this.operators.shift();
        this.secondNum = this.nums.shift();
        this.total = this.sub(this.total, this.secondNum);
      }else if(this.operators[0] === '*'){
        this.operators.shift();
        this.secondNum = this.nums.shift();
        this.total = this.mult(this.total, this.secondNum);
      }else if(this.operators[0] === '/'){
        this.operators.shift();
        this.secondNum = this.nums.shift();
        this.total = this.divide(this.total, this.secondNum);
      }
    }

    this.display = (Math.round(this.total*100)/100).toString();
    this.expression += ' = ' + this.total.toString();
    this.history.push(this.expression);
    this.expression = `${this.total}`;
    this.firsteq = false;
  }

  addNum(num: string){
    //add number button press as char to tempNum and update display

    if(this.firstpress){
      this.display = '';
      this.tempNum = '';
      this.firstpress = false;
    }

    this.tempNum += num;
    this.expression += num;
    this.display += num;

    this.adjustDisplay(this.displaySize);
  }
  addOp(op: string){
    //display mult and divide symbols with unicode

    if(this.firstpress){
      this.firstpress = false;
    }

    if (op === '*'){
      this.display += '\u00d7';
      this.expression += ' ' + '\u00d7' + ' ';
    }else if (op === '/'){
      this.display += '\u00f7';
      this.expression += ' ' + '\u00f7' + ' ';
    }else{
      this.display += op;
      this.expression += ' ' + op + ' ';
    }

    //convert tempNum to number and push to nums array, clear tempNum
    //push operator to ops array

    if (this.tempNum !== ''){
    this.nums.push(parseFloat(this.tempNum));
    this.tempNum = '';
    }

    this.operators.push(op);
  }

  adjustDisplay(screenChars: number){
    const screen = document.querySelector('#screen') as HTMLInputElement;
    if (this.display.length >= screen.maxLength){
      if(screenChars >= 3){
      this.displaySize -= 1;
      screen.style.fontSize = this.displaySize.toString() + 'rem';
      screen.maxLength += 1;
      }
    }
  }
}



