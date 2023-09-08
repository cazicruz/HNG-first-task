var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/api', function (req, res) {
  const {slack_name, track} = req.query;
  const github_file_url = '1234 git hub links';
  const github_repo_url = '1234 git hub links';
  let date = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const current_day = daysOfWeek[date.getDay()];
  const utc_time = date.toISOString().replace(/\.\d+Z$/, 'Z');;
  res.json({
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    'status_code':200
  });
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const file = req.file;
  const size = file.size;
  const fileType = file.mimetype;
  console.log({file})
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json({
    name:file.originalname,
    type:fileType,
    size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
