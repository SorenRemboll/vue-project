<template>
  <div id="game">
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
      waiting: false,
      showGame:false,
    };
  },
  mounted(){
    document.addEventListener('keydown',(e) => {
      if(e.key == 'Escape'){
        this.$refs.keyboard.reset();
        this.$refs.gameRows.forEach(row => row.clean());
        this.gameStore.reset(false);
        this.showGame = false;
      }
    } )
    console.log(this.gameStore.currentWord);
  },
  methods: {
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
          this.waiting = false;
          this.$refs.keyboard.reset();
          this.$refs.gameRows.forEach(row => row.clean());
          this.gameStore.reset(answer.isConfirmed);
          if(!answer.isConfirmed){
            this.showGame = !this.showGame;
          }
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
          this.waiting = false;
          this.$refs.keyboard.reset();
          this.$refs.gameRows.forEach(row => row.clean());
          this.gameStore.reset(answer.isConfirmed);
          if(!answer.isConfirmed){
            this.showGame = !this.showGame;
          }
        });
      }
      
    },
    rowDone(){
        this.waiting = false;
    },
    handleEmit(payload) {
        if(this.waiting){
            return
        }
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
        this.waiting = true;
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
    }
  },
};
</script>
<style lang="scss">
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
