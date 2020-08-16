<template>
  <div class="home">
    <van-nav-bar title="公告通知" />
    <swiper />
    <router-link v-for="item in list" :key="item.id" :to="{path: `/des/${item.id}`}">
      <div class="info">
        <div class="title">{{item.title}}</div>
        <div class="desBox">
          <div class="des">{{item.detail}}</div>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Swiper from '@/components/swiper' // secondary package based on el-pagination
import { announcementList } from '@/api/index'

export default {
  name: 'home',
  components: { Swiper },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      announcementList().then((res) => {
        this.list = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.info {
  padding: 10px;
  margin: 10px;
  background: #fff;
  text-align: left;
  color: #000;
}

.des {
  padding: 10px 0;
  color: #989898;
}
.time {
  text-align: right;
  color: #ccc;
}
</style>>
