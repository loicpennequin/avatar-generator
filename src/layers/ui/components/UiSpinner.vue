<template>
  <Icon name="svg-spinners:90-ring-with-bg" class="ui-spinner" />
</template>

<style scoped>
@keyframes spinner {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(1turn);
  }
}
.ui-spinner {
  animation: spinner 2s ease infinite;
}
</style>
