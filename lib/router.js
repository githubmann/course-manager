//////////
// 布局模板
// 加载模板
// 404模板
//  //
//////////
Router.configure({
  layoutTemplate:'layout',
  loadingTemplate:'loading',
  notFoundTemplate:'notFound',
  waitOn:function () {
    return Meteor.subscribe('posts');
  },
});
/////////////////
// 路由规则，json对象 //
//列表页          //
/////////////////
Router.route('/',{name:'postsList'});
//详情页
Router.route('/posts/:_id',{
  name:'postPage',
  waitOn:function () {
    return Meteor.subscribe('comments',this.params._id);
  },
  data:function () {
    //打印出Posts.findOne查询出来的数据
        console.log(Posts.findOne(this.params._id));
        return Posts.findOne(this.params._id);
  }
});
//编辑页
Router.route('/posts/:_id/edit',{
  name:'postEdit',
  data:function () {
    return Posts.findOne(this.params._id)
  }
});
//提交页
Router.route('/submit',{name:'postSubmit'});
//////////////////////////////////////////////////////////////////////////////
//information 个人信息编辑页
Router.route('/information/:_id/edit',{
  name:'informationEdit',
  data:function () {
    return Meteor.users.find({_id:this.params._id}).profile;
  }
});
//个人详情页
Router.route('/information/:_id',{
  name:'informationPage',
  data:function () {
    return Meteor.users.findOne({_id:this.params._id});
  }
});
///////////////////////////////////////////////////////////////////////
// /计划
//列表页
Router.route('/plan',{
  name:'planList',
  waitOn:function () {
    Meteor.subscribe('plans');
    console.log('Plans.find()',Plans.find());
  },
});
//详情页
Router.route('/plans/:_id',{
  name:'planPage',
  waitOn:function () {
    Meteor.subscribe('plans',this.params._id);
  },
  //给planPage上下文加载数据
  data:function () {
        console.log('this.params._id',this.params._id);
        console.log('Plans.find(this.params._id)',Plans.find(this.params._id));
        return Plans.findOne(this.params._id);
  }
});
//编辑页
Router.route('/plans/:_id/edit',{
  name:'planEdit',
  waitOn:function () {
    Meteor.subscribe('plans',this.params._id);
  },
  data:function () {
    return Plans.findOne(this.params._id);
  }
})
//提交页
Router.route('/plan/submit',{name:'planSubmit'});
//////////////////////////////////////////////////////////////////////
// /员工
//列表页
Router.route('/employees',{
  name:'employeeList',
  //我将打印出Meteor.users
});
//详情页
Router.route('/employees/:_id',{
  name:'employeePage',
  //给planPage上下文加载数据
  data:function () {
         //我将打印出Meteor.users.find({_id:this.params._id});
        return Meteor.users.findOne({_id:this.params._id});
  }
});
//编辑页
Router.route('/employees/:_id/edit',{
  name:'employeeEdit',
  data:function () {
   //我将打印出Meteor.users.find({_id:this.params._id});
      
      console.log('我将打印出Meteor.users.find({_id:this.params._id});');
      return Meteor.users.findOne({_id:this.params._id});
  }
})
//提交页
// /employees/submit会渲染错模板---会渲染employeePage模板
Router.route('/employee/submit',{name:'employeeSubmit'});
///////////////////////////////////////////////////////////////////////
Router.route('/profile',{
  name:'profile',
waitOn:function () {
  return [Meteor.subscribe('links')];
}
})
///////////////////////////////////////////////////
Router.route('/dept',{
  name:'deptList',
  waitOn:function () {
  return [Meteor.subscribe('depts')];
}
});
Router.route('/dept/submit',{
  name:'deptSubmit'
});
Router.route('/dept/:_id',{
  name:'deptPage',
  waitOn:function () {
    return Meteor.subscribe('depts');
  },
  data:function () {
    return Depts.findOne(this.params._id);
  }
});
////////////////////////////////////////////////////////////////////////////
Router.route('/task',{
  name:'taskList',
  waitOn:function () {
    Meteor.subscribe('tasks');
  }
});
//详情页
Router.route('/task/:_id',{
  name:'taskPage',
  waitOn:function () {
    return Meteor.subscribe('tasks',this.params._id);
  },
  data:function () {
    return Tasks.findOne(this.params._id);
  }
});
//编辑页
Router.route('/task/:_id/edit',{
  name:'taskEdit',
  data:function () {
    return Tasks.findOne(this.params._id);
  }
});
//提交页
Router.route('/tasks/submit',{name:'taskSubmit'});
////////////////////////////////////////////////////////////////////////////
//course路由
Router.route('/course',{
  name:'courseList',
  waitOn:function () {
    Meteor.subscribe('courses');
  }
});
//详情页
Router.route('/course/:_id',{
  name:'coursePage',
  waitOn:function () {
    return Meteor.subscribe('courses',this.params._id);
  },
  data:function () {
    return Courses.findOne(this.params._id);
  }
});
//编辑页
Router.route('/course/:_id/edit',{
  name:'courseEdit',
  data:function () {
    return Courses.findOne(this.params._id);
  }
});
//提交页
Router.route('/courses/submit',{name:'courseSubmit'});

////////////////////////////////////////////////////////////////////////////
//homework列表
Router.route('/homework',{
  name:'homeworkList',
  waitOn:function () {
    Meteor.subscribe('homeworks');
  }
});
//homework详情页
Router.route('/homework/:_id',{
  name:'homeworkPage',
  waitOn:function () {
    return Meteor.subscribe('homeworks',this.params._id);
  },
  data:function () {
    return Homeworks.findOne(this.params._id);
  }
});
//homework编辑页
Router.route('/homework/:_id/edit',{
  name:'homeworkEdit',
  data:function () {
    return Homeworks.findOne(this.params._id);
  }
});
//homework提交页
Router.route('/homeworks/submit',{name:'homeworkSubmit'});



////////////////////////////////////////////////////////////
//登陆前检测
var requireLogin = function () {
  if(!Meteor.user()){
    this.render('accessDenied');
  }else{
    this.next();
  }
};
Router.onBeforeAction('dataNotFound',{only:'postPage'});
Router.onBeforeAction(requireLogin,{only:'postSubmit'});
//文件下载路由
