<script>
    import ErrorMessage from "@/components/errorMessage.vue";
    export default {
      data() {
          return {
              count: 1,
          };
      },
      components:{
        ErrorMessage
      },
      methods: {
          increment() {
              this.count++;
          }
      },
      computed: {
          isBig() {
              return this.count > 10 ? "Sheesh it is big" : "Not that big yet";
          }
      },
      
      
    }
</script>
  
<template>
  <main>
    <h1>Hi mom</h1>
    <p>This is the Index.vue file</p>
    <p>The counter is at {{count}}, {{isBig}}</p>
    <button @click="increment">{{ count }}</button>
    <ErrorMessage :message="isBig" />
  </main>
</template>