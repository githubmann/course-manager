Courses =  new Mongo.Collection("courses");
Courses.attachSchema(new SimpleSchema({
    name:{
        type:String,
        max:12,
        min:5,
        label:'课程名'
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
    memberNum:{
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
    coverId:{
      label:'封面',
      type:String,
      autoform:{
        afFieldInput:{
          //引入autoform-file包 的预览功能===fileUpload
          type:'fileUpload',
          accept:'image/*',
          collection:'coursecovers'
        }
      } 
    }
}));
Courses.allow({
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
