<template>
  <div class="comment-info">
    <div class="head">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div
      class="main"
      v-for="item in commentInfo"
      :key="item.created"
    >
      <div class="user-info">
        <img :src="item.user.avatar">
        <span>{{ item.user.uname }}</span>
      </div>
      <div class="comment">{{ item.content }}</div>
      <div class="other-info">
        <!-- 1. 将时间戳转成 Date 对象 new Date(time * 1000) 时间戳单位是s，Date中要求传的是ms -->
        <!-- 2. 将 date 格式化，转成对应字符串 -->
        <!-- fmt.format(date 'yyyy-MM-dd hh:mm:ss') -->
        <!-- h(12小时) H(24小时) -->
        <span class="date">{{ item.created | transDate }}</span>
        <span class="style">{{ item.style }}</span>
      </div>
      <div
        class="img-gallery"
        v-if="item.images"
      >
        <img
          :src="img"
          v-for="img in item.images"
          :key="img"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'

export default {
  props: {
    commentInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    transDate (value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.comment-info {
  margin-top: 20px;
  border-top: 5px solid rgba(100, 100, 100, 0.2);
  padding: 0 10px 10px;
  border-bottom: 5px solid rgba(100, 100, 100, 0.2);
}

.head {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
}

.user-info {
  margin: 5px 0;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
}

.user-info img {
  height: 100%;
  margin-right: 8px;
}

.comment {
  font-size: 14px;
}

.other-info {
  margin: 5px 0;
  font-size: 14px;
}

.date {
  margin-right: 8px;
}

.img-gallery {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.img-gallery > img {
  width: 22%;
  margin-right: 2%;
  border-radius: 5px;
}
</style>
