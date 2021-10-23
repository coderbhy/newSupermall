<template>
  <div
    class="param-info"
    v-if="showParamInfo"
  >
    <table
      v-for="(table, index) in paramInfo.sizes"
      class="info-size"
      :key="index"
    >
      <tr
        v-for="(tr, indey) in table"
        :key="indey"
      >
        <td
          v-for="(td, indez) in tr"
          :key="indez"
        >{{ td }}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr
        v-for="(info, index) in paramInfo.info"
        :key="index"
      >
        <td class="info-param-key">{{ info.key }}</td>
        <td class="info-param-value">{{ info.value }}</td>
      </tr>
    </table>
    <div
      class="info-img"
      v-if="paramInfo.image.length !== 0"
    >
      <img :src="paramInfo.image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showParamInfo () {
      return Object.keys(this.paramInfo).length !== 0
    }
  },
}
</script>

<style scoped>
.param-info {
  padding: 0 20px;
}
table {
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
}

table > tr {
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  height: 30px;
  line-height: 30px;
}

table > tr > td:first-child {
  width: 60px;
  text-align: center;
}

.info-param .info-param-value {
  width: calc(100% - 60px);
  color: var(--color-high-text);
}
</style>
