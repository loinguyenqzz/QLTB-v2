<script setup>
import MButton from "../components/MButton.vue"
import MButtonIcon from '../components/MButtonIcon.vue'
import MButtonAdd from '../components/MButtonAdd.vue'
</script>

<template>
    <MButton type="style1">Nhập khẩu</MButton>
    <MButton type="style2">Nhập khẩu</MButton>
    <MButtonIcon icon="">Nhập khẩu</MButtonIcon>
    <MButtonAdd>Thêm mới thiết bị</MButtonAdd>
    <div class="btn-sigle-icon">
        <img src="../assets/Icons/ic_Edit.png" alt="">
    </div>
    <div class="btn-sigle-icon">
        <img src="../assets/Icons/ic_Remove.png" alt="">
    </div>
    <div class="btn-sigle-icon">
        <img src="../assets/Icons/ic_Print.png" alt="">
    </div>
    <div class="btn-sigle-icon">
        <img src="../assets/Icons/ic_More.png" alt="">
    </div>
    <div>
        <img src="../assets/Icons/icon_down-arrow-small.svg" alt="">
    </div>
</template>

<style scoped>
.btn-sigle-icon {
    height: 25px;
    width: 25px;
    border: 1px solid #cecece;
    border-radius: 4px;
    cursor: pointer;
}
</style>