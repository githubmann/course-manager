
/////////////
////////// //
// 布局模板    //
// 加载模板    //
// 404模板   //
//  //     //
////////// //
/////////////
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
//////////////////////////////////////////////////////////
///////////////////////////////////////
// var fs2=require('fs');
if (Meteor.isServer) {
  var fs = Meteor.npmRequire("fs");
  var dataFile = function () {
    var file;
    //taskfiles+objectId
    var tmp = this.params._id.split('files');
    if( tmp[0] === 'task'){
        console.log('task');
        console.log(this.params._id);
        file = TaskFiles.findOne(tmp[1]);
    }else if (tmp[0] ==='homework') {
        console.log('homework');
        file = TaskFiles.findOne(tmp[1]);
    }
    else {
      return ;
    } 
    var colletionName = file.collectionName;
    var path = file.copies[colletionName].key;
    var fileUrl = 'D:/meteor/microscope/.meteor/local/cfs/files/'+colletionName+'/'+path;
    console.log('step2',fileUrl);
    this.response.writeHead(200,{
        'Content-Type':file.type(),
        'Content-Disposition':'attchment;filename='+file.name(),
        'Cotent-Length':file.size()
    });
     fs.createReadStream(fileUrl).pipe(this.response);
  };
}
/////////////////////////////////////////////////////////////////
Router.route('/taskfile/:_id',dataFile,{where:'server'});

Router.route('/task',{
  name:'taskList',
  waitOn:function () {
    Meteor.subscribe('taskList');
  }
});
//详情页 
Router.route('/task/:_id',{
  name:'taskPage',
  waitOn:function () {
    return Meteor.subscribe('taskPage',this.params._id);
  },
  data:function () {
    return Tasks.findOne(this.params._id);
  }
});
//编辑页//
Router.route('/task/:_id/edit',{
  name:'taskEdit',
  waitOn:function(){
   return Meteor.subscribe('taskPage',this.params._id);
  },
  data:function () {
    return Tasks.findOne(this.params._id);
  }
});
//提交页
Router.route('/tasks/submit/:_id',
    {name:'taskSubmit',
      data:function () {
      return {courseId:this.params._id};
    }
  });
////////////////////////////////////////////////////////////////////////////
//course路由
Router.route('/course',{
  name:'courseList',
  waitOn:function () {
    Meteor.subscribe('courseList');
  }
});
//详情页
Router.route('/course/:_id',{
  name:'coursePage',
  waitOn:function () {
    return Meteor.subscribe('coursePage',this.params._id);
  },
  data:function () {
    return Courses.findOne(this.params._id);
  }
});
//编辑页
Router.route('/course/:_id/edit',{
  name:'courseEdit',
  waitOn:function(){
   return Meteor.subscribe('coursePage',this.params._id);
  },
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
