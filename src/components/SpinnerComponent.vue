<template>
  <div class="spinnerComponent">
    <div v-if="showSpinner" class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    showSpinner: Boolean
  }
}
</script>

<style>
.spinnerComponent {
    padding: 20px;
    display: flex;
    justify-content: center;
}
.spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid #f0f2f5;
    border-radius: 50%;
    border-top-color: #519eff;
    animation: 1s spin infinite ease-in-out;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
