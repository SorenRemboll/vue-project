<template>
    <div id="header">
        <div class="iconList">
            <i v-if="this.gameStore.difficulty" @click="this.gameStore.handleMenues('back')" class="fa-solid fa-door-open"></i>
            <i class="fa-solid fa-ghost"></i>
            <i v-if="this.gameStore.difficulty"  @click="this.gameStore.handleMenues('reset')" class="fa-solid fa-arrow-rotate-left"></i>
        </div>
    </div>
</template>

<script>
    import { wordleStore } from '!/wordleStore';
    export default {
       setup(){
        return{gameStore:wordleStore()}
       },
    }
</script>

<style lang="scss" scoped>
    
    #header{
        .iconList{
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            gap: 30px;
            
            align-items: flex-end;
            .fa-door-open,.fa-arrow-rotate-left{
                font-size: 2.5em;
                cursor: pointer;
                transition: 0.3s;
                &:hover{
                    color: white;
                }
            }
            
        }
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 30px 0;
        i{
            color: teal;
            font-size: 5em;
        }
        .links{
            display: flex;
            gap: 15px;
            font-size: 18px;
            a{
                color: white;
                text-decoration: none;
            }
        }
    }
</style>