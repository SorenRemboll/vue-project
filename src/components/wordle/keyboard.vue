<template>
    <div data-keyboard class="keyboard">
        <button class="key" @click="clickEvent('Q')">Q</button>
        <button class="key" @click="clickEvent('W')">W</button>
        <button class="key" @click="clickEvent('E')">E</button>
        <button class="key" @click="clickEvent('R')">R</button>
        <button class="key" @click="clickEvent('T')">T</button>
        <button class="key" @click="clickEvent('Y')">Y</button>
        <button class="key" @click="clickEvent('U')">U</button>
        <button class="key" @click="clickEvent('I')">I</button>
        <button class="key" @click="clickEvent('O')">O</button>
        <button class="key" @click="clickEvent('P')">P</button>
        <div class="space"></div>
        <button class="key" @click="clickEvent('A')">A</button>
        <button class="key" @click="clickEvent('S')">S</button>
        <button class="key" @click="clickEvent('D')">D</button>
        <button class="key" @click="clickEvent('F')">F</button>
        <button class="key" @click="clickEvent('G')">G</button>
        <button class="key" @click="clickEvent('H')">H</button>
        <button class="key" @click="clickEvent('J')">J</button>
        <button class="key" @click="clickEvent('K')">K</button>
        <button class="key" @click="clickEvent('L')">L</button>
        <div class="space"></div>
        <button class="key large" @click="clickEvent('enter')">Enter</button>
        <button class="key" @click="clickEvent('Z')">Z</button>
        <button class="key" @click="clickEvent('X')">X</button>
        <button class="key" @click="clickEvent('C')">C</button>
        <button class="key" @click="clickEvent('V')">V</button>
        <button class="key" @click="clickEvent('B')">B</button>
        <button class="key" @click="clickEvent('N')">N</button>
        <button class="key" @click="clickEvent('M')">M</button>
        <button class="key large" @click="clickEvent('delete')">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
          </svg>
        </button>
    </div>
</template>

<script>
    export default {
      methods:{
        clickEvent(letter){
          this.$emit('letter',letter);
        }
      }
    }
</script>

<style lang="scss" scoped>
    .keyboard {
        display: grid;
        grid-template-columns: repeat(20, minmax(auto, 1.25em));
        grid-auto-rows: 3em;
        gap: .25em;
        justify-content: center;
      }
      
      .key {
        font-size: inherit;
        grid-column: span 2;
        border: none;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: hsl(
          var(--hue, 200),
          var(--saturation, 1%),
          calc(var(--lightness-offset, 0%) + var(--lightness, 51%))
        );
        color: white;
        fill: white;
        text-transform: uppercase;
        border-radius: .25em;
        cursor: pointer;
        user-select: none;
      }
      
      .key.large {
        grid-column: span 3;
      }
      
      .key > svg {
        width: 1.75em;
        height: 1.75em;
      }
      
      .key:hover {
        --lightness-offset: 10%;
      }
      
      .key.wrong {
        --lightness: 23%;
      }
      
      .key.wrong-location {
        --hue: 49;
        --saturation: 51%;
        --lightness: 47%;
      }
      
      .key.correct {
        --hue: 115;
        --saturation: 29%;
        --lightness: 43%;
      }
</style>