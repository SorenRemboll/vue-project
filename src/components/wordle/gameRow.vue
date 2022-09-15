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
        this.gameStore.$subscribe((mutation)=>{
            this.insertLetter(mutation)
        });
    },
    data(){
        return{
            
        }
    },
    methods: {
        paintRow(){
            if (!this.isActive) {
                return
            }
            console.log('You won on attempt: ' + (this.attempt + 1) + '!')
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

</style>