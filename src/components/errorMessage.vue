<template>
    <p>ERROR - {{message}}</p>
</template>

<script>
export default {
    props:[
        'message'
    ],
    setup () {
        return {}
    }
}
</script>

<style scoped>
    p{
        color:red;
    }
</style>