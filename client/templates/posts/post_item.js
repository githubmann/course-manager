/* 
* @Author: 波
* @Date:   2016-02-05 20:10:50
* @Last Modified by:   波
* @Last Modified time: 2016-02-05 20:12:49
*/

Template.postItem.helpers({
  domain:function  () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
})