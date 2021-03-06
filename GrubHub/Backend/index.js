//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var multer = require("multer");
var path = require("path");
var mysql = require("mysql");
app.set("view engine", "ejs");
const bcrypt = require('bcrypt');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const cont = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpasswordgiven",
  database: "myschema"
});

cont.connect(err => {
  if (err) {
    console.log("Error occured : " + err);
  } else {
    console.log("Connected!");
  }
});

global.cont = cont;


var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "rootpasswordgiven",
  database: "myschema"
});



var resultObject;

//Route to handle Post Request Call
app.post("/login", function (req, res) {

  console.log("Inside Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ", req.body);
  var email = req.body.username;
  var password = req.body.password;
  var radio = req.body.radio;


  sql = `Select id,name,email,password from ${radio} where email = '${email}'`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }

    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        if (result.length > 0) {
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            var name = row.name;
            var emailrow = row.email;
            var id = row.id;
            var hash = row.password;



            console.log("Name : " + row.name);
            console.log("ID: " + id)
            console.log("Pass: " + hash)


            if (bcrypt.compareSync(password, hash)) {
              res.cookie("email", email, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("cookie", radio, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("id", id, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              res.cookie("name", name, {
                maxAge: 900000,
                httpOnly: false,
                path: "/"
              });
              req.session.user = email;

              res.writeHead(200, {
                "Content-Type": "text/plain"
              });
              res.end("Successful Login");
            } else {
              console.log(" Invalid credentials found ");
              res.writeHead(201, {
                "Content-Type": "text/plain"
              });
              res.end("Invalid credentials in Login");
            }

          });
        } else {
          console.log(" No users found ");
          res.writeHead(201, {
            "Content-Type": "text/plain"
          });
          res.end("Unsuccessful Login");
        }
      }
    });
    db.release()
  });

  // Object.keys(req.body).forEach(function(key){
  //     req.body = JSON.parse(key);
  // });
  // var username = req.body.username;
  // var password = req.body.password;



});

app.post("/ownersignup", function (req, res) {
  console.log("Inside ownersignup Request");
  console.log("Req Body : ", req.body);

  var name = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var restaurant = req.body.restaurant;
  var zipcode = req.body.zipcode;

  bcrypt.hash(req.body.password, 10, function (err, hash) {

    sql = `insert into owner (name,email,password,restaurantname,zipcode,profileimage,restaurantimage) values ('${name}','${email}','${hash}','${restaurant}',${zipcode},'pro.jpg','default.png')`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
      if (err) {
        console.log("Error while getting connection")
      }
      db.query(sql, (err, result) => {
        if (err) {
          console.log("Error occured : " + err);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Successful Signup");
        }
      });
      db.release()
    });
  });

});


app.post("/ownerprofile", function (req, res) {
  console.log("Inside update owner profile Request");
  console.log("Req Body : ", req.body);

  var name = req.body.username;
  var email = req.body.email;
  var phone = req.body.phone;
  var restaurant = req.body.restaurant;
  var cuisine = req.body.cuisine;
  idcookie = req.body.idcookie;

  sql = `update owner set name='${name}',email='${email}',restaurantname='${restaurant}',phone='${phone}',cuisine='${cuisine}' where email='${email}'`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {

        console.log("Profile updated successfully")

        // sql1 = `insert into restaurant (restaurantname,restaurantimage) values ()`

        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successful Signup");
      }
    });
    db.release()
  });
});


app.post("/buyerprofile", function (req, res) {
  console.log("Inside update buyer profile Request");
  console.log("Req Body : ", req.body);

  var name = req.body.username;
  var email = req.body.email;
  var phone = req.body.phone;


  sql = `update buyer set name='${name}',email='${email}',phone='${phone}' where email='${email}'`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successful Signup");
      }
    });
    db.release()
  });
});

