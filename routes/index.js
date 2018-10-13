var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
 
mysql.createConnection({

}).then(function(conn){
    // do stuff with conn
    conn.end();
});

pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'jjk1004',
  database: 'starGram',
  connectionLimit: 10
});
                                                   
// ########  ########   #######  ######## #### ##       ######## 
// ##     ## ##     ## ##     ## ##        ##  ##       ##       
// ##     ## ##     ## ##     ## ##        ##  ##       ##       
// ########  ########  ##     ## ######    ##  ##       ######   
// ##        ##   ##   ##     ## ##        ##  ##       ##       
// ##        ##    ##  ##     ## ##        ##  ##       ##       
// ##        ##     ##  #######  ##       #### ######## ######## 


//id check 추가
router.post('/profile', function(req, res, next) {
  console.log("HI");
  console.log(req.body);
  var query = `INSERT INTO profile (name, display_name, website, intro, email, phone, sex, password) VALUES ('${req.body.name}','${req.body.display_name}','${req.body.website}','${req.body.intro}', '${req.body.email}','${req.body.phone}','${req.body.sex}','${req.body.password}');`
  console.log(query);
  pool
      .query(query)
      .then(function(rows){
        console.log(rows)
        res.send(rows)
      })
      .catch(function(err) {
        done(err);
        res.status(500).send(err)
      }); 
});

router.get('/profile/:email', function(req, res, next) {
  var query = `SELECT * from profile WHERE email='${req.params.email}'`;
  // console.log(req.params.email);
  // console.log(query);
  pool
      .query(query)
      .then(function(rows){
        console.log(rows)
        res.send(rows)
      })
      .catch(function(err) {
      // console.log(error);
        done(err);
        res.status(500).send(err)
      });
      
});

router.put('/profile', function(req, res, next) {
  var query = `UPDATE profile
  SET name= '${req.body.name}', display_name= '${req.body.display_name}'  , website= '${req.body.website}', intro= '${req.body.intro}', email= '${req.body.email_change}', phone= '${req.body.phone}'
  WHERE email = '${req.body.email}';`;
  pool
      .query(query)
      .then(function(rows){
        res.send(rows)
      })
      .catch(function(err) {
        done(err);
        res.status(500).send(err)
      });
});

router.delete('/profile', function(req, res, next){
  var query =`DELETE FROM profile WHERE email ='${req.query.email}'`;
  pool
      .query(query)
      .then(function(rows){

      })
      .catch(function(err){
        done(err);
        res.status(500).send(err);
      });
})


// ######  ##     ## ########  ######  ##    ## 
// ##    ## ##     ## ##       ##    ## ##   ##  
// ##       ##     ## ##       ##       ##  ##   
// ##       ######### ######   ##       #####    
// ##       ##     ## ##       ##       ##  ##   
// ##    ## ##     ## ##       ##    ## ##   ##  
//  ######  ##     ## ########  ######  ##    ## 

router.post('/check', function(req, res, next){
  console.log(req.body);
  if(req.body.display_name != null){
    var query = `SELECT * FROM profile WHERE display_name='${req.body.display_name}';`
    pool
        .query(query)
        .then(function(rows){
          if(rows.length>1)
          res.send("display_name exists");
          else
          res.send("display_name is available");
        })
        .catch(function(err) {
          done(err);
          res.status(500).send(err);
        });
  }
})


// ########     ###     ######   ######  ##      ##  #######  ########  ########  
// ##     ##   ## ##   ##    ## ##    ## ##  ##  ## ##     ## ##     ## ##     ## 
// ##     ##  ##   ##  ##       ##       ##  ##  ## ##     ## ##     ## ##     ## 
// ########  ##     ##  ######   ######  ##  ##  ## ##     ## ########  ##     ## 
// ##        #########       ##       ## ##  ##  ## ##     ## ##   ##   ##     ## 
// ##        ##     ## ##    ## ##    ## ##  ##  ## ##     ## ##    ##  ##     ## 
// ##        ##     ##  ######   ######   ###  ###   #######  ##     ## ########  


router.put('/password', function(req, res, next) {
  var query = `SELECT * FROM profile WHERE profile_id=(?) and password = (?);`;
  pool
  .query(query,[req.body.profile_id,req.body.password])
  .then(function(rows){
    if(rows.length>0){
      query = `UPDATE profile SET password=(?) WHERE password = (?) and profile_id =(?);`;
      pool
          .query(query,[req.body.new_password, req.body.password, req.body.profile_id])
          .then(function(rows){
            res.send("password changed")
          })
          .catch(function(err) {
            done(err);
            res.status(500).send(err)
          });
    }
    res.send("password is wrong")
  })
  .catch(function(err) {
    done(err);
    res.status(500).send(err)
  });

});

// ########   #######   ######  ######## 
// ##     ## ##     ## ##    ##    ##    
// ##     ## ##     ## ##          ##    
// ########  ##     ##  ######     ##    
// ##        ##     ##       ##    ##    
// ##        ##     ## ##    ##    ##    
// ##         #######   ######     ##    

