import { defineStore } from "pinia";
import words from '$/getWord.js';
export const wordleStore = defineStore("gameStore", {
  state: () => ({
    currentWord: words.getWord(),
    attempts:[],
    letters:[],
    amountOfAttempts: 6,
    attempt:0,
    difficulty:null,
    freeLetters:0
  }),
  getters: {
    
  },
  actions: {
    addToAttempts(){
      this.attempts.push(this.letters);
    },
    resetLetters(){
      this.letters = [];
    },
    restartGame(){
      this.$reset()
    },
    validate(){
      const currentWordArr = this.currentWord.split('').map(e => e.toUpperCase());
      for (let i = 0; i < this.letters.length; i++) {
        const letter = this.letters[i];
        const wordLetter = this.currentWord.split('')[i].toUpperCase();
        if(currentWordArr.includes(letter.letter)){
          letter.state = "IN WORD"
        }
        if(letter.letter == wordLetter){
          letter.state = 'MATCH';
        }
      }
      return this.letters.every(letter => letter.state == 'MATCH');
    }
  },
});
