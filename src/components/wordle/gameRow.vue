<template>
    <div class="rowWrapper">
        <div :class="{active: isActive}" class="gameRow">
            <div ref="gameBox" class="gameBox" v-for="box in 5" :key="box">
                <p></p>
            </div>
        </div>
        <transition>
            <div v-if="showMagic" @click="useMagic" class="magicIcon">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
        </transition>
    </div>
</template>

<script>
import { wordleStore } from '!/wordleStore';
import Swal from 'sweetalert2';
export default {
    props:[
        'rowID',
        'attempt',
    ],
    setup () {
        return {gameStore:wordleStore()}
    },
    mounted(){
        this.gameStore.$subscribe((mutation,state)=>{
            if(this.isActive){
                this.insertLetter(mutation,state)
            }
        });
    },
    data(){
        return{
            
        }
    },
    methods: {
        paintRow(condition = false){
            if(!this.isActive){
                return
            }
            for (let i = 0; i < this.gameStore.attempts[this.attempt].length; i++) {
                setTimeout(() => {
                    const letterObj = this.gameStore.attempts[this.attempt][i];
                    const boxNode = this.$refs.gameBox[i];
                    boxNode.children[0].textContent = letterObj.letter;
                    if(letterObj.state == "IN WORD"){
                        boxNode.classList.add('inWord')
                    }
                    if(letterObj.state == "MATCH"){
                        boxNode.classList.remove('inWord');
                        boxNode.classList.add('matched');
                    }
                    if(letterObj.state == null){
                        boxNode.classList.add('negative')
                    }
                    if(i == 4){
                        
                        setTimeout(()=>{
                            this.$emit('rowDone')

                            if(condition){
                               this.$emit('painted',true);
                                return
                            }
                            if(!condition && this.gameStore.attempt +1 == this.gameStore.amountOfAttempts){
                                this.$emit('painted',false);
                                return
                            }
                            this.gameStore.resetLetters();
                            this.gameStore.attempt++;
                        },500)
                    }
                }, 500*i);
            }
            
        },
        insertLetter(mutation){
            if (!this.isActive) {
                return
            }
            if(mutation.events.type == 'add'){
                for (let i = 0; i < this.$refs.gameBox.length; i++) {
                    const box = this.$refs.gameBox[i];
                    const letter = this.gameStore.letters[i];
                    if(!letter){
                        break
                    }
                    box.children[0].textContent = letter.letter;
                }
            }
            if(mutation.events.type == 'set'){
                if(mutation.events.key != 'letters'){
                    return
                }
                for (let i = 0; i < this.$refs.gameBox.length; i++) {
                    const box = this.$refs.gameBox[i];
                    const letter = this.gameStore.letters[i];
                    if(!letter){
                        box.children[0].textContent = '';
                    }
                }
            }
            
        },
        clean(){
            this.$refs.gameBox.forEach(box => {
                box.classList = 'gameBox';
                box.children[0].textContent = '';
            })
        },
        useMagic(){
            console.log('MAGIC');
        }
    },
    computed:{
        isActive(){
            return this.rowID == this.attempt;
        },
        showMagic(){
            return this.isActive && this.attempt >= 3 && this.gameStore.getAllLetters.filter(e => e.state == 'MATCH').length == 0
        }
    },
}
</script>

<style lang="scss" scoped>
    .rowWrapper{
        position: relative;
        z-index: 1;
        .magicIcon{
            background-color: white;
            color: rgb(38, 191, 38);
            position: absolute;
            top: calc(50% - 20px);
            height: 40px;
            width: 40px;
            display: grid;
            place-items: center;
            font-size: 1.5em;
            border-radius: 100%;
            left: calc(100% + 20px);
            z-index: 4;
            cursor: pointer;
            border: solid 2px rgb(193, 8, 186);
        }
    }
    .gameBox{
        opacity: 1;
    }
    .gameBox.matched{
        background-color: rgb(38, 191, 38) !important;
        color: black !important;
    }
    .gameBox.inWord{
        background-color: #FFFF33 !important;
        color: black !important;
    }
    .gameBox.negative{
        opacity: 0.8;
    }
    @keyframes match {
        
    }
</style>