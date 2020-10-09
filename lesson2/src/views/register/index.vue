<template>
  <div class="z-h-100">
    <van-image width="100%" height="14rem" :src="Bannber" />
    <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="姓名"
    label="姓名"
    placeholder="请填写用姓名"
    :rules="[{ required: true, message: '请填写姓名' }]"

  />
<van-field name="radio" label="性别">
  <template #input>
    <van-radio-group v-model="radio" direction="horizontal">
      <van-radio name="1">男</van-radio>
      <van-radio name="2">女</van-radio>
    </van-radio-group>
  </template>
</van-field>
 <van-field
    v-model="phone"
    name="手机号码"
    placeholder="请输入手机号码"
    label="手机号码"
    :rules="[{ pattern, message: '请输入正确手机号码' }]"
  />
  <van-field
    v-model="scholl"
    name="学校"
    label="学校及校区"
    placeholder="请填写学校名称.例如:清华大学"
    :rules="[{ required: true, message: '请填写学校名称' }]"
  />
  <van-field
  readonly
  clickable
  name="datetimePicker"
  label="毕业年份"
  placeholder="点击选择时间"
  :value="value"
  @click="showPicker = true"
  :rules="[{ required: true, message: '请填写毕业时间' }]"
/>
<van-popup v-model="showPicker" position="bottom">
  <van-datetime-picker
    v-model="currentDate"
    type="year-month"
    title="选择年月"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="showPicker = false"
    :formatter="formatter"
/>
</van-popup>

<van-field name="radio" label="是否就业">
  <template #input>
    <van-radio-group v-model="isWork" direction="horizontal" class="isWork">
      <van-radio name="1">未就业</van-radio>
      <van-radio name="2">已入职企业</van-radio>
      <van-radio name="3">实习期</van-radio>
    </van-radio-group>
  </template>
</van-field>
<van-field
  v-model="good"
  rows="2"
  autosize
  label="擅长领域"
  type="textarea"
  maxlength="50"
  placeholder="请填写擅长领域"
  show-word-limit
/>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import Bannber from './images/banner.jpg'
export default {
  name: 'register',
  data() {
    return {
      username: '',
      radio: '1',
      phone: '',
      scholl: '',
      pattern: /^1[3456789]\d{9}$/,
      showPicker: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      value: '',
      isWork: '1',
      good: '',
      Bannber
    }
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      return year + '年' + month + '月'
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    onConfirm(time) {
      console.log(time)
      this.value = this.timeFormat(this.currentDate)
      this.showPicker = false
    },
  },
}
</script>

<style lang="scss" scoped>
.van-form{
  width: 100%;
}
  .isWork{
    .van-radio{
      margin-bottom: 8px;
    }
  }
</style>
