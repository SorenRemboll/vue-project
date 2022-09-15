<template>
    <div id="header">
        <i class="fa-solid fa-ghost"></i>
        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/game">Wordle!</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    #header{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 40px 0;
        i{
            color: teal;
            font-size: 5em;
        }
        .links{
            display: flex;
            gap: 15px;
            font-size: 18px;
            a{
                color: white;
                text-decoration: none;
            }
        }
    }
</style>