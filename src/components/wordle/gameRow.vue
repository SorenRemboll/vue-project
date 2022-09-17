<template>
    <div :class="{active: isActive}" class="gameRow">
        <div ref="gameBox" class="gameBox" v-for="box in 5" :key="box">
            <p></p>
        </div>
    </div>
</template>

<script>
import { wordleStore } from '!/wordleStore';
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
        paintRow(){
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
            
        }
    },
    computed:{
        isActive(){
            return this.rowID == this.attempt;
        },
    },
   
}
</script>

<style lang="scss" scoped>
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