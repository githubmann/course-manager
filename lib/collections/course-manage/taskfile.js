 TaskFiles = new FS.Collection("taskfiles", {
  stores: [new FS.Store.FileSystem("taskfiles")]
});
TaskFiles.allow({
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