
<template>
    <div id="game">
        <div class="gameBoxes">
            <GameRow ref="gameRows" :rowID="index" :attempt="this.gameStore.attempt" v-for="(gameRow, index) in this.gameStore.amountOfAttempts" :key="index"/>
        </div>
        <Keyboard @letter="handleEmit"/>
    </div>
</template>
<script>
    import { wordleStore } from '!/wordleStore';
    import Swal from 'sweetalert2';
    import Keyboard from '@/components/wordle/keyboard.vue'
    import GameRow from '@/components/wordle/gameRow.vue'
    export default {
        components:{
            Keyboard,
            GameRow,
        },
        setup () {
            return {gameStore:wordleStore()}
        },
        data(){
            return{
                isReadyToTest: false,
            }
        },  
        mounted(){
            
        },
        methods:{
            handleEmit(payload){
                if(this.gameStore.letters.length != 5 && !['delete','enter'].includes(payload)){
                    this.gameStore.letters.push({letter:payload,state:null});
                    return
                }
                if(payload === 'delete' && this.gameStore.letters.length){
                    this.gameStore.letters = this.gameStore.letters.slice(0,-1);
                    return
                }
                if(payload === 'enter'){
                    if(this.gameStore.letters.length != 5){
                        Swal.fire({
                            title:'You need to fill out all 5 letters!',
                            icon:'error',
                        })
                        return
                    }
                    if(this.gameStore.validate()){
                        return
                    }
                    this.gameStore.addToAttempts();
                    this.$refs.gameRows[this.gameStore.attempt].paintRow()
                }
                
            }
        },
        computed:{
           
        },
        
    }
</script>
<style lang="scss">
    #game{
        .gameBoxes{
            width: 50vw;
            background-color: rgb(57, 126, 151);
            border-radius: 15px;
            margin: 10px auto;
            padding: 15px;
            .gameRow{
                display: grid;
                grid-template-columns: repeat(5,1fr);
                gap: 1px;
                margin-top: 1px;
                .gameBox{
                    transition: 0.5s;
                    width: 100%;
                    aspect-ratio: 1/1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgb(48, 48, 48);
                    color:white;
                    p{
                        position: relative;
                        font-size: 3em;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        
                    }
                }
                
            }
            .gameRow.active{
                .gameBox{
                    background-color: rgb(0, 0, 0);
                }
            }
        }
    }

</style>