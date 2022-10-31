import { Component } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedStyle: string;

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

  constructor(private menu:  MenuController) {}

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

    //Remove decimal place for integer totals, rounds decimal to hundredths place
    this.display = (Math.round(this.total*100)/100).toString();
    this.expression += ' = ' + (Math.round(this.total*100)/100).toString();

    this.history.push(this.expression);

    //Reset history to just current total
    this.expression = (Math.round(this.total*100)/100).toString();
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
    //Adjust font size of screen text by matching number of characters to max input field length
    const screen = document.querySelector('#screen') as HTMLInputElement;
    if (this.display.length >= screen.maxLength){
      if(screenChars >= 3){
      this.displaySize -= 1;
      screen.style.fontSize = this.displaySize.toString() + 'rem';
      screen.maxLength += 1;
      }
    }
  }

  toggleHistory(){
    //toggle history div in menu bar
    //**bug** Only works after initially pressing button twice
    const history = document.querySelector('.history') as HTMLElement;
    if (history.style.display === 'none'){
      history.style.display = 'block';
      this.menu.close();
    }else{
      history.style.display = 'none';
      this.menu.close();
    }
  }

  onStyleSelected(){
    console.log(this.selectedStyle);
    const calBody = document.querySelector('.calculator') as HTMLElement;
    const calScreen = document.querySelector('.calScreen') as HTMLElement;
    const sidetoolbar = document.querySelector('#sideToolbar') as HTMLElement;
    const hometoolbar = document.querySelector('#homeToolbar') as HTMLElement;
    const menu = document.querySelector('ion-menu') as HTMLElement;
    const clear = document.querySelector('.clear') as HTMLElement;
    const line = document.querySelector('.line') as HTMLElement;
    const list = document.querySelector('ion-list') as HTMLElement;
    const select = document.querySelector('ion-select') as HTMLElement;
    const mainm = document.querySelector('#main-content') as HTMLElement;



    const nums = document.querySelectorAll('.num') as NodeListOf<HTMLElement>;
    const ops = document.querySelectorAll('.op') as NodeListOf<HTMLElement>;
    const items = document.querySelectorAll('ion-item') as NodeListOf<HTMLElement>;

    if(this.selectedStyle === 'styleA'){

      calBody.style.backgroundColor = '#606c38';

      calScreen.style.backgroundColor = '#606c38';
      calScreen.style.color = '#fefae0';

      sidetoolbar.style.borderBottom = '10px solid #283618';
      sidetoolbar.style.setProperty('--background', '#bc6c25');

      hometoolbar.style.borderBottom = '10px solid #283618';
      hometoolbar.style.setProperty('--background', '#bc6c25');

      menu.style.setProperty('--ion-background-color', '#606c38');
      mainm.style.backgroundColor = '#606c38';

      line.style.background = '#fefae0';

      list.style.backgroundColor = '#606c38';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < nums.length; i++){
        nums[i].style.color = '#fefae0';
        nums[i].style.border = '2px solid #fefae0';

      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < ops.length; i++){
        ops[i].style.color = '#283618';
        ops[i].style.backgroundColor = '#dda15e';
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < items.length; i++){
        items[i].style.setProperty('--ion-item-background','#bc6c25');
        items[i].style.background = '#606c38';
      }

      clear.style.borderColor = '#dda15e';
    }else if(this.selectedStyle === 'styleB'){

      calBody.style.backgroundColor = '#772e25';

      calScreen.style.backgroundColor = '#772e25';
      calScreen.style.color = '#edddd4';

      sidetoolbar.style.borderBottom = '10px solid #283d3b';
      sidetoolbar.style.setProperty('--background', '#bc6c25');

      hometoolbar.style.borderBottom = '10px solid #283d3b';
      hometoolbar.style.setProperty('--background', '#bc6c25');

      menu.style.setProperty('--ion-background-color', '#772e25');
      mainm.style.backgroundColor = '#772e25';

      line.style.background = '#edddd4';

      list.style.backgroundColor = '#772e25';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < nums.length; i++){
        nums[i].style.color = '#edddd4';
        nums[i].style.border = '2px solid #fefae0';

      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < ops.length; i++){
        ops[i].style.color = '#197278';
        ops[i].style.backgroundColor = '#c44536';
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < items.length; i++){
        items[i].style.setProperty('--ion-item-background','#354f52');
        items[i].style.background = '#772e25';
      }

      clear.style.borderColor = '#197278';
    }else if(this.selectedStyle === 'styleC'){

      calBody.style.backgroundColor = '#2f3e46';

      calScreen.style.backgroundColor = '#2f3e46';
      calScreen.style.color = '#cad2c5';

      sidetoolbar.style.borderBottom = '10px solid #52796f';
      sidetoolbar.style.setProperty('--background', '#354f52');

      hometoolbar.style.borderBottom = '10px solid #52796f';
      hometoolbar.style.setProperty('--background', '#354f52');

      menu.style.setProperty('--ion-background-color', '#2f3e46');
      mainm.style.backgroundColor = '#2f3e46';

      line.style.background = '#cad2c5';

      list.style.backgroundColor = '#2f4e46';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < nums.length; i++){
        nums[i].style.color = '#cad2c5';
        nums[i].style.border = '2px solid #cad2c5';

      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < ops.length; i++){
        ops[i].style.color = '#52796f';
        ops[i].style.backgroundColor = '#84a98c';
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < items.length; i++){
        items[i].style.setProperty('--ion-item-background','#354f52');
        items[i].style.background = '#2f3e46';
      }

      clear.style.borderColor = '#52796f';
    }else if(this.selectedStyle === 'styleD'){

      calBody.style.backgroundColor = '#355070';

      calScreen.style.backgroundColor = '#355070';
      calScreen.style.color = '#eaac8b';

      sidetoolbar.style.borderBottom = '10px solid #eaac8b';
      sidetoolbar.style.setProperty('--background', '#e56b6f');

      hometoolbar.style.borderBottom = '10px solid #eaac8b';
      hometoolbar.style.setProperty('--background', '#e56b6f');

      menu.style.setProperty('--ion-background-color', '#355070');
      mainm.style.backgroundColor = '#355070';

      line.style.background = '#eaac8b';

      list.style.backgroundColor = '#6d597a';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < nums.length; i++){
        nums[i].style.color = '#eaac8b';
        nums[i].style.border = '2px solid #eaac8b';

      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < ops.length; i++){
        ops[i].style.color = '#355070';
        ops[i].style.backgroundColor = '#b56576';
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < items.length; i++){
        items[i].style.setProperty('--ion-item-background','#6d597a');
        items[i].style.background = '#355070';
      }

      clear.style.borderColor = '#6d597a';
    }else if(this.selectedStyle === 'styleE'){

      calBody.style.backgroundColor = 'rgb(67,50,110)';

      calScreen.style.backgroundColor = 'rgb(67,50,110)';
      calScreen.style.color = '#fff';

      sidetoolbar.style.borderBottom = '10px solid rgb(50,38,80)';
      sidetoolbar.style.setProperty('--background', 'rgb(100,83,144)');

      hometoolbar.style.borderBottom = '10px solid rgb(50,38,80)';
      hometoolbar.style.setProperty('--background', 'rgb(100,83,144)');

      menu.style.setProperty('--ion-background-color', 'rgb(67,50,110)');
      mainm.style.backgroundColor = 'rgb(67,50,110)';

      line.style.background = '#fff';

      list.style.backgroundColor = 'rgb(100,83,144)';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < nums.length; i++){
        nums[i].style.color = '#fff';
        nums[i].style.border = '2px solid #fff';

      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < ops.length; i++){
        ops[i].style.color = 'rgb(67,50,110)';
        ops[i].style.backgroundColor = 'rgb(251, 214, 82)';
      }

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < items.length; i++){
        items[i].style.setProperty('--ion-item-background','rgb(100,83,144)');
        items[i].style.background = 'rgb(67,50,110)';
      }

      clear.style.borderColor = 'rgb(251, 214, 82)';
    }








  }

}



