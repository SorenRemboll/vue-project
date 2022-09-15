<template>
  <Header />
  <router-view></router-view>
</template>
<script>
  import Header from './components/structure/header.vue';
  export default{
    components:{
      Header
    }
  }
</script>
<style>
  @import url('./assets/base.css');
</style>

