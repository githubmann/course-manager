Courses =  new Mongo.Collection("posts");
Courses.attachSchema(new SimpleSchem({
    name:{
        type:String,
        max:5,
        min:12,
        label:'课程名'
    },
    introduce:{
        type:String,
        label:'介绍内容',
        autoform:{
            type:'markdown',
            afFieldInput:{
                placeholder:'请用markdown格式'
            }
        }
    },
    cover:{
      label:'封面',
      type:String,
      afFieldInput:{
        //引入autoform-file包 的预览功能===fileUpload
        type:'fileUpload',
        accept:'image/*',
        collection:'coursecovers'
      }
    },
    publisherId:{
      type:String
    }
}));
Posts.allow({
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
Meteor.methods({
    courseInsert:function (course) {
      check(course,{name:String,introduce:String});
      //抛出错误
      var errors = validateCourse(course);
      if(errors.name || errors.introduce){
        throw new Meteor.Error('invalid-post','你必须',errors.name,errors.introduce);
      }
        course = _.extend(course,{
        publisherId:Meteor.userId(),
        createAt:new Date(),
        memberNum:0
      });
      var courseId = Courses.insert(course);
      console.log('返回courseId');
      return  courseId;
    }
  });