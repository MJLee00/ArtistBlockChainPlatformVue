<template>
  <a-result
    status="success"
    title="Successfully Option"
    sub-title=""
  >
    <template #extra>
      <a-button key="console" type="primary" @click='navigate("Insert")'>
        Insert
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    navigate(e){
      this.$router.push(e)
    }
  }
};
</script>