<script>
  import { RouterLink, RouterView } from "vue-router";  
  export default {
    data() {
      return {
        count: 1,
       
      }
    },
    methods: {
      increment(){
        this.count++;
      }
    },
    computed: {
      isBig(){
        return this.count > 10 ? 'Sheesh it is big' : 'Not that big yet';
      }
    },
    
  }
</script>

<template>
  <h1>Hi mom</h1>
  <p>This is the About.vue file</p>
  <p>The counter is at {{count}}</p>
  <button @click="increment">{{ count }}</button>
  <p>{{isBig}}</p>
</template>

