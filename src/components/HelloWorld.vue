<template>
    <div v-pre v-cloak>{{hello mamam}}</div>
    <div class="hello">

        <ul class="ul">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
        {{mf}}
    </div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
<script>
import {toggle} from "./mixin"
export default {
    name: 'HelloWorld',
    mixins:[toggle],
    props: {
        msg: String,
    },
    mounted(){
        let ul = document.getElementsByClassName("ul")[0];
        ul.addEventListener("click",(e)=>{
            console.log(e.target)
        })
        console.log("this is from hello");
    },
    setup() {
        console.log('das')
        return {
            mf: 'hello',
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
