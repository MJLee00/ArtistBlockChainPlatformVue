<template>
<div>
  <a-form
    id="components-form-demo-validate-other"
    :form="form"
    v-bind="formItemLayout"
    @submit="handleSubmit"
  >
    <a-form-item label="Type" has-feedback>
      <a-select
        v-decorator="[
          'type',
          { rules: [{ required: true, message: 'Please select your type!' }] },
        ]"
        placeholder="Please select a type"
      >
        <a-select-option value="jade">
          Jade
        </a-select-option>
        <a-select-option value="fan">
          Fan
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="CertNo">
          <a-input
            v-decorator="['certNo', { rules: [{ required: true, message: 'Please input your certification number!' }] }]"
          />
      </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">
        Search
      </a-button>
    </a-form-item>
  </a-form>
  <Load v-if="showLoad"></Load>
   <Description :data="result" :photos="photos"></Description>
</div>
</template>

<script>
import Description from "../components/Description"
import Load from "../components/Load"
export default {
  components:{
    Description,
    Load
  },
  data: () => ({
    showLoad:false,
    result:{CertNo:"",Tyep:"",Date:"",Params:""},
    photos:[],
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
            this.$http.get(this.$root.URL+'/query', {params:{type: values["type"], certNo:values["certNo"]}}).then(response => {
               this.showLoad=false;
              this.result=response.body["Art"];
              console.log(this.result.CertNo)
              if(this.result["CertNo"]!=""){
                console.log(this.result)
                var photos=JSON.parse(this.result["Photo"]);
                for(var i=0;i<photos.length;i++)
                photos[i]=this.$root.URL+photos[i];
                this.photos=photos;
                console.log(this.photos)
              }
              else{
                   this.showLoad=false
                alert(response.body["Msg"])
              }
            }, response => {
              // error callback
              this.showLoad=false;
              alert(response.bodyText)
            });
        }

      });
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
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