var express = require("express");
var router = express.Router();
const credential = {
    email: "admin@ok.com",
    password: "1111"

}
//login user

router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Succesful..!");
    } else if (req.body.email===credential.email) {
        res.render('base', { alert: "invalid password" })

    }else{
        res.render('base', {alert: 'invalid username'})
    }

})

//route for dashboars

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.render("base")
    }
})

//router for logout

// router.get('/logout',(req,res)=>{
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err)
//             res.send("Error")
//         }else{
//             res.render('base',{title:"Express",logout :"Logout Successfully..!" })
//         }
//     })


// })
router.get('/logout', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/dashboard/')
    } else {
        res.render('base', { title: "Express", logout: "Logout Successfully..!" })
    }
})
router.post('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
            res.send("Error")
        } else {
            res.redirect('/route/logout');
        }
    })


})

module.exports = router;





// router.get('/logout', (req, res) => {
//     req.session.destroy(function (err) {
//         if (err) {
//             console.log(err)
//             res.send("Error")
//         } else {
//             res.redirect('/route/logout');
//         }
//     })



// router.get('/logout', (req, res) => {
//     if (req.session.user) {
//         res.redirect('/route/dashboard/')
//     } else {
//         res.render('base', { title: "Express", logout: "Logout Successfully..!" })
//     }
// })