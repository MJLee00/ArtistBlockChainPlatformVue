<template>
    <div class="main">
        <h2 class="txt">Log in</h2>
        <div><Form></Form></div>
    </div>
</template>
<script>
import Form from "../components/Form"
export default {
    name :'Login',
    components:{
        Form
    }
}
</script>
<style>
.main{
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-200px;
    margin-top:-200px;
    padding:20px;
    border:1px solid black;
    border-radius: 15px;
}
.txt{
    text-align: center;
}
</style>