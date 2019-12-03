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

  getExpression() {
    this.chain = '';
    this.dop = this.multiplicity - (this.initChain.length + this.endChain.length) % this.multiplicity;
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
    this.chain += ')';

    if (this.endChain !== '') {
      this.chain += '*(' + this.endChain + ')';
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
}

function PermutationsWithRepetition(src, len) {

  let K;
  let k;
  let N;
  let n;
  let out;
  let stack;
  K = len - 1,  k = 0,
    N = src.length, n = 0,
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

  function rewind() { k = 0; n = 0; out = []; stack = []; }

  function each(cb) {
    rewind();
    let v;
    while (v === next()) { if (cb(v) === false) { return; } }
  }

  return {
    next,
    each,
    rewind
  };
}

/* пример использования */


 // [1, 1, 1]
// perms.next(); // [1, 1, 2]
// // ...
// perms.next(); // [5, 5, 4]
// perms.next(); // [5, 5, 5]
// perms.next(); // false
//
// perms.rewind();
// perms.next(); // [1, 1, 1]
// ...


// perms.each(function(v) { console.log(v); });
