
/* 
* @Author: 波
* @Date:   2016-02-05 20:10:50
* @Last Modified by:   howtosay111
* @Last Modified time: 2016-05-04 13:29:02
*/

Template.postItem.helpers({
  domain:function  () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost:function () {
    return this.userId === Meteor.userId();
  },

});