const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config/databse');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');


exports.admin_signup = (req, res, next) =>{
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin =>{
        if(admin.length >=1 ){
            return res.status(409).json({
                message: 'Mail exist'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                 error: err
                    });
                } else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    admin.save()
                    .then( result =>{
                        console.log(result);
                        res.status(201).json({
                            message: 'admin created'
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({error: err});
                    
                    });
                       }
                    });
        }
    });
   
}

exports.admin_login = (req, res, next) =>{
  
    Admin.find({ email: req.body.email })
    .exec()
    .then(admin =>{
        if(admin.length < 1 ){
            return res.status(401).json({
               message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, admin[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: admin[0].email,
                    adminId: admin[0]._id
                }, config.secret,
                { expiresIn: "1h"}
            );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
               message: 'Auth failed'
           });   
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    
    });
}

exports.admin_delete =  (req, res, next) =>{
    Admin.remove({ _id: req.params.adminId })
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'admin deleted'
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    
    });
}