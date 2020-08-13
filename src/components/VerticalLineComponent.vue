<template>
    <div class="verticalLine">
        <el-col :span="2">
            <div class="vertical-line-container">
                <div class="vertical-line"></div>
            </div>
        </el-col>
    </div>
</template>

<script>
export default {
  name: 'VerticalLine'
}
</script>

<style scoped>
    .vertical-line-container {
    display: flex;
    justify-content: center;
  }
  .vertical-line {
    width: 1px;
    height: 630px;
    background: #DCDFE6;
  }
  @media (max-width: 768px) {
    .vertical-line-container {
      display: none;
    }
  }
</style>
