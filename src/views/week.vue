<template>
    <div class="week" :style="{background:'url('+back+')'}">
        <div class="camera">
            <ul class="stage">
                <li class="box" v-for="(item, index) in list" :key="index">
                    <div class="task">{{item.task}}</div>
                    <div class="record">{{item.record}}</div>
                    <div class="habit">{{item.habit}}</div>
                    <div class="diary">{{item.diary}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.camera{
    width:100%;
    height:400px;
    perspective: 500px;
    perspective-origin: center center;
    margin-top: 100px;
    padding: 20px;
}
.stage{
    transform-style:preserve-3d;
    display: flex;
    width: 100%;
    height:100%;
    overflow: auto;
}
.box{
    transform: translateX(50px) translateY(50px) rotateY(45deg);
    border:1px solid #ddd;
    margin:10px;
}
.week{
    position:fixed;
    width:100%;
    height:100%;
    background-size:100% 100% !important;
    background-image:linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)
}
</style>

<script>
export default {
    data(){
        return {
            list:[
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
                {
                    task:"dasdasdasdasdqweqcxz",
                    record:"dsadasqwsda",
                    diary:"hello i am win",
                    habit:"go on"
                },
            ],
            back: require("./../assets/g2.jpg")
        }
    }
}
</script>

<style>

</style>