<template>
    <div :class="{active:isActive}" class="rowWrapper">
       <div class="animationWrapper">
        <div ref="gameRow" :class="{active: isActive}" class="gameRow">
            <div ref="gameBox" class="gameBox" v-for="box in 5" :key="box">
                <p></p>
            </div>
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
            this.gameStore.blockAction = true;
            if(!this.isActive){
                return
            }
            for (let i = 0; i < this.gameStore.attempts[this.attempt].length; i++) {
                setTimeout(() => {
                    this.paintAndEmit(condition,i)
                }, 500*i);
            }
            
        },
        paintAndEmit(condition,i){
            this.$emit('pauseTimer')
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
                    this.gameStore.$patch({attempt: this.gameStore.attempt + 1});
                },500)
            }
        },
        insertLetter(mutation){
            if (!this.isActive) {
                return
            }
            if(mutation.payload?.letters){
                for (let i = 0; i < this.$refs.gameBox.length; i++) {
                    const box = this.$refs.gameBox[i];
                    const letter = this.gameStore.letters[i];
                    if(!letter){
                        break
                    }
                    box.children[0].textContent = letter.letter;
                }
            }  
            if(mutation.payload?.func == 'delete'){
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
            if(!this.gameStore.allowMagic){
                return
            }
            this.gameStore.allowMagic = false;
            let freeLetter = this.gameStore.currentWord.split('')[this.gameStore.letters.length].toUpperCase()
            this.$refs.gameRow.classList.add('magic');
            this.gameStore.letters.push({letter:freeLetter,state:'MATCH'});
            this.$refs.gameBox[0].children[0].textContent = freeLetter
        }
    },
    computed:{
        isActive(){
            return this.rowID == this.attempt;
        },
        showMagic(){
            return this.isActive && this.gameStore.difficulty == 'easy' && this.gameStore.allowMagic && this.attempt >= 3 && this.gameStore.getAllLetters.filter(e => e.state == 'MATCH').length == 0
        }
    },
}
</script>

<style lang="scss" scoped>
    
    .animationWrapper{
        //overflow: hidden;
        position: relative;
    }
    .magic::before{
        animation-name: magicShimmer;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
        position: absolute;
        left: -100%;
        width: 100%;
        height: 100%;
        content: '';
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
        
    }
    .rowWrapper{
        position: relative;
        z-index: 1;
        &.active{
            z-index: 2;
        }
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
        animation-name: matchAnim;
        animation-duration: .5s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
    }
    .gameBox.inWord{
        background-color: #FFFF33 !important;
        color: black !important;
        animation-name: inWordAnim;
        animation-duration: .5s;
        animation-timing-function: cubic-bezier(1, 0, 0, 1);
        animation-iteration-count: 1;
    }
    .gameBox.negative{
        opacity: 0.8;
        animation-name: negativeAnim;
        animation-duration: .5s;
        animation-timing-function: cubic-bezier(1, 0, 0, 1);
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        
    }
    @keyframes magicShimmer{
        0%{
            left: -100%;
        }
        100%{
            left: 100%;
        }
    }
    @keyframes inWordAnim {
        0%{
            scale: 0.9
        }
        50%{
            scale: 1.1;
        }
        100%{
            scale: 1;
        }
        
    }
    @keyframes matchAnim {
        0%{
            transform: translateY(0);
        }
        50%{
            transform: translateY(-20px);
        }
        0%{
            transform: translateY(0);
        }
        
    }
    @keyframes negativeAnim {
        50%{
            font-size: 0.9em;
        }
        100%{
            font-size: 0.8;
            color: rgba(255, 255, 255, 0.5);
        }
    }
    @media screen and (max-width: 600px){
        .rowWrapper{
            .magicIcon{
                top: -20px;
                left: calc(100% - 20px);
            }
        }
    }
</style>