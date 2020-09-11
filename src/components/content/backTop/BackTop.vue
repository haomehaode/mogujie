<template>
    <!-- <div class="back-top" @click="backClick"> -->
    <div class="back-top">
        <img src="~assets/img/common/top.png"  alt="">
    </div>
</template>

<script>
export default {
    name:'BackTop',
    // methods:{
    //     backClick(){
    //         console.log("回到顶部");
    //         this.$emit('backClick');
    //     }
    // }
}
</script>

<style scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 50px;
}
.back-top img{
    width: 43px;
    height: 43px;
}
</style>