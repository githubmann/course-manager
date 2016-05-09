Tasks =  new Mongo.Collection("tasks");
Tasks.attachSchema(new SimpleSchema({
  title:{
    type:String,
    max:12,
    min:5
  },
  content:{
        type:String,
        label:'介绍内容',
        autoform:{
            type:'markdown',
            afFieldInput:{
                placeholder:'请用markdown格式'
            }
        }
    },
  publisherId:{
    type:String,
    autoform:{
      type:'hidden'
    }
  },
  courseId:{
    type:String,
    autoform:{
      type:'hidden'
    }
  },
  createAt:{
    type:String,
    autoform:{
      type:'hidden'
    }
  },
  deadLine:{
    type:String,
    autoform:{
      type:'date'
    }
  },
  fileId:{
    type:String,
    label:'请输入你要上传的输入',
    autoform:{
      type:'fileUpload',
      collection:'taskfiles'
    }
  }
  }
));
Tasks.allow({
  insert: function(){
   return true;
   
  },
  update: function(userId, doc){
    return doc && doc.userId === userId;
  },
  remove:function () {
    return true;
  }
});