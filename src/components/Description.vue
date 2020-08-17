<template>
  <a-descriptions title="Product Info" layout="vertical" bordered>
    <a-descriptions-item label="Certification Number" >
      {{data["CertNo"]}}
    </a-descriptions-item>
    <a-descriptions-item label="Product Type">
      {{data["Type"]}}
    </a-descriptions-item>
    <a-descriptions-item label="Transaction Date" >
       {{data["Date"]}}
    </a-descriptions-item>
     <a-descriptions-item label="Params" :span="3">
       {{data["Params"]}}
    </a-descriptions-item>
  
    <a-descriptions-item label="Photos" :span="3">
       <img v-for="item in photos"
        :key="item"
        
      
        :src="item"
        />
    </a-descriptions-item>
  
  </a-descriptions>
</template>
<script>

export default {
    props:["data","photos"]
}
</script>>