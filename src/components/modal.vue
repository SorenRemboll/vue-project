<template>
    <div class="modal">
        <div class="modal-bg"></div>
        <div class="modal-content">
            <h1>You should reset yo counter</h1>
            <label for="newCounter">New counter</label>
            <input type="text" id="newCounter" ref="input" @input="trimLetters()">
            <button @click="submit()">Set Counter</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
          showModal:Boolean  
        },
        methods:{
            trimLetters(){
                let input = this.$refs.input;
                input.value = input.value.split('').filter(e => !isNaN(e)).join('');
            },
            submit(){
                console.log('submit' + this.$refs.input.value);
                if (this.$refs.input.value > 10){
                    return
                }
                console.log('fire');   
                this.$emit('setNew',this.$refs.input.value)
            }
        },
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal{
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        display: grid;
        place-items: center;
        z-index: 2;
        .modal-bg{
            background-color: rgba($color: #000000, $alpha: 0.5);
            width: 100vw;
            height: 100vh;
            position: absolute;
            z-index: 3;
        }
        .modal-content{
            z-index: 4;
            background-color: white;
            position: relative;
            width: 40%;
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            flex-direction: column;
            button{
                margin-top: 5px;
            }
        }
    }
</style>