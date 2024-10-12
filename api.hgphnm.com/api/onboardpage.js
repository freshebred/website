const express = require("express");
const router = express.Router();
const token = require("../models/auth");
const axios = require("axios");
const url = require("url");
require("dotenv").config();

router.get("/:e(*)?", (req, res, next) => {
  if (
    req.params.e.startsWith("auth") ||
    req.params.e.startsWith("db") ||
    req.params.e.startsWith("bug-count")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "nothing to see here:P", params: req.params.e });
  }
});
router.post("/:e(/*)?", (req, res, next) => {
  if (req.params.e.startsWith("auth") || req.params.e.startsWith("db")) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "nothing to see here:P", params: req.params.e });
  }
});
router.put("/:e(/*)?", (req, res, next) => {
  if (req.params.e.startsWith("auth") || req.params.e.startsWith("db")) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "nothing to see here:P", params: req.params.e });
  }
});
router.patch("/:e(/*)?", (req, res, next) => {
  if (req.params.e.startsWith("auth") || req.params.e.startsWith("db")) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "nothing to see here:P", params: req.params.e });
  }
});
router.delete("/:e(/*)?", (req, res, next) => {
  if (req.params.e.startsWith("auth") || req.params.e.startsWith("db")) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "nothing to see here:P", params: req.params.e });
  }
});
//MSC
router.get("/bug-count", (req, res) => {
  res.json({
    message: "total of: 27 bugs counted",
    bugs: "27",
    fixed: "16",
    remaining: "11",
  });
  const timenow = new Date();
  console.log(req.ip + timenow);
});
//ENDMSC

//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------
//-------------------------------------IMPORTING AUTH.JS---------------------------------------

router.get("/auth", (req, res) => {
  res.status(404).json({ message: "resource not found" });
});
router.put("/auth", (req, res) => {
  res.status(404).json({ message: "resource cannot be edit" });
});
router.patch("/auth", (req, res) => {
  res.status(404).json({ message: "resource cannot be edit" });
});
router.delete("/auth", (req, res) => {
  res.status(404).json({ message: "resource cannot be deleted" });
});

router.get("/auth/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("validate/") ||
    req.params.a.startsWith("return")
  ) {
    next();
  } else {
    res.status(404).json({
      message: "resource not found",
      request: "/auth/" + req.params.a,
    });
  }
});

router.post("/auth/:a(*)?", (req, res, next) => {
  if (req.params.a) {
    if (
      req.params.a.startsWith("get/") ||
      req.params.a.startsWith("validate/") ||
      req.params.a.startsWith("return?")
    ) {
      next();
    } else {
      res.status(404).json({
        message: "resource not found",
        request: "/auth/" + req.params.a,
      });
    }
  } else {
    next();
  }
});
router.put("/auth/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("validate/") ||
    req.params.a.startsWith("return?")
  ) {
    next();
  } else {
    res.status(404).json({
      message: "resource not found",
      request: "/auth/" + req.params.a,
    });
  }
});
router.patch("/auth/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("validate/") ||
    req.params.a.startsWith("return?")
  ) {
    next();
  } else {
    res.status(404).json({
      message: "resource not found",
      request: "/auth/" + req.params.a,
    });
  }
});
router.delete("/auth/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("validate/") ||
    req.params.a.startsWith("return?")
  ) {
    next();
  } else {
    res.status(404).json({
      message: "resource not found",
      request: "/auth/" + req.params.a,
    });
  }
});

