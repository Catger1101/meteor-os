const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var upload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('./'));
app.use(upload());

var notepadCode = 
fs.readFileSync('root/system/apps/notepad/notepad.js', 
'utf-8');

app.get('/', function(req, res) {
  res.render('app', {
    notepadCode: notepadCode
  });
});

app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        console.log("File Uploaded",name);
        res.send('Done! Uploading files')
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})

app.listen(3000, function() {
  console.log('Started!');
});