app.post("/buyersignup", function (req, res) {
  console.log("Inside buyer signup Request");
  console.log("Req Body : ", req.body);

  var name = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  bcrypt.hash(req.body.password, 10, function (err, hash) {

    sql = `insert into buyer (name,email,password,profileimage) values ('${name}','${email}','${hash}','pro.jpeg')`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
      if (err) {
        console.log("Error while getting connection")
      }
      db.query(sql, (err, result) => {
        if (err) {
          console.log("Error occured : " + err);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Successful Signup");
        }
      });
      db.release()
    });
  });
});


app.get("/ownerprofile", function (req, res) {
  console.log("Inside owner profile");
  var emailCookie = req.query.emailcookie;

  sql = `select name,email,phone,restaurantname,cuisine,profileimage,restaurantimage from owner where email="${emailCookie}";`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {


        Object.keys(result).forEach(function (key) {
          var row = result[key];
          resultObject = {
            username: row.name,
            email: row.email,
            phone: row.phone,
            restaurant: row.restaurantname,
            cuisine: row.cuisine,
            profileimage: row.profileimage,
            restaurantimage: row.restaurantimage
          }
          // var name = row.name;
          console.log("Name : " + row.name)
        })




        console.log("Result : ", JSON.stringify(resultObject));
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(resultObject));
      }
    });
    db.release()
  });

});


app.get("/buyerprofile", function (req, res) {
  console.log("Inside buyer profile");
  // var emailCookie = req.cookies.email;
  var emailCookie = req.query.emailcookie

  sql = `select name,email,phone,profileimage from buyer where email="${emailCookie}";`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {


        Object.keys(result).forEach(function (key) {
          var row = result[key];
          resultObject = {
            username: row.name,
            email: row.email,
            phone: row.phone,
            profileimage: row.profileimage
          }
          // var name = row.name;
          console.log("Name : " + row.name)
        })




        console.log("Result : ", JSON.stringify(resultObject));
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(resultObject));
      }
    });
    db.release()
  });


});



// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });



// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("myImage");
// const router = express.Router();



// router.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//       console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);//Here you get file.
//       /*Now do where ever you want to do*/
//       if(!err) {
//           return res.send(200).end();
//       }
//   })
// })



// using second method-----------------------------
// app.use(express.static('public'))
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const upload = multer({
//     storage
// })
// app.use(cors());
// app.post('/upload', upload.single('image'), (req, res) => {
//     if (req.file)
//         res.json({
//             imageUrl: `images/uploads/${req.file.filename}`
//         });
//     else
//         res.status("409").json("No Files to Upload.");
// });



//method 3 ---------------------------------------------
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, '/public')
// },
// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }
// })


// var upload = multer({ storage: storage }).single('file')


// app.post('/upload',function(req, res) {

//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)

//   })

// });

app.use(express.static('public'))


const storage = multer.diskStorage({
  destination: './public/profilepics/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({
  storage: storage
}).single('myImage')


app.post('/buyerprofileuploadimage', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Issue with uploading')
    } else {
      console.log('Inside upload post call')
      console.log(req.file)

      emailCookie = req.body.emailcookie;
      filename = req.file.filename;



      console.log("Filename : " + req.file.filename)
      console.log(req.file)


      sql = `update buyer set profileimage='${filename}' where email='${emailCookie}'`;
      //sql="Select name,email from " + radio + " where password="' + password + '";
      console.log("SQL: " + sql);

      pool.getConnection(function (err, db) {
        if (err) {
          console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
        db.release()
      });




      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(req.file))
    }
  })
})




app.post('/ownerprofileuploadprofile', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Issue with uploading')
    } else {
      console.log('Inside upload post call')
      console.log(req.file)

      emailCookie = req.body.emailcookie;
      filename = req.file.filename;



      console.log("Filename : " + req.file.filename)
      console.log(req.file)


      sql = `update owner set profileimage='${filename}' where email='${emailCookie}'`;
      //sql="Select name,email from " + radio + " where password="' + password + '";
      console.log("SQL: " + sql);

      pool.getConnection(function (err, db) {
        if (err) {
          console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
        db.release()
      });



      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(req.file))
    }
  })
})


