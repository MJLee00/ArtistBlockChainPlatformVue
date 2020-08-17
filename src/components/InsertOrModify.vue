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
        v-decorator="['certNo', { rules: [{ required: true, message: 'Please input your Certification Number!' }] }]"
      />
    </a-form-item>

  <a-form-item label="Params">
      <a-input 
        v-decorator="['params', { rules: [{ required: true, message: 'Please input your paramters!' }] }]"
      />
    </a-form-item>


    <a-form-item label="Image">
      <div class="clearfix">
          <a-upload
            :customRequest="uploadFile"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            :remove="handleDownloadFileRemove"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
      <a-button type="primary" html-type="submit" class="btn">
        {{btName}}
      </a-button>
    </a-form-item>

  </a-form>
  <Load v-if="showLoad"></Load>
</div>
</template>

<script>
import Load from "../components/Load"
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  components:{
    Load
  },
  props:["apiName","btName"],
  data: () => ({
    showLoad:false,
    count:0,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    },
  }),
 
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  methods: {
    //process upload image
    uploadFile(data){
        const formData = new FormData()  
        formData.append('file', data.file) 
        
        this.$http.post(this.$root.URL+'/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                let file ={
                    uid: '-'+ ++this.count,
                    name:response.body["result"]["fileName"],
                    url:this.$root.URL+response.body["result"]["path"],
                    path:response.body["result"]["path"]
                }
            
             this.fileList.push(file)
            }, response => {
              // error callback
            });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
   
    handleDownloadFileRemove (file) {  
        const index = this.fileList.indexOf(file)  
        const newFileList = this.fileList.slice()  
        newFileList.splice(index, 1)  
        this.fileList = newFileList  
    },
    //process submit
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            var files=JSON.parse(JSON.stringify(this.fileList));
            var photoPath=[];
            for(var i=0;i<files.length;i++)
               photoPath.push(this.fileList[i]["path"]);
      
            //show load
            this.showLoad=true;
         
            this.$http.get(this.$root.URL+"/"+this.apiName,
            {params:{type: values["type"], certNo:values["certNo"],params:values["params"],
            date:  this.$yuns.format(new Date(),'yyyy/MM/dd hh:mm:ss'),
            photo:JSON.stringify(photoPath)}})
            .then(response => {
              if(response.status==200){
                this.$router.push("Success")
              }
              console.log(response.status);
              console.log(response.body);
            }, response => {
              // error callback
              this.showLoad=false;
              alert(response.bodyText)
            });
        }

      });
    }
  },
};
</script>
<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
.btn{
  margin-top:20px
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>