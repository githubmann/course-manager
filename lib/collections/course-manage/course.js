Courses =new Mongo.Collection('courses');
var validateCourse = function (course) {
  var errors = {};
  if(!course.name){
    errors.name = '请填写标题';
  }
  if(!course.introduce){
    errors.introduce = '请填写url';
  }
  return errors;
};
  Courses.allow({
    //当userId跟post的userId一致的时候返回true
    update:function (userId,course) {
      return ownsDocument(userId,course);
    },
    //当userId跟post的userId一致的时候返回true
    remove:function (userId,course) {
      return ownsDocument(userId,course);
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