app.post('/ownerprofileuploadrestaurant', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Issue with uploading')
    } else {
      console.log('Inside upload post call')
      console.log(req.file)

      emailCookie = req.body.emailcookie;
      filename = req.file.filename;



      console.log("Filename : " + req.file.filename)
      console.log(req.file)


      sql = `update owner set restaurantimage='${filename}' where email='${emailCookie}'`;
      //sql="Select name,email from " + radio + " where password="' + password + '";
      console.log("SQL: " + sql);

      pool.getConnection(function (err, db) {
        if (err) {
          console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
        db.release()
      });



      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(req.file))
    }
  })
})




//Route to get All Books when user visits the Home Page



app.get("/ownerhome", function (req, res) {
  console.log("Inside OwnerHome");

  sql = `select * from orders where ownerid=${req.query.idcookie} and status!='Delivered'`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.get("/orderitemdetails", function (req, res) {
  console.log("Inside orderitemdetails");

  sql = `select * from orderdetails where orderid =${req.query.orderid} `;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        console.log(JSON.stringify(result))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });


});



app.post("/changestatus", function (req, res) {
  console.log("Inside changestatus Order Request");
  console.log("Req Body : ", req.body);

  var orderid = req.body.orderid;
  var status = req.body.status;

  if (status === "New" || status === "Preparing" || status === "Ready" || status === "Delivered") {
    sql = `update orders set status='${status}' where orderid=${orderid}`;
  } else if (status === "Cancel") {
    sql = `delete from orders where orderid=${orderid}`;
  }

  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successfully cancelled the order");
      }
    });
    db.release()
  });
});


app.get("/ownersection", function (req, res) {
  console.log("Inside OwnerSection");

  sql = `select * from sections where ownerid=${req.query.idcookie}`
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.get("/sectiondetails", function (req, res) {
  console.log("Inside Section Details");

  sql = `select * from items where sectionid =${req.query.sectionid} and ownerid=${req.query.idcookie} `;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        console.log(JSON.stringify(result))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });


});


app.get("/sectiondetailsbuyer", function (req, res) {
  console.log("Inside Section Details buyer");

  sql = `select * from items where sectionid =${req.query.sectionid} and ownerid=${req.query.ownerid} `;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        console.log(JSON.stringify(result))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });


});


app.post("/updatesectionitems", function (req, res) {
  console.log("Inside update section items Request");
  console.log("Req Body : ", req.body);

  var name = req.body.name;
  var description = req.body.description;
  var price = req.body.price;
  var itemid = req.body.itemid

  sql = `update items set name='${name}',description='${description}',price='${price}' where itemid='${itemid}'`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successfully updated section items");
      }
    });
    db.release()
  });
});


app.post("/additem", function (req, res) {
  console.log("Inside additem Request");
  console.log("Req Body : ", req.body);

  var itemname = req.body.itemname;
  var description = req.body.description;
  var price = req.body.price;
  var sectionid = req.body.sectionid;
  var itemimage = req.body.itemimage;
  var idcookie = req.body.idcookie

  //sql = `insert into items (name,description,price,sectionid) values ('${itemname}','${description}','${price}',${sectionid})`;
  sql = `update items set name='${itemname}',description='${description}',price='${price}',sectionid=${sectionid}, ownerid=${idcookie} where itemimage='${itemimage}'`
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successfully added item");
      }
    });
    db.release()
  });
});

app.post('/additemuploadimage', function (req, res) {
  upload(req, res, err => {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Issue with uploading')
    } else {
      console.log('Inside upload post call')
      console.log(req.file)

      emailCookie = req.cookies.email;
      filename = req.file.filename;



      console.log("Filename : " + req.file.filename)
      console.log(req.file)


      //sql = `update buyer set profileimage='${filename}' where email='${emailCookie}'`;
      //sql="Select name,email from " + radio + " where password="' + password + '";
      sql = `insert into items (itemimage) values ('${filename}')`;
      console.log("SQL: " + sql);

      pool.getConnection(function (err, db) {
        if (err) {
          console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
        db.release()
      });



      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(req.file))
    }
  })
})


