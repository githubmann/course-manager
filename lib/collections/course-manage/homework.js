Homeworks =new Mongo.Collection('homeworks');
var validateHomework = function (homework) {
  var errors = {};
  if(!homework.name){
    errors.name = '请填写标题';
  }
  if(!homework.content){
    errors.content = '请填写url';
  }
  return errors;
};
  Homeworks.allow({
    //当userId跟post的userId一致的时候返回true
    update:function (userId,homework) {
      return ownsDocument(userId,homework);
    },
    //当userId跟post的userId一致的时候返回true
    remove:function (userId,homework) {
      return ownsDocument(userId,homework);
    }
  });