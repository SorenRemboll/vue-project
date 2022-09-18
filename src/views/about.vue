<script>
  import { useCounterStore } from "!/useCounter";
  export default{
    setup(){
      const counterStore = useCounterStore();
      return{
        counterStore
      }
    },
    methods:{
      incrementCounter(){
        this.counterStore.increment();
      },
      reset(){
        this.counterStore.reset();
      },
      getWordleWord(){
        return getWord();
      }
    }
  }
</script>

<template>
  <h1>Testing the new Store</h1>
  <p>Store is currently at: {{this.counterStore.counter  }}</p>
  <p>You got the word: {{ getWordleWord() }}</p>
  <button @click="incrementCounter">{{this.counterStore.counter}}</button>
  <button @click="reset">Reset</button>
</template>

