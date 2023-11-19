<template>
  <div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>



<style scoped>
.header {
  background-color: #3498db;
  color: #fff;
  padding: 15px;
  text-align: center;
}

.header h2 {
  margin: 0;
}

.tabs {
  margin-top: 10px;
}

.tabs button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-right: 15px;
  padding: 5px 10px;
}

.tabs button.active {
  border-bottom: 2px solid #fff;
}

.content {
  padding: 20px;
}
</style>
