<template>
    <div id="gamePrompt">
        <h1>Welcome to Vue-dle!</h1>
        <p>Thanks for playing my little game, please choose a difficulty!</p>
        <div @click="startGame('easy')" class="difficultyBox easy">
            <h2>Easy!<i class="fa-solid fa-bolt"></i></h2>
            <p>You prefer an easy time with less preassure..</p>
            <ul>
                <li><i class="fa-solid fa-hashtag"></i>You have more attempts (7)</li>
                <li class="green_list"><i class="fa-solid fa-wand-magic-sparkles"></i>You get to use powerups</li>
                <li class="red_list"><i class="fa-solid fa-xmark"></i>No timer</li>
            </ul>
        </div>
        <div @click="startGame('medium')" class="difficultyBox medium">
            <h2>Medium!<i class="fa-solid fa-bolt"></i><i class="fa-solid fa-bolt"></i></h2>
            <p>You prefer the original game.</p>
            <ul>
                <li><i class="fa-solid fa-hashtag"></i>Regular amount of attempts (6)</li>
                <li class="red_list"><i class="fa-solid fa-xmark"></i>You don't get to use powerups!</li>
                <li class="red_list"><i class="fa-solid fa-xmark"></i>No timer</li>
            </ul>
        </div>
        <div @click="startGame('hard')" class="difficultyBox hard">
            <h2>Hard!<i class="fa-solid fa-bolt"></i><i class="fa-solid fa-bolt"></i><i class="fa-solid fa-bolt"></i></h2>
            <p>You prefer a challenge!</p>
            <ul>
                <li><i class="fa-solid fa-hashtag"></i>Less attempts (5)</li>
                <li class="red_list"><i class="fa-solid fa-xmark"></i>You don't get to use powerups!</li>
                <li class="green_list"><i class="fa-solid fa-check"></i>You will be timed!</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { wordleStore } from '!/wordleStore';
    export default {
        setup(){
            return{gameStore:wordleStore()}
        },
        methods:{
            startGame(difficulty){
                setTimeout(()=>{
                if(difficulty === 'easy'){
                    this.gameStore.amountOfAttempts = 7;
                    this.gameStore.freeLetters = 1;
                }
                if(difficulty === 'medium'){
                    this.gameStore.amountOfAttempts = 6
                }
                if(difficulty === 'hard'){
                    this.gameStore.amountOfAttempts = 5;
                }
                this.gameStore.difficulty = difficulty;
                this.$emit('start');
            },100)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #gamePrompt{
        width: 450px;
        //background-color: rgb(255, 255, 255);
        padding: 15px;
        color: white;
        border-radius: 15px;
        text-align: center;
        position: absolute;
        left: calc(50% - calc(450px/2));
        & > p{
            font-size: 12px;
        }

        .easy:hover{
            background-color: rgb(135, 255, 135);
        }
        .medium:hover{
            background-color: rgb(255, 255, 101);
        }
        .hard:hover{
            background-color: rgb(255, 181, 181);
        }
        
        .difficultyBox{
            text-align: start;
            border: solid 1px black;
            padding: 10px;
            color: black;
            box-shadow: 15px 15px 5px 0px rgba(0,0,0,0.75);

            border-radius: 15px 35px;
            width: 80%;
            background-color: white;
            transition: 0.5s;
            margin:15px auto;
            cursor: pointer;
            
            &:hover{
                border-radius: 35px 15px;
                box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
            }
            h2{
                
                padding: 5px 10px;
                border-radius: 8px;
                text-align: right;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                i{
                    margin-left: 5px;
                    font-size: 0.7em;
                }
            }
            p{
                font-size: 1.1em;
            }
            ul{
                padding-inline-start: 0;
                list-style:none;
                li{
                    &.green_list{
                        color: green;
                    }
                    &.red_list{
                        color: red;
                    }
                    margin: 5px 0;
                    position: relative;
                    font-weight: 600;
                    font-size: 0.9em;
                    i{
                        margin-right: 8px;
                        width: 15px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                   
                }
            }
        }
    }
    @media screen and (max-width:600px) {
        #gamePrompt{
            h1{
                font-size: 26px;
            }
            position: absolute;
            margin: auto;
            width: calc(100% - 25px*2);
            left: 10px;
        }
    }
</style>