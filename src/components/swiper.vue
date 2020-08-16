<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data() {
    return {
      images: [
        'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg',
        'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  img {
    height: 80vw;
    width: 100vw;
  }
}
</style>>