router.get("/auth/get/:id", async (req, res) => {
  //
  if (req.params.id) {
    if (req.params.id == process.env.DB_PSW) {
      try {
        const tokens = await token.find();
        res.json(tokens);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } else {
    res.status(400).json({ message: "authorization missing" });
  }
});

//validate
router.get("/auth/validate/:id", async (req, res) => {
  //res.send(res.tkn)e
  const timenow = Math.floor(Date.now() / 1000);

  //console.log(currentUnixTime);

  let tokens;
  try {
    tokens = await token.find({ token: req.params.id });

    //const totalTime = timenow - tokens[0].timestamp

    if (!tokens[0]) {
      return res.status(404).json({ exist: false, timeout: false });
    } else {
      console.log(
        "time then is " +
          tokens[0].timestamp +
          " and time now is " +
          timenow +
          "total time is " +
          timenow -
          tokens[0].timestamp
      );
      if (timenow - tokens[0].timestamp <= 15) {
        //
        fetch("https://v1.hgphnm.com/auth/" + req.params.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log("Authentication entry deleted successfully.");
            } else {
              console.error(
                `Failed to delete authentication entry. Status: ${response.status}`
              );
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .then((data) => {})
          .catch((error) => {
            console.error("An error occurred:", error);
          });
        //
        res.status(201).json({ exist: true, timeout: false });
        //console.log("time is:"+timenow - tokens.timestamp)
      } else {
        res.status(201).json({ exist: true, timeout: true });
        //console.log("time is:"+timenow - tokens.timestamp)
      }
    }
  } catch (err) {
    res.status(404).json({ message: "not found, advanced code:" + err });
  }
  //let timethen = res.tkn.timestamp
});
//discord return
/*
router.get("/auth/return",async (req,res)=>{
    const code = req.query

    if(code){
        const formData= new url.URLSearchParams({
            client_id: process.env.ClientId,
            client_secret: process.env.ClientSecret,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'http:localhost:3000/auth/return'
        })
        const output = await axios.post('https://discord.com/api/v10/oauth2/token', {formData, headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
        if(output.data) {
            const access = output.data.access_token

            const userinfo= await axios.get('https://discord.com/api/v10/users/@me',{
                headers:{
                    'Authorization':`Bearer ${access}`
                }
            })
            console.log(output.data,userinfo.data)
            res.json(output.data,userinfo.data)
        }
    }
})*/

router.get("/auth/return", async (req, res) => {
  // Check their GET params to get the code
  var code = req.query.code;
  console.log(code);
  // Make our POST body
  var body = {
    client_id: process.env.ClientId,
    client_secret: process.env.ClientSecret,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "https://v1.hgphnm.com/auth/return",
  };

  // POST that to Discord
  try {
    var site = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    //console.warn(site)
  } catch (err) {
    return res.status(500).json(err);
  }

  // And parse the response
  var response = await site.json();
  var accessToken = response["access_token"];
  res.send(`Access token: ${accessToken} raw: ${response["access_token"]}`);
  var site = await fetch("https://discord.com/api/v10/users/@me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  var response = await site.json();
  console.log(
    `page response is \`${response}\` access token is \`${accessToken}\``
  );
});

//
function generateAlphanumeric(length = 64) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// Example usage:

//create one

router.post("/auth", async (req, res) => {
  let timeherea;
  let myRandomString = generateAlphanumeric();
  console.log(myRandomString);
  const currentUnixTime = Math.floor(Date.now() / 1000);
  timeherea = currentUnixTime; // Extract the unixtime value
  console.log("Unix time:", timeherea);
  const tokens = new token({
    token: myRandomString,
    timestamp: timeherea,
  });
  try {
    const newtoken = await tokens.save();
    res.status(201).json(newtoken);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  //const currentUnixTime = Math.floor(Date.now() / 1000);
  //console.log("time right now is "+currentUnixTime)
});

//patch one
/*
router.patch('/:id',getUser,async (req, res)=>{
    if(req.body.name != null) {
        res.usr.name = req.body.name
    }
    if(req.body.email != null) {
        res.usr.email = req.body.email
    }
    if(req.body.product != null) {
        res.usr.product = req.body.product
    }
    try {
        const updateinfo = await res.usr.save()
        res.json({message:"updated info",updateinfo})
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})
//delete one
*/

router.delete("/auth/:id", getToken, async (req, res) => {
  try {
    await res.tkn.deleteOne();
    res.json({ message: "removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//

async function getToken(req, res, next) {
  let tkn;
  try {
    tkn = await token.find({ token: req.params.id });
    console.log(tkn);
    tkn = tkn[0];
    if (tkn == null) {
      return res.status(404).json({ message: "Token not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tkn = tkn;
  next();
}
//
/*async function getUser(req, res, next) {
    let tkn
    try {
        tkn = await token.findById(req.params.id)
        if(tkn == null) {
            return res.status(404).json({message: "cannot find the user"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.tkn = tkn
    next()
}*/
//---------------------------------------END IMPORTING AUTH.JS-----------------------------
//---------------------------------------END IMPORTING AUTH.JS-----------------------------
//---------------------------------------END IMPORTING AUTH.JS-----------------------------
//---------------------------------------END IMPORTING AUTH.JS-----------------------------
//---------------------------------------END IMPORTING AUTH.JS-----------------------------
//------------------------------------------IMPORTING DB.JS--------------------------------
//------------------------------------------IMPORTING DB.JS--------------------------------
//------------------------------------------IMPORTING DB.JS--------------------------------
//------------------------------------------IMPORTING DB.JS--------------------------------
//------------------------------------------IMPORTING DB.JS--------------------------------
router.get("/db", (req, res) => {
  res.status(404).json({ message: "resource not found" });
});
router.put("/db", (req, res) => {
  res.status(404).json({ message: "resource cannot be edit" });
});
router.patch("/db", (req, res) => {
  res.status(404).json({ message: "resource cannot be edit" });
});
router.delete("/db", (req, res) => {
  res.status(404).json({ message: "resource cannot be deleted" });
});

router.get("/db/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("find/") ||
    req.params.a.startsWith("create/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});
router.post("/db/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("find/") ||
    req.params.a.startsWith("create/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});
router.put("/db/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("find/") ||
    req.params.a.startsWith("create/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});
router.patch("/db/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("find/") ||
    req.params.a.startsWith("create/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});
router.delete("/db/:a(*)?", (req, res, next) => {
  if (
    req.params.a.startsWith("get/") ||
    req.params.a.startsWith("find/") ||
    req.params.a.startsWith("create/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});
/////////////////////////////////////////////

router.get("/db/get/:id", async (req, res) => {
  if (req.params.id) {
    if (req.params.id == process.env.DB_PSW) {
      try {
        const users = await user.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } else {
    res.status(400).json({ message: "authorization missing" });
  }
});
//get one
router.get("/db/find/:id", getUser, (req, res) => {
  res.send(res.usr);
});
//create one
router.post("/db/create/:id", async (req, res) => {
  console.log("https://v1.hgphnm.com/auth/validate/" + req.params.id);
  fetch("https://v1.hgphnm.com/auth/validate" + req.params.id)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(async (data) => {
      if (data.exist && !data.timeout) {
        const users = new user({
          name: req.body.name,
          email: req.body.email,
          product: req.body.product,
        });
        try {
          const newUser = await users.save();
          res.status(201).json(newUser);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      } else {
        // Handle the case where the conditions are not met (optional)
        res.status(412).json({ message: "Token expired" });
      }
    })
    .catch((error) => {
      // Handle any errors during the request or response handling
      console.error("Error:", error);
    });

  /*const users = new user({
        name: req.body.name,
        email: req.body.email,
        product: req.body.product
    })
    try {
        const newUser = await users.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({message:err.message})
    }*/
});
//
function check(data) {
  if (data.exist === true && data.timeout === false) {
    return true;
  } else {
    return false;
  }
}
//
//patch one
router.patch("/db/patch/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.usr.name = req.body.name;
  }
  if (req.body.email != null) {
    res.usr.email = req.body.email;
  }
  if (req.body.product != null) {
    res.usr.product = req.body.product;
  }
  try {
    const updateinfo = await res.usr.save();
    res.json({ message: "updated info", updateinfo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//delete one
router.delete("/db/delete/:id", getUser, async (req, res) => {
  try {
    await res.usr.deleteOne();
    res.json({ message: "removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let usr;
  try {
    usr = await user.findById(req.params.id);
    if (usr == null) {
      return res.status(404).json({ message: "cannot find the user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.usr = usr;
  next();
}
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------
//----------------------------------------END IMPORTING DB.JS------------------------------

module.exports = router;
