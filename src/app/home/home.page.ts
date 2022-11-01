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
  selectedFont: string;

  showHistory = false;
  history = [];
  secondNum = 0;
  total = 0;
  display = '0';
  tempNum = '0';
  expression = '';
  nums = [];
  operators = [];
  displaySize = 7;
  firsteq = true;
  firstpress = true;

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
    const screen = document.querySelector('#screen') as HTMLInputElement;

    screen.style.fontSize = '7rem';
    screen.maxLength = 6;
    this.secondNum = 0;
    this.total = 0;
    this.display = '0';
    this.tempNum = '0';
    this.expression = '';
    this.nums = [];
    this.operators = [];
    this.firsteq = true;
    this.firstpress = true;

  }

  evaluate(){
    /*
    Evaluates an entered expression.
    Parses a number from the temp string entered after an operator.
    Operators are iterated over in a queue and total is operated on by
    first number in nums queue.
    */

    if(this.tempNum !== '' && this.operators.length === 0){
      //do nothing
    }else if(this.tempNum !== '' || this.operators.length === 0 ){

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

      //Round decimal to hundredths place for history and display
      const totalStr =  (Math.round(this.total*100)/100).toString();

      this.display = totalStr;
      this.expression += ' = ' + totalStr;
      this.history.push(this.expression);

      //Remove equal sign from expression and assign tempNum unrounded total
      this.expression = totalStr;
      this.tempNum = this.total.toString();
      this.firsteq = false;
      }
  }

  numPress(num: string){
    /*
    When number is pressed, it is appended to tempNum and display strings.
    Display font size is adjusted if max character length reached
    */

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

  decPress(num: string){
    /*
    When decimal is pressed, it is appended to tempNum and display strings.
    Display font size is adjusted if max character length reached
    */

    if(!this.tempNum.includes('.')){
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
  }

  opPress(op: string){
    /*
    On first equation, tempNum string is parsed to float and pushed to nums array.
    For subsequent equations, total is assigned the parsed tempNum value directly.
    Operator pressed is pushed to operators queue.
    */

    if(this.tempNum !== ''){

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

      if (this.firsteq === true){
        this.nums.push(parseFloat(this.tempNum));
        this.tempNum = '';
      }else{
        this.total = parseFloat(this.tempNum);
        this.tempNum = '';
      }

      this.operators.push(op);
    }
  }

  adjustDisplay(screenChars: number){
    /*
    Adjust font size of screen text if characters exceed max input field length.
    Max input length and font size are decremented each time limit is hit until
    font size is 3rems
    */

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
    /*
    Toggle history div from the menu bar
    */

    const history = document.querySelector('.history') as HTMLElement;
    if (this.showHistory === false){
      history.style.display = 'block';
      this.showHistory = true;
      this.menu.close();
    }else{
      history.style.display = 'none';
      this.showHistory = false;
      this.menu.close();
    }
  }

  onStyleSelected(){
    /*
    HTML elements are selected through the DOM and their color styles are
    changed based on themes selector in menu bar
    */

    const calBody = document.querySelector('.calculator') as HTMLElement;
    const calScreen = document.querySelector('.calScreen') as HTMLElement;
    const sidetoolbar = document.querySelector('#sideToolbar') as HTMLElement;
    const hometoolbar = document.querySelector('#homeToolbar') as HTMLElement;
    const menu = document.querySelector('ion-menu') as HTMLElement;
    const clear = document.querySelector('.clear') as HTMLElement;
    const line = document.querySelector('.line') as HTMLElement;
    const list = document.querySelector('ion-list') as HTMLElement;
    const mainm = document.querySelector('#main-content') as HTMLElement;
    const menl = document.querySelector('#menulist') as HTMLElement;

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
      menl.style.background = '#606c38';

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
      menl.style.background = '#772e25';

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
      menl.style.background = '#2f4e46';


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
      menl.style.background = '#6d597a';

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
      menl.style.background = 'none';


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

  onFontSelected(){
    /*
    HTML elements are selected through the DOM and their font families are
    changed based on font selector in menu bar.
    *Bug* Currently only works on screen and history text. Button text does not change.
    */

    const calScreen = document.querySelector('.calScreen') as HTMLElement;
    const history = document.querySelector('li') as HTMLElement;
    const numSpan = document.querySelectorAll('#butext') as NodeListOf<HTMLElement>;

    if(this.selectedFont === 'openSans'){

      calScreen.style.fontFamily = 'OpenSans';
      history.style.fontFamily = 'OpenSans';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < numSpan.length; i++){
        numSpan[i].style.fontFamily = 'OpenSans';
      }

    }else if(this.selectedFont === 'roboto'){

      calScreen.style.fontFamily = 'Roboto';
      history.style.fontFamily = 'Roboto';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < numSpan.length; i++){
        numSpan[i].style.fontFamily = 'Roboto';
      }

    }else if(this.selectedFont === 'poppins'){

      calScreen.style.fontFamily = 'Poppins';
      history.style.fontFamily = 'Poppins';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < numSpan.length; i++){
        numSpan[i].style.fontFamily = 'Poppins';
      }

    }else if(this.selectedFont === 'nunitoSans'){

      calScreen.style.fontFamily = 'NunitoSans';
      history.style.fontFamily = 'NunitoSans';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < numSpan.length; i++){
        numSpan[i].style.fontFamily = 'NunitoSans';
      }

    }else if(this.selectedFont === 'lato'){

      calScreen.style.fontFamily = 'Lato';
      history.style.fontFamily = 'Lato';

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i=0; i < numSpan.length; i++){
        numSpan[i].style.fontFamily = 'Lato';
      }
    }
  }
}



