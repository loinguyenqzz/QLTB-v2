<template>
  <div class="loading">
    <div class="loading__inner">
      <div class="loading--animation">
        <div class="circle circle--red"></div>
        <div class="circle circle--orange"></div>
        <div class="circle circle--yellow"></div>
        <div class="circle circle--green"></div>
      </div>
      <span>Đang tải</span>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.6);
}

.loading__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 50px);
  background-color: white;
  border-radius: 4px;
  height: 50px;
  width: 100px;
}

.loading--animation {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  margin: 0 5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: loading 0.8s linear infinite;
}

.circle--red {
  background-color: red;
}

.circle--orange {
  background-color: orange;
  animation-delay: 0.2s;
}

.circle--yellow {
  background-color: yellow;
  animation-delay: 0.4s;
}

.circle--green {
  background-color: green;
  animation-delay: 0.6s;
}

@keyframes loading {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>