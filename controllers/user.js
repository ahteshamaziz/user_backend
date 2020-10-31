var mongoose = require('mongoose');

const user = require('../models/user');
const ObjectId = mongoose.Types.ObjectId;


exports.getUser =(req,res)=>{
  
  user.find({})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err)
  })
}


exports.findOne = (req,res) => {
    var id = req.query.id;
    user.aggregate([
      {
        '$match': {
          '_id': ObjectId(id)
        }
      }
    
    ]).then(result => {
     
      res.send(result)
    })
    .catch(err=> console.log(err))
  }




  exports.updateUserById = (req, res)=>{

            console.log(req.body);
           
            var First_name = req.body.First_name;
            var Last_name = req.body.Last_name;
            var Email = req.body.Email;
            var Phone_number = req.body.Phone_number;
  
    var myquery = { _id: ObjectId(req.body.id) };
  
    var newvalues = { 
        First_name:First_name,
        Last_name :Last_name,
        Email:Email,
        Phone_number:Phone_number
    }
  
    user.findOneAndUpdate(myquery, newvalues, function(err, result){
      if (err) throw err;
      console.log("1 document Update")
      var success = [{mssg: "success"}];
      res.send(success);
    });
     }





     exports.deleteUser =(req,res) => {
        var id = req.query.id;
        console.log(id);
        user.deleteOne({_id:ObjectId(id)}, err =>{
          if(err){
            throw err
          }else{
            var rs = {"result":"success"}
            res.send(rs)
          }
        })

    }











    