app.post("/deletesectionitems", function (req, res) {
  console.log("Inside deletesectionitems Request");
  console.log("Req Body : ", req.body);

  var itemid = req.body.itemid;


  sql = `delete from items where itemid=${itemid}`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successfully deleted the item");
      }
    });
    db.release()
  });
});


app.get("/viewrestaurants", function (req, res) {
  console.log("Inside viewrestaurants");

  // var cuisine = req.query.cuisine

  // if (cuisine === "") {
  //   sql = `select id,restaurantname, restaurantimage, cuisine from owner where id in (select ownerid from items where name ="${req.query.itemname}")`;
  // } else {
  //   sql = `select id,restaurantname, restaurantimage, cuisine from owner where cuisine = '${cuisine}' and id in (select ownerid from items where name ="${req.query.itemname}")`;
  // }

  //sql = `select * from items where sectionid =${req.query.sectionid} `;
  sql = `select id,restaurantname, restaurantimage, cuisine from owner where id in (select ownerid from items where name ="${req.query.itemname}")`;

  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        console.log(JSON.stringify(result))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });


});

app.get("/buyersection", function (req, res) {
  console.log("Inside BuyerSection");

  sql = `select * from sections where ownerid=${req.query.restaurantid}`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.post("/addtocart", function (req, res) {
  console.log("Inside Add to cart Request");
  console.log("Req Body : ", req.body);

  var itemid = req.body.itemid;
  var name = req.body.itemname;
  var price = req.body.itemprice;
  var quantity = req.body.quantity;
  var idcookie = req.body.idcookie;

  sql = `insert into cart (itemid,itemname,quantity,price,buyerid) values (${itemid},'${name}','${quantity}','${price}',${idcookie})`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Item added successfully");
      }
    });
    db.release()
  });
});

app.get("/viewcart", function (req, res) {
  console.log("Inside View Cart");
  var idCookie = req.query.idcookie

  sql = `select * from cart where buyerid=${idCookie}`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.get("/calculateSum", function (req, res) {

  let sum = 0;
  var idCookie = req.query.idcookie
  console.log("Inside calculate sum");
  sql = `select * from cart where buyerid=${idCookie}`;
  console.log("SQL: " + sql);


  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        for (let i = 0; i < result.length; i++) {
          sum = sum + result[i].quantity * result[i].price;
        }
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(String(sum));
      }
    });
    db.release()
  });
});


app.get("/cartitems", function (req, res) {


  var idCookie = req.query.idcookie
  console.log("Inside cart items");
  sql = `select count(*) as count from cart where buyerid=${idCookie}`;
  console.log("SQL: " + sql);



  cont.query(sql, (err, result) => {
    if (err) {
      console.log("Error occured : " + err);
    } else {

      Object.keys(result).forEach(function (key) {
        var row = result[key];
        var cartitem = row.count;

        console.log("Cart Item : " + cartitem);

        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(String(cartitem));

      })


    }
  });

});


