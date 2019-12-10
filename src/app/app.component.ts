import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alphabet = '';
  multiplicity: number;
  minLength = 1;
  maxLength: number;
  dop: number;
  initChain = '';
  endChain = '';
  chain = '';
  answer = '';
  lengthRV = 0;

  getExpression() {
    this.dop = this.multiplicity - (this.initChain.length + this.endChain.length) % this.multiplicity;
    this.chain = '';
    if (this.initChain !== '') {
        this.chain = '(' + this.initChain + ')';
      }

    this.chain += '(';
    for (let i = 0; i < this.dop; i++) {
        this.chain += '(';
        for (let j = 0; j < this.alphabet.length; j++) {
          if (j !== 0) {
            this.chain += '+' + this.alphabet[j];
          } else {
            this.chain += this.alphabet[j];
          }
        }
        this.chain += ')';
      }
    this.chain += ')*';

    if (this.endChain !== '') {
        this.chain += '(' + this.endChain + ')';
      }

    if (this.multiplicity === 1) {
        this.chain += '+' + this.alphabet;
      }
  }

  getChains() {
    this.answer = '';
    const alphabetMassive = [];

    for (let i = 0; i < this.alphabet.length; i++) {
      alphabetMassive.push(this.alphabet[i]);
    }

    let lala;
    for (let i = 0; i < this.initChain.length + 3; i++) {
      for (let j = 0; j < this.endChain.length + 3; j++) {
        if (this.initChain.length > this.endChain.length) {
           if (this.initChain[this.initChain.length - this.endChain.length + i] === this.endChain[j]) {
            lala = this.initChain.substring(0, this.initChain.length - 1 - i);
            console.log(lala);
            if (this.multiplicity === (lala + this.endChain).length) {
              this.answer += lala + this.endChain + ' ';
            }
          }
        } else {
          if (this.initChain[i] === this.endChain[j]) {
            lala = this.initChain.substring(0, this.initChain.length - i);
            console.log(lala);
            if (this.multiplicity === (lala + this.endChain).length) {
              this.answer += lala + this.endChain + ' ';
            }
          }
        }

      }
    }

    if (this.multiplicity === (this.initChain.length + this.endChain.length) || (this.initChain.length + this.endChain.length) % this.multiplicity === 0) {
      this.answer += this.initChain + this.endChain + '  ';
    }
    if (!this.maxLength) {
      const cycle = Math.pow(this.alphabet.length, this.dop);
      const perms = PermutationsWithRepetition(alphabetMassive, this.dop);
      for (let i = 0; i < cycle; i++) {
        this.answer += this.initChain + perms.next().toString().replace(/,/g, '') + this.endChain + '  ';
      }
    }
    if (this.maxLength >= (this.dop + this.initChain.length + this.endChain.length)) {
      do {
        if (this.minLength <= (this.dop + this.initChain.length + this.endChain.length)) {
          const cyclec = Math.pow(this.alphabet.length, this.dop);
          const perms = PermutationsWithRepetition(alphabetMassive, this.dop);
          for (let i = 0; i < cyclec; i++) {
            this.answer += this.initChain + perms.next().toString().replace(/,/g, '') + this.endChain + '  ';
          }
        }
        this.dop += this.multiplicity;

      } while (this.maxLength >= (this.dop + this.initChain.length + this.endChain.length));
    }
  }

  setChains() {
    let flag1 = true;
    let flag2 = false;
    let flag3 = false;
    this.initChain = '';
    this.endChain = '';
    this.multiplicity = 0;
    this.lengthRV = 0;
    let index = 0;
    while (flag1 === true) {
      if (this.chain[index] !== '(' && this.chain[index] !== ')') {
        this.initChain += this.chain[index];

      }

      if (this.chain[index] === ')') {
        flag1 = false;
        flag2 = true;
      }
      index++;
      console.log(this.initChain);
    }

    while (flag2 === true) {
      if (this.chain[index] !== '(' && this.chain[index] !== ')' && this.chain[index] !== '+' && this.chain[index] !== '*') {
        this.alphabet += this.chain[index];
      }

      if (this.chain[index] === ')') {
        this.lengthRV++;
      }

      if (this.chain[index] === ')' && this.chain[index + 1] === '*') {
        this.alphabet = this.unique(this.alphabet).toString().replace(/,/g, '');
        this.lengthRV--;
        flag2 = false;
        flag3 = true;
      }
      index++;
    }

    while (flag3 === true) {
      if (this.chain[index] !== '(' && this.chain[index] !== ')' && this.chain[index] !== '+' && this.chain[index] !== '*') {
        this.endChain += this.chain[index];
      }

      if (this.chain[index] === ')') {
        flag3 = false;
      }
      index++;
    }
    if (this.lengthRV === (0)) {
      let lala;
      for (let i = 0; i < this.initChain.length + 3; i++) {
        for (let j = 0; j < this.endChain.length + 3; j++) {
          if (this.initChain.length > this.endChain.length) {
            if (this.initChain[this.initChain.length - this.endChain.length + i] === this.endChain[j]) {
              lala = this.initChain.substring(0, this.initChain.length - 1 - i);
              console.log(lala);
              if (this.multiplicity === (lala + this.endChain).length) {
                this.answer += lala + this.endChain + ' ';
              }
            }
          } else {
            if (this.initChain[i] === this.endChain[j]) {
              lala = this.initChain.substring(0, this.initChain.length - i);
              console.log(lala);
              if (this.multiplicity === (lala + this.endChain).length) {
                this.answer += lala + this.endChain + ' ';
              }
            }
          }

        }
      }
    }
    this.multiplicity = this.initChain.length + this.lengthRV + this.endChain.length;
    this.getExpression();
    this.getChains();
  }

  unique(arr) {
    const result = [];

    for (const str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }

    return result;
  }
}

function PermutationsWithRepetition(src, len) {

  let K;
  let k;
  let n;
  let out;
  let stack;
  K = len - 1,  k = 0,
    n = 0,
    out = [],
    stack = [];

  function next() {
    while (true) {
      while (n < src.length) {
        out[k] = src[n++];
        if (k === K) { return out.slice(0); } else {
          if (n < src.length) {
            stack.push(k);
            stack.push(n);
          }
          k++;
          n = 0;
        }
      }
      if (stack.length === 0) { break; }

      n = stack.pop();
      k = stack.pop();
    }
    return false;
  }

  return {
    next,
  };
}
