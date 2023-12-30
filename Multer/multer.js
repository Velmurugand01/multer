// const express = require('express')
// const app =express()
// const path =require('path')   // view module
// const multer=require('multer')

// // view path 
// app.set('views',path.join(__dirname,"views"))
// app.set("view engine","ejs");

// var storage = multer.diskStorage({        // diskstorage is one of the function
//   destination :function(req,file,cb){              // destination path for uploaded file 
//     cb(null,'uploads')
//   }, 
//   filename :function(req,res,cb){
//     cb(null, file.originalname.replace(/\.[^/.]+$/,"") +'_'+Date.now() + path.extname(file.originalname)) 
//   }               
//  })              

//   let maxSize =2*1000*1000
//    // allows 2mb contains file only
//   let upload =multer({
//     storage:storage,
//    limits :{
//     fileSize :maxSize
//    },
//              // upload a file jpeg,img,pdf document vlidating 

//    fileFilter :function (req,file,cb) {
//     let filetypes =/jpeg|jpg|png/;
//     let mimetype =filetypes.test(file.mimetype)
//     let extname =filetypes.test(path.extname(file.originalname.toLocaleLowerCase()))
//     if (mimetype &&extname){
//         return cb(null,true)
//     }
//     cb("error: File upload only supports the following file type")
//    }
//  }).single('mypic');

//  app.get('/',(req,res)=>{
//     res.render('signup')
//  })

//  app.post('/upload',(req,res,next)=>{
//     upload(req,res,function(err){
//         if(err){
//           console.error(err);
//             res.send(err);
//         } else{
//             res.send("success.image uploaded!")
//         }

//     })
//  })


//  app.listen(8080,()=>{
//     console.log("server is running:8080");
//  })


// // const express = require('express');
// // const app = express();
// // const path = require('path');
// // const multer = require('multer');

// // // View path
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');

// // // Multer storage configuration
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname.replace(/\.[^/.]+$/, '') + '_' + Date.now() + path.extname(file.originalname));
// //   },
// // });

// // // Multer upload configuration
// // const maxSize = 2 * 1000 * 1000; // 2MB limit
// // const upload = multer({
// //   storage: storage,
// //   limits: {
// //     fileSize: maxSize,
// //   },
// //   fileFilter: function (req, file, cb) {
// //     const filetypes = /jpeg|jpg|png/;
// //     const mimetype = filetypes.test(file.mimetype);
// //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     }
// //     cb(new Error('Error: File upload only supports the following file types - jpeg, jpg, png'));
// //   },
// // }).single('mypic'); // Make sure this matches the input field name in your HTML form

// // app.get('/', (req, res) => {
// //   res.render('signup');
// // });

// // app.post('/upload', (req, res) => {
// //   upload(req, res, function (err) {
// //     if (err) {
// //       console.error(err);
// //       res.send(err.message); // Send the error message
// //     } else {
// //       res.send('Success. Image uploaded!');
// //     }
// //   });
// // });

// // app.listen(8080, () => {
// //   console.log('Server is running on port 8080');
// // });


const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// view path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(__dirname);

// storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Use 'file' instead of 'req' and 'res' in the filename function
    cb(null, file.originalname.replace(/\.[^/.]+$/, '') + '_' + Date.now() + path.extname(file.originalname));
  },
});

let maxSize = 2 * 1000 * 1000;
let upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (req, file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname.toLocaleLowerCase()));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('error: File upload only supports the following file type');
  },
}).single('mypic');

app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/upload', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      res.send('success. image uploaded!');
    }
  });
});

app.listen(8080, () => {
  console.log('server is running:8080');
});