app.post("/placeorder", function (req, res) {
  console.log("Inside place order Request");
  console.log("Req Body : ", req.body);

  var item = req.body.items;
  var idcookie = req.body.idcookie;
  var address = req.body.address;
  var username = req.body.namecookie;
  ownerid = ""
  orderid = ""

  console.log("Items : " + item)

  sql = `select ownerid from items where itemid in (select itemid from cart where buyerid=${idcookie}) limit 1`

  console.log(sql)


  cont.query(sql, (err, result) => {
    if (err) {
      console.log("Error occured : " + err);
    } else {

      Object.keys(result).forEach(function (key) {
        var row = result[key];
        ownerid = row.ownerid;

        console.log("Owner id : " + ownerid);

      })

      sql1 = `insert into orders (personname,personaddress,status,ownerid,buyerid,flag) values ('${username}','${address}','new',${ownerid},${idcookie},1) `

      console.log(sql1)

      cont.query(sql1, (err, result) => {
        if (err) {
          console.log("Error occured : " + err);
        } else {
          console.log("Data inserted into orders table successfully!")
        }
      });


      sql2 = `select orderid from orders where buyerid = ${idcookie} and flag=1`

      console.log(sql2)


      cont.query(sql2, (err, result) => {
        if (err) {
          console.log("Error occured : " + err);
        } else {

          Object.keys(result).forEach(function (key) {
            var row = result[key];
            orderid = row.orderid;
            console.log("Order id : " + orderid);
          });

          for (let i = 0; i < item.length; i++) {
            var itemname = item[i].itemname
            var quantity = item[i].quantity
            var price = item[i].price

            sql3 = `insert into orderdetails (itemname,itemquantity,itemprice,orderid) values ('${itemname}','${quantity}','${price}','${orderid}') `

            console.log(sql3)

            cont.query(sql3, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Data inserted into orderdeatils table successfully!")
              }
            });


          }

          sql4 = `update orders set flag=2 where buyerid=${idcookie} and flag=1`

          console.log(sql4)


          cont.query(sql4, (err, result) => {
            if (err) {
              console.log("Error occured : " + err);
            } else {
              console.log("Data Updated in orderds table successfully!")

              sql5 = `delete from cart where buyerid='${idcookie}'`

              console.log(sql5)


              cont.query(sql5, (err, result) => {
                if (err) {
                  console.log("Error occured : " + err);
                } else {
                  console.log("Data deleted in cart table successfully!")

                  res.writeHead(200, {
                    "Content-Type": "text/plain"
                  });
                  //console.log(JSON.stringify(resultObject))
                  res.end("Order placed successfully!");

                }
              })

            }
          });

        }
      })

    }
  });

});


app.get("/buyerpastorders", function (req, res) {
  console.log("Inside buyerpastorders");

  sql = `select a.orderid, a.status, b.restaurantname from orders a,owner b
  where a.buyerid=${req.query.idcookie} and
  a.ownerid=b.id and a.status="Delivered"`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});


app.get("/buyerfutureorders", function (req, res) {
  console.log("Inside buyerfutureorders ");

  sql = `select a.orderid, a.status, b.restaurantname from orders a,owner b
  where a.buyerid=${req.query.idcookie} and
  a.ownerid=b.id and a.status!="Delivered"`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.get("/owneroldorders", function (req, res) {
  console.log("Inside owneroldorders");

  sql = `select orderid, personname, status from orders
  where ownerid=${req.query.idcookie} and status="Delivered"`;
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Inside 200 response")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end(JSON.stringify(result));
      }
    });
    db.release()
  });
});

app.post("/addsection", function (req, res) {
  console.log("Inside Add Section Request");
  console.log("Req Body : ", req.body);
  var sectionname = req.body.sectionname;
  var idcookie = req.body.idcookie;
  console.log(sectionname)
  var idcookie = req.body.idcookie;
  sql = `insert into sections (sectionname,ownerid) values ('${sectionname}',${idcookie})`
  console.log(sql)

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        console.log("Data inserted into orders table successfully!")
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end("Section added successfully");
      }
    })
    db.release()
  });
});

app.post("/deletesection", function (req, res) {
  console.log("Inside deletesection Request");
  console.log("Req Body : ", req.body);

  var sectionid = req.body.sectionid;


  sql = `delete from sections where sectionid=${sectionid}`;
  //sql="Select name,email from " + radio + " where password="' + password + '";
  console.log("SQL: " + sql);

  pool.getConnection(function (err, db) {
    if (err) {
      console.log("Error while getting connection")
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Error occured : " + err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successfully deleted the section");
      }
    });
    db.release()
  });
});




//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");