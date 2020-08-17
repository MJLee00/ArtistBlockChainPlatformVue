<template>
<div>
  <a-form
    id="components-form-demo-validate-other"
    :form="form"
    v-bind="formItemLayout"
    @submit="handleSubmit"
  >
 
    <a-form-item label="CertNo">
          <a-input
            v-decorator="['certNo', { rules: [{ required: true, message: 'Please input your certification number!' }] }]"
          />
      </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">
        History
      </a-button>
    </a-form-item>
  </a-form>
  <Load v-if="showLoad"></Load>
   <!--using props to transfer data-->
  <Table :data="arts"></Table>
</div>
</template>

<script>
 import Table from "../components/Table"
 import Load from "../components/Load"
export default {
   components:{
       Table,
         Load
   },
  data: () => ({
    arts:[],
    showLoad:false,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    },
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);   
          this.showLoad=true;
            this.$http.get(this.$root.URL+'/query2', {params:{ certNo:values["certNo"]}}).then(response => {
              console.log(response.status);
              console.log(response.body);
                if(response.body["Art"]["Historys"]!=null){
                  var arts=[];
                  for(var i=0;i<response.body["Art"]["Historys"].length;i++){
                      response.body["Art"]["Historys"][i]["Artist"]["key"]=(i+1).toString();
                      var art=response.body["Art"]["Historys"][i]["Artist"];
                        arts.push(art);
                  }
                  this.arts=arts;
                  this.showLoad=false;
                }
                else{
                     this.showLoad=false
                     alert(response.body["Msg"])
                }
            }, response => {
              // error callback
              this.showLoad=false
              alert(response.bodyText)
            });
        }

      });
    },
  },
};
</script>
<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
</style>