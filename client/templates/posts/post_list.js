/* 
* @Author: 波
* @Date:   2016-02-04 23:57:18
* @Last Modified by:   波
* @Last Modified time: 2016-02-04 23:57:40
*/
var postsData = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  }, 
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  }, 
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];
Template.postsList.helpers({
  posts: postsData
});
