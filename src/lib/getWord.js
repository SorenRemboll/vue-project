import dict from './word.json';
const words = {
    getWord(){
        return dict[Math.floor(Math.random() * (dict.length - 0 + 1) + length)]
    }
}

export default words