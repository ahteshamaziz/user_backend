const express = require('express');
const app = express();
const mongoose = require('mongoose')
const http = require('http');
const httpServer = http.createServer(app);
const ObjectId = mongoose.Types.ObjectId;
var multer  = require('multer');
var cors = require('cors');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
var path = require('path');

 const userRoutes = require('./routes/user.js');

 const user = require('./models/user');

//  app.use(cors());
//  app.options('*', cors())


app.use(cors({origin: [
  'http://localhost',
  "http://localhost:4200",
  "http://localhost:8100",
  "http://127.0.0.1:8081",

  
], credentials: true}));

 

 app.use(userRoutes);







aws.config.update({
    secretAccessKey:'Jr33MgXBSxn+bD1MvusjD1vWzf/8WYPk53fT9dh8',
    accessKeyId:'AKIAINJY3AKNKA2Y54HQ',
    region:'us-east-1'
})



    
        var s3 = new aws.S3()
        var upload = multer({
            storage: multerS3({
            s3: s3,
            bucket: 'cctech/img',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
            }
            })
        })


        app.post('/createUser', upload.single('image'), (req, res, next) => {
            // Create a new image model and fill the properties
            console.log(req.body);
          
            var newImage = new user();
          
            newImage.First_name = req.body.First_name;
            newImage.Last_name = req.body.Last_name;
            newImage.Email = req.body.Email;
            newImage.Phone_number = req.body.Phone_number;
            newImage.Profile = req.file.location;
        
        
          
            newImage.save(err => {
                if (err) {
                    return res.sendStatus(400);
                }
                res.status(201).send({ newImage });
            });
          });




const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use( express.static(path.join(__dirname + '/dist_new/user')));






mongoose
  .connect(
  'mongodb://54.243.18.152:27017/user',
{ useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true }
  )
  .then(result => {
    httpServer.listen(8000);
    console.log('Listening to port 8000')
  })
  .catch(err => {
    console.log(err);
  });