router.post('/post', function(req, res, next) {
  console.log(req.body);
  
  var query = `INSERT INTO post (profile_id, image_id, content, location, image_count) VALUES (?,?,?,?,?);`
  var body ={
    profile_id: req.body.profile_id,
    image_id: req.body.image_id,
    content: req.body.content,
    location: req.body.location,
    image_count: req.body.image_count
  }
  console.log(body);
  pool
      .query(query,body)
      .then(function(rows){
        console.log(rows)
        res.send(rows)
      })
      .catch(function(err) {
        // done(err);
        res.status(500).send(err)
      }); 
});

router.get('/profile/:email', function(req, res, next) {
  var query = `SELECT * from profile WHERE email='${req.params.email}'`;
  // console.log(req.params.email);
  // console.log(query);
  pool
      .query(query)
      .then(function(rows){
        console.log(rows)
        res.send(rows)
      })
      .catch(function(err) {
      // console.log(error);
        done(err);
        res.status(500).send(err)
      });
      
});

router.put('/profile', function(req, res, next) {
  var query = `UPDATE profile
  SET name= '${req.body.name}', display_name= '${req.body.display_name}'  , website= '${req.body.website}', intro= '${req.body.intro}', email= '${req.body.email_change}', phone= '${req.body.phone}'
  WHERE email = '${req.body.email}';`;
  pool
      .query(query)
      .then(function(rows){
        res.send(rows)
      })
      .catch(function(err) {
        done(err);
        res.status(500).send(err)
      });
});

router.delete('/profile', function(req, res, next){
  var query =`DELETE FROM profile WHERE email ='${req.query.email}'`;
  pool
      .query(query)
      .then(function(rows){

      })
      .catch(function(err){
        done(err);
        res.status(500).send(err);
      });
})



// ######   #######  ##     ## ##     ## ######## ##    ## ######## 
// ##    ## ##     ## ###   ### ###   ### ##       ###   ##    ##    
// ##       ##     ## #### #### #### #### ##       ####  ##    ##    
// ##       ##     ## ## ### ## ## ### ## ######   ## ## ##    ##    
// ##       ##     ## ##     ## ##     ## ##       ##  ####    ##    
// ##    ## ##     ## ##     ## ##     ## ##       ##   ###    ##    
//  ######   #######  ##     ## ##     ## ######## ##    ##    ##    


//  ########   #######   #######  ##    ## ##     ##    ###    ########  ##    ## 
// ##     ## ##     ## ##     ## ##   ##  ###   ###   ## ##   ##     ## ##   ##  
// ##     ## ##     ## ##     ## ##  ##   #### ####  ##   ##  ##     ## ##  ##   
// ########  ##     ## ##     ## #####    ## ### ## ##     ## ########  #####    
// ##     ## ##     ## ##     ## ##  ##   ##     ## ######### ##   ##   ##  ##   
// ##     ## ##     ## ##     ## ##   ##  ##     ## ##     ## ##    ##  ##   ##  
// ########   #######   #######  ##    ## ##     ## ##     ## ##     ## ##    ## 


// #### ##     ##    ###     ######   ######## 
//  ##  ###   ###   ## ##   ##    ##  ##       
//  ##  #### ####  ##   ##  ##        ##       
//  ##  ## ### ## ##     ## ##   #### ######   
//  ##  ##     ## ######### ##    ##  ##       
//  ##  ##     ## ##     ## ##    ##  ##       
// #### ##     ## ##     ##  ######   ######## 

// ##     ## ##    ## ########  #######  ##       ##        #######  ##      ## ######## ########  
// ###   ###  ##  ##  ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## 
// #### ####   ####   ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ## 
// ## ### ##    ##    ######   ##     ## ##       ##       ##     ## ##  ##  ## ######   ########  
// ##     ##    ##    ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##   ##   
// ##     ##    ##    ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##    ##  
// ##     ##    ##    ##        #######  ######## ########  #######   ###  ###  ######## ##     ## 

// ########  #######  ##       ##        #######  ##      ## 
// ##       ##     ## ##       ##       ##     ## ##  ##  ## 
// ##       ##     ## ##       ##       ##     ## ##  ##  ## 
// ######   ##     ## ##       ##       ##     ## ##  ##  ## 
// ##       ##     ## ##       ##       ##     ## ##  ##  ## 
// ##       ##     ## ##       ##       ##     ## ##  ##  ## 
// ##        #######  ######## ########  #######   ###  ###  

// ##     ##    ###     ######  ##     ## ########    ###     ######   
// ##     ##   ## ##   ##    ## ##     ##    ##      ## ##   ##    ##  
// ##     ##  ##   ##  ##       ##     ##    ##     ##   ##  ##        
// ######### ##     ##  ######  #########    ##    ##     ## ##   #### 
// ##     ## #########       ## ##     ##    ##    ######### ##    ##  
// ##     ## ##     ## ##    ## ##     ##    ##    ##     ## ##    ##  
// ##     ## ##     ##  ######  ##     ##    ##    ##     ##  ######   

// ###    ##       ######## ########  ######## 
// ## ##   ##       ##       ##     ##    ##    
// ##   ##  ##       ##       ##     ##    ##    
// ##     ## ##       ######   ########     ##    
// ######### ##       ##       ##   ##      ##    
// ##     ## ##       ##       ##    ##     ##    
// ##     ## ######## ######## ##     ##    ##    
module.exports = router;

