<template>
  <div id="game">
    <div v-if="this.gameStore.difficulty == 'hard'" :class="timeColor" class="hardTimer">
      <p>{{timerVar}} <i class="fa-solid fa-stopwatch"></i></p>
    </div>
    <Transition>
      <GamePrompt v-if="showGame == false" @start="startGame" />
    </Transition>  
    
    <Transition>
    <div v-if="showGame" class="gameContainer">
      <div class="gameBoxes">
        <GameRow
          ref="gameRows"
          @painted="painted"
          @rowDone="rowDone"
          :rowID="index"
          :attempt="this.gameStore.attempt"
          v-for="(gameRow, index) in this.gameStore.amountOfAttempts"
          :key="index"
        />
      </div>
      <Keyboard ref="keyboard" @letter="handleEmit" />
    </div>
    </Transition>
  </div>
</template>
<script>
import { wordleStore } from "!/wordleStore";
import Swal from "sweetalert2";
import Keyboard from "@/components/wordle/keyboard.vue";
import GameRow from "@/components/wordle/gameRow.vue";
import gamePrompt from "@/components/wordle/gamePrompt.vue";
export default {
  components: {
    Keyboard,
    GameRow,
    GamePrompt:gamePrompt,
  },
  setup() {
    return { gameStore: wordleStore() };
  },
  data() {
    return {
      showGame:false,
      timerVar: 30,
    };
  },
  mounted(){
    this.gameStore.$subscribe((mutation) => {
      if(mutation.events.key == 'menuClicked'){
        if(mutation.events.newValue == 'reset'){
          this.resetGame(true)
        }
        if(mutation.events.newValue == 'back'){
          this.resetGame(false)
        }
      }
    });
    document.addEventListener('keydown',(e) => {
      if(e.key == 'Escape'){
        this.resetGame(false);
      }
    });
  },
  methods: {
    timer(){
      if(this.timerVar == 0){
        Swal.fire({
          title: `You ran out of time.. The word was ${this.gameStore.currentWord.toUpperCase()}.`,
          text: "Better luck next time!",
          icon: "error",
          confirmButtonText:'Restart with same settings',
          showCancelButton:true,
          cancelButtonText:'Back to menu'
        }).then((answer) => {
          this.resetGame(answer.isConfirmed)
        });
        return
      }
      this.timerVar--;
      setTimeout(this.timer,1000)
    },
    painted(didYouWin) {
      if (didYouWin) {
        Swal.fire({
          title: `You won in ${this.gameStore.attempt + 1} attempts!`,
          text: "Well played :)",
          icon: "success",
          confirmButtonText:'Restart with same settings',
          showCancelButton:true,
          cancelButtonText:'Back to menu'
        }).then((answer) => {
          this.resetGame(answer.isConfirmed)
        });
      }
      if (!didYouWin) {
        Swal.fire({
          title: `You lost.. The word was ${this.gameStore.currentWord.toUpperCase()}.`,
          text: "Better luck next time!",
          icon: "error",
          confirmButtonText:'Restart with same settings',
          showCancelButton:true,
          cancelButtonText:'Back to menu'
        }).then((answer) => {
          this.resetGame(answer.isConfirmed)
        });
      }
      
    },
    resetGame(bool){

      this.gameStore.blockAction = false;
      this.$refs.keyboard.reset();
      this.$refs.gameRows.forEach(row => row.clean());
      this.gameStore.reset(bool);
      if(!bool){
        this.showGame = !this.showGame;
      }
      this.gameStore.blockAction = false;
    },
    rowDone(){
        this.gameStore.blockAction = false;
    },
    handleEmit(payload) {
      if (this.gameStore.letters.length != 5 && !["delete", "enter"].includes(payload)) {
        this.gameStore.letters.push({ letter: payload, state: null });
        return;
      }
      if (payload === "delete" && this.gameStore.letters.length) {
        this.gameStore.letters = this.gameStore.letters.slice(0, -1);
        return;
      }
      if (payload === "enter") {
        if (this.gameStore.letters.length != 5) {
          Swal.fire({
            title: "You need to fill out all 5 letters!",
            icon: "error",
          });
          return;
        }
        if (this.gameStore.validate()) {
          this.gameStore.addToAttempts();
          this.$refs.gameRows[this.gameStore.attempt].paintRow(true);
        } else {
          this.gameStore.addToAttempts();
          this.$refs.gameRows[this.gameStore.attempt].paintRow();
        }
      }
    },
    startGame(){
      this.showGame = true;
      if(this.gameStore.difficulty == 'hard'){
        this.timer()
      }
    }
  },
  computed:{
    timeColor(){
      let colorClass = 'neutral';
      if(this.timerVar < 20){
        colorClass = 'yellow'
      }
      if(this.timerVar < 10){
        colorClass = 'red';
      }
      if(this.timerVar < 5){
        colorClass = 'critical';
      }
      return colorClass
    }
  }
};
</script>
<style lang="scss">
  .hardTimer{
    text-align: center;
    color:white;
    p{
      font-size: 30px;
    }
    &.yellow{
      color: rgb(255, 230, 0);
    }
    &.red{
      color: rgb(255, 187, 0);
    }
    &.critical{
      color: red;
    }
  }
#game {
  overflow: hidden;
  .gameBoxes {
    width: 40vw;
    background-color: rgb(57, 126, 151);
    border-radius: 15px;
    margin: 10px auto;
    padding: 15px;
    .gameRow {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1px;
      margin-top: 1px;
      .gameBox {
        transition: 0.5s;
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(48, 48, 48);
        color: white;
        p {
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
    .gameRow.active {
      .gameBox {
        background-color: rgb(0, 0, 0);
      }
    }
  }
  @media screen and (max-width: 600px) {
    .gameBoxes{
        width:80vw;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
