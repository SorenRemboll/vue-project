<script>
    import ErrorMessage from "@/components/errorMessage.vue";
    import Modal from '@/components/modal.vue';
    import Swal from 'sweetalert2'
    export default {
      data() {
          return {
              count: 1,
          };
      },
      components:{
        ErrorMessage,
        Modal,
      },
      methods: {
          increment() {
              this.count++;
          },
          setNewCounterValue(newCounterValue){
            this.count = newCounterValue;
            Swal.fire({
              title: `Counter set to ${newCounterValue}`,
              timer: 3000
            });
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
  <Modal v-if="count > 10" @set-new="setNewCounterValue" />
</template>