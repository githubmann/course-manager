
Tasks =new Mongo.Collection('tasks');
var validateTask = function (task) {
  var errors = {};
  if(!task.title){
    errors.title = '请填写标题';
  }
  if(!task.content){
    errors.content = '请填写url';
  }
  return errors;
};
  Tasks.allow({
    //当userId跟post的userId一致的时候返回true
    update:function (userId,task) {
      return ownsDocument(userId,task);
    },
    //当userId跟post的userId一致的时候返回true
    remove:function (userId,task) {
      return ownsDocument(userId,task);
    }
  });
  Meteor.methods({
    taskInsert:function (task) {
      check(task,{title:String,content:String,deadLine:String});
      //抛出错误
      var errors = validateTask(task);
      if(errors.title || errors.content){
        throw new Meteor.Error('invalid-post','你必须',errors.title,errors.content);
      }
      var task = _.extend(task,{
        publisherId:Meteor.userId(),
        createAt:new Date()
      });
      var taskId = Tasks.insert(task);
      console.log('返回taskId');
      return  taskId;
    }
  });
