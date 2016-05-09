 CourseCovers = new FS.Collection("coursecovers", {
  stores: [new FS.Store.FileSystem("coursecovers")]
});
CourseCovers.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  download:function () {
    return true;
  }
  
});