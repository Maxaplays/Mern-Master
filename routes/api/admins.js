const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");

// Load validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load Admin model
const Admin = require("../../models/Admin");

router.post("/register", (req, res) => {
    // Form validation
  
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    Admin.findOne({ email: req.body.email }).then(admin => {
      if (admin) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newAdmin = new Admin({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

// Login Admin
router.post("/login", (req, res) => {
    //Form validation

    const { errors, isValid} = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find Admin by email
    Admin.findOne({ email }).then(admin => {
        //Check if admin exists
        if(!admin) {
            return res.status(404).json({ emailnotfoud: "Email not found"});
        }

        //Check Password
        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
                //if its match
                //Create jwt Payload
                const payload = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                };

                //Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 34556926 //
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400)
                .json({ passwordincorrect: "Password incorrect"})
            }
        });
    });
});
router.post('/listadmin', function(req, res){
    Admin.find().sort({_id:-1}).exec(function(err,admins){
        if(err){
            console.log('not admin');
        } else {
            res.json({
                data: admins
            })
        }
    })
})

module.exports = router;