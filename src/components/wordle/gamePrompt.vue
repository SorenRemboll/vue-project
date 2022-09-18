<template>
    <div id="gamePrompt">
        <h1>Welcome to Vue-rdle!</h1>
        <p>Thanks for playing my little game, please chose a difficulty!</p>
        <div class="difficultyBox easy">
            <h2>Easy!</h2>
            <p>You prefer an easy time with less preassure..</p>
        </div>
        <div class="difficultyBox medium"></div>
        <div class="difficultyBox hard"></div>
    </div>
</template>

<script>
    import { wordleStore } from '!/wordleStore';
    export default {
        setup(){
            return{gameStore:wordleStore()}
        }
    }
</script>

<style lang="scss" scoped>
    #gamePrompt{
        width: 80vw;
        margin: auto;
        background-color: white;
        padding: 15px;
        border-radius: 15px;
        text-align: center;
        
        .difficultyBox{
            text-align: start;
            border: solid 1px black;
            padding: 10px;
            border-radius: 8px;
            width: 50%;
            margin:15px auto;
            cursor: pointer;
            box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
            
        }
    }
</style>