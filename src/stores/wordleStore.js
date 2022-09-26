import { defineStore } from "pinia";
import words from '$/getWord.js';
export const wordleStore = defineStore(
  "gameStore", {
  state: () => ({
    currentWord: words.getWord(),
    attempts:[],
    letters:[],
    amountOfAttempts: 0,
    attempt:0,
    difficulty:null,
    allowMagic: true,
  }),
  getters:{
    getAllLetters(){
      return this.attempts.flat();
    }
  },
  actions: {
    addToAttempts(){
      this.attempts.push(this.letters);
    },
    resetLetters(){
      this.letters = [];
    },
    reset(noSettings){
      let settings = this.difficulty;
      this.$reset();
      if(!noSettings){
        return
      }
      this.difficulty = settings;
      if(settings === 'easy'){
        this.amountOfAttempts = 7;
      }
      if(settings === 'medium'){
          this.amountOfAttempts = 6
      }
      if(settings === 'hard'){
        this.amountOfAttempts = 5;
      }
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
    },
    handleMenues(menuIcon){

    }
  },
});
