import formModel from "../models/schema.js";
import bcrypt from 'bcrypt';        //for password hashing 

class homeController {

 // function for home page ----------------------------------------
  static getAllDoc = (req, res) => {
    res.render("home.ejs",{'title':"Home"});
  };

//    function  for register page-----------------------------------

  static getRegisterDoc = (req, res) => {
    res.render("register.ejs",{'title':"Register"});
  };

//   function for creating users ----------------------------------------

//   static createRegisterDoc = async (req, res) => {
//   // console.log(req.body);
//   // console.log('creating function calling');
//     try {

//       const { name, age, email, password, address } = req.body;
//       const doc = new formModel({
//         name: name,
//         age: age,
//         email: email,
//         password: password,
//         address: address,
//       });
//       const result = await doc.save();
//    // console.log(result);
//       res.redirect("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };


  // function for creating user with password hashing ----------------------------

  static createRegisterDoc = async (req, res) => {
      // console.log(req.body);
      // console.log('creating function calling');

const hashpassword = await bcrypt.hash(req.body.password, 10);  // 10 is using documentation say it 
      try { 
        const { name, age, email, password, address } = req.body;
        const doc = new formModel({
          name: name,
          age: age,
          email: email,
          password: hashpassword,
          address: address,
        });
        const result = await doc.save();
        // console.log(result);
        res.redirect("/login");
      } catch (error) {
        console.log(error);
      }
    };


  // function for login page------------------------------

  static getLoginDoc = (req, res) => {
    res.render("login.ejs",{'title':'Login'});
  };

//   funcion for verifying login page -------------------------------------------------

//   static verifyLoginDoc = async (req, res) => {
//     try {
//     // user enter email and password from login page form
//      const { uemail, upassword } = req.body; 
// finding user enter email has been lies in dataabase and getting particular
//      const result = await formModel.findOne({ email: uemail }); 
//      // console.log(result);
//     // if user direct login without register so that cheching and return that fisrtly register
//     if (result != null) {
        // matching user enter email and password from database email and password.
//         if (result.email == uemail && result.password == upassword) {
//           res.send(`<h1> dashboard--- ${result}</h1> `);
//         } else {
//           res.send(`<h1> invalid crietials </h1> `);
//         }
//       } 
//       else {
//             res.send("firsrtky you can registered ")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };




  //   funcion for verifying login page with matching hash password -------------------------------------------------

  static verifyLoginDoc = async (req, res) => {
      try {
        // user enter email and password from login page form
        const { uemail, upassword } = req.body; 
  // finding user enter email has been lies in dataabase and getting particular
        const result = await formModel.findOne({ email: uemail }); 
        // console.log(result);
        // if user direct login without register so that cheching and return that fisrtly register
        if (result != null) {
            // compare database hash password and user enter password 
            const isMatchHashPassword = await bcrypt.compare(upassword, result.password);
          // matching user enter email and password from database email and password.
          if (result.email == uemail && isMatchHashPassword ) {
            res.redirect('/dashboard')
            res.send(`<h1> dashboard--- ${result}</h1> `);      
          } else {
            res.send('password and email are not matched');
          }
        } 
        else {
              res.send("firstly you can register after login here.. ")
        }
      } catch (error) {
        console.log(error);
      }
  
    };


     static getDashboardDoc = (req,res)=>{
      res.render('dashboard.ejs',{'title':'Dashboard'});
     }
}

export default homeController;
