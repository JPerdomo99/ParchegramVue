<template>
  <div class="noMoreComponent">
    <p v-if="showNoMore" class="no-more">No hay mas publicaciones para mostrar</p>
  </div>
</template>

<script>
export default {
  props: {
    showNoMore: Boolean
  }
}
</script>

<style>
  .no-more {
    text-align: center;
    padding: 25px;
    font-size: 20px;
    color: #828387;
  }
</style>
