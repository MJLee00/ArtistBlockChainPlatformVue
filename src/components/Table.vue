<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }" > 
     <span slot="action" slot-scope="record, item">
          <a @click="handleEdit(record,item)">Show Photos</a>
        </span>
  </a-table>
</template>
<script>
const columns = [
    {
    title: 'CertNo',
    dataIndex: 'CertNo',
    width: 150,
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    width: 150,
  },
  
  {
    title: 'Params',
    dataIndex: 'Params',
  },
   {
    title: 'Photo',
    dataIndex: 'Photo',
      scopedSlots: { customRender: 'action' }, 
  },
   {
    title: 'Date',
    dataIndex: 'Date',
  }
];

export default {
    props:["data"],
  data() {
    return {
      columns,
    };
  },
  methods:{
    //photos record the column value,item record current row object
    handleEdit(photos,item){
      console.log(item)
      var photos=JSON.parse(photos);
      var win = window.open();  //打开新的空白窗口
      for(var i=0;i<photos.length;i++){
        console.log(this.$root.URL+photos[i])
         win.document.write ("<img src="+this.$root.URL+photos[i]+"></img>");  //在新窗口中输出提示信息
      }
     
    }
  }
};
</script>
