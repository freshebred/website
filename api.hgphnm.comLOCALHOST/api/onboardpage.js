const express = require("express");
const router = express.Router();
const token = require("../models/auth");
const axios = require("axios");
const url = require("url");
const user = require("../models/db");
const usage = require("./endpoint.json");
const html = require("../models/html");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("openai");
require("dotenv").config();
/*
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
});*/
//MSC
router.get("/bug-count", (req, res) => {
  res.json({
    message: "total of: 430 bugs counted",
    bugs: "430",
    fixed: "427",
    remaining: "3",
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
/*
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
*/

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
      if (timenow - tokens[0].timestamp <= 1500) {
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
//
const path = require("path");

// Serve the HTML file from your local folder
router.get("/verimsc/:id", (req, res) => {
  if (req.params.id) {
    res.sendFile(path.join(__dirname, "bu.png"));
  } else {
    res.json({ message: "resource not found lol" });
  }
});

//
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
//
//2 july discord return, stopped at trading user token
//6 july done trading, return the information ##STUCK##
//20 aug chatgpt
const CLIENT_ID = process.env.ClientId;
const CLIENT_SECRET = process.env.ClientSecret;
const REDIRECT_URI = "http://localhost:3000/discord/return";

router.get("/discord/return", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing Discord authorization code");
  }

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    // Return all user data directly
    res.json(userData);
  } catch (error) {
    console.error("Error handling Discord OAuth:", error);
    res.status(500).send("Internal server error");
  }
});
//
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
  if ((req.body.auth = process.env.DB_PSW)) {
    let myRandomString = generateAlphanumeric();
    const newtoken = new token({
      token: myRandomString,
      dscid: req.body.discordId,
    });
    try {
      const save = await newtoken.save();
      res.status(201).json(save);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
/*
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
    req.params.a.startsWith("create/")||
    req.params.a.startsWith("delete/")
  ) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "resource not found", request: "/db/" + req.params.a });
  }
});*/
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
  fetch("https://v1.hgphnm.com/auth/validate/" + req.params.id)
    /*.then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} raw error code: exist:${response.exist}, expired: ${response.timeout}`)
        
      }
      return response.json(); // Parse the JSON response
    })*/
    .then(async (raw) => {
      console.log(raw);
      const data = raw.json();
      console.log(data.satus);
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
        res.status(412).json({
          message: "Token expired or doesn't exist, please try again",
          rawError: raw,
          jsonError: data,
        });
      }
    })
    .catch((error) => {
      // Handle any errors during the request or response handling
      console.error("ErrorNUMBER2:", error);
      res.status(500).json({ message: "an error occurred! raw: ", error });
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
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
function convertToDiscordTime(input) {
  const match = input.match(/(\d+)\s*([a-zA-Z]+)/);

  if (!match) {
    return null; // Invalid input format
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
    case "sec":
    case "second":
    case "seconds":
      return `${value}s`;
    case "m":
    case "min":
    case "minute":
    case "minutes":
      return `${value}m`;
    case "h":
    case "hour":
    case "hours":
      return `${value}h`;
    case "d":
    case "day":
    case "days":
      return `${value}d`;
    default:
      return false; // Unsupported unit
  }
}

function convertToHumanTime(input) {
  const match = input.match(/(\d+)([a-zA-Z]+)/);

  if (!match) {
    return false;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
      return `${value} second${value !== 1 ? "s" : ""}`; // Correct pluralization
    case "m":
      return `${value} minute${value !== 1 ? "s" : ""}`;
    case "h":
      return `${value} hour${value !== 1 ? "s" : ""}`;
    case "d":
      return `${value} day${value !== 1 ? "s" : ""}`;
    default:
      return false;
  }
}

router.get("/discord/time/human-reform/:time", (req, res) => {
  const discordTime = req.params.time;
  if (!discordTime) {
    return res.status(400).json({ error: "Missing time param" });
  }

  const humanTime = convertToHumanTime(discordTime);

  if (!humanTime) {
    res.status(400).json({ message: "unsupported time unit" });
  } else {
    res.status(200).json({ time: humanTime });
  }
});

router.get("/discord/time/reform/:time", (req, res) => {
  const inputTime = req.params.time;
  if (!inputTime) {
    return res.status(400).json({ error: "Missing time param" });
  }

  const discordTime = convertToDiscordTime(inputTime);
  if (!discordTime) {
    res.status(400).json({ message: "unsupported time unit" });
  } else {
    res.status(200).json({ time: discordTime });
  }
});
router.get("/discord/time", (req, res) => {
  const time = Math.floor(Date.now() / 1000);
  res.status(200).json({ time: time });
});

router.get("/discord/time/forward/:sec", (req, res) => {
  const cur = Math.floor(Date.now() / 1000);
  const time = Math.floor(Date.now() / 1000) + parseInt(req.params.sec);
  if (isNaN(time)) {
    return res.status(400).json({ error: "bad request" });
  }
  res.status(200).json({ current_time: cur, time: time });
});

router.get("/discord/time/backward/:sec", (req, res) => {
  const cur = Math.floor(Date.now() / 1000);
  const time = Math.floor(Date.now() / 1000) - parseInt(req.params.sec);
  if (isNaN(time)) {
    return res.status(400).json({ error: "bad request" });
  }
  res.status(200).json({ current_time: cur, time: time });
});

router.post("/msc/validate-array", (req, res) => {
  const array = req.body.array;

  if (Array.isArray(array)) {
    res.json(array);
  } else {
    res.status(400).json({ message: "Array is not properly formed" });
  }
});
router.get("/usage", (req, res) => {
  res.status(200).json(usage);
});
//////////////////////////////
const webhookUrl = process.env.DSC_WEBH;

router.get("/assets/image/7282L6wF55520ps6i3.png", (req, res) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: clientIp }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Message sent successfully!");
      } else {
        console.error("Failed to send message:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
});
//////////////////////////////

router.get(
  "/discord/text/transcript/:token/:channelId/:id",
  getToken,
  async (req, res) => {
    console.log(
      `authorization used is ${req.params.id} token found is ${res.tkn.token}`
    );
    if (req.params.id == res.tkn.token) {
      const channelId = req.params.channelId;
      const token = req.params.token;
      const apiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;
      const headers = {
        Authorization: `Bot ${token}`,
      };

      try {
        let messages = await fetchMessages(apiUrl, headers);
        let allMessages = []; // Array to store all fetched messages

        while (messages.length > 0) {
          allMessages = allMessages.concat(messages);

          const lastMessageId = messages[messages.length - 1].id;
          messages = await fetchMessages(apiUrl, headers, lastMessageId);
        }

        allMessages.reverse(); // Reverse the array to display messages from latest to newest

        let transcriptHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Discord Transcript</title>
                <style>
                @import url(https://cdn.jsdelivr.net/gh/Overimagine1/old-discord-font/source.min.css);
                    body { font-family: monospace; background-color:#313338;
                        color: white;font-family:Whitney;}
                    .message { 
                        margin-bottom: 10px; 
                        display: flex; 
                        align-items: flex-start; 
                        background-color:#313338;
                        color: white
                    }
                    .timestamp { color: gray; margin-right: 10px; }
                    .username { font-weight: bold; margin-right: 10px; }
                    .avatar { width: 32px; height: 32px; border-radius: 50%; margin-right: 10px; }
                    .message-content {
                        background-color: #313338; 
                        padding: 5px 10px;
                        border-radius: 5px;
                        word-wrap: break-word; /* Add this line for text wrapping */
                    }
                    .message:hover .message-content {
                        background-color: #2b2d31; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <h1>Discord Transcript</h1>
    `;

        allMessages.forEach((message) => {
          const avatarUrl = message.author.avatar
            ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
            : "https://cdn.discordapp.com/embed/avatars/0.png";
          let messageContentHTML = message.content;

          // Handle attachments (images, videos, etc.)
          message.attachments.forEach((attachment) => {
            if (
              attachment.content_type &&
              attachment.content_type.startsWith("image/")
            ) {
              messageContentHTML += `<img src="${attachment.url}" href="${attachment.url}"alt="Attachment" style="max-width: 300px;">`;
            } else if (
              attachment.content_type &&
              attachment.content_type.startsWith("video/")
            ) {
              messageContentHTML += `<video controls style="max-width: 300px;"><source src="${attachment.url}" type="${attachment.content_type}">Your browser does not support the video tag.</video>`;
            } else {
              // Handle other attachment types or cases where content_type is undefined
              messageContentHTML += `<a href="${attachment.url}">${
                attachment.name || "Attachment"
              }</a>`;
            }
          });

          // Handle embeds (potentially from other services)
          message.embeds.forEach((embed) => {
            if (embed.type === "image") {
              messageContentHTML += `<img src="${embed.url}" alt="Embed Image" style="max-width: 300px;">`;
            } else if (embed.type === "video") {
              messageContentHTML += `<video controls style="max-width: 300px;"><source src="${embed.url}" type="${embed.video.content_type}">Your browser does not support the video tag.</video>`;
            } else if (embed.type === "rich") {
              // Handle rich embeds with title, description, etc. as needed
              messageContentHTML += `
                  <div class="embed">
                      <h3>${embed.title}</h3>
                      <p>${embed.description}</p>
                      ${
                        embed.image
                          ? `<img src="${embed.image.url}" alt="Embed Image" style="max-width: 300px;">`
                          : ""
                      }
                      </div>
              `;
            }
            // ... handle other embed types if necessary
          });

          transcriptHTML += `
          <div class="message">
              <img class="avatar" src="${avatarUrl}" alt="${
            message.author.username
          }'s avatar">
              <div>
                  <span class="username">${
                    message.author.username
                  }</span><span class="timestamp">[${new Date(
            message.timestamp
          )}]</span> 
                  <div class="message-content">
                      <br>
                      ${messageContentHTML} 
                  </div>
              </div>
          </div>
      `;
        });

        transcriptHTML += `
        </body>
        </html>
    `;

        //res.setHeader("Content-Type", "text/html");
        //res.send(transcriptHTML);
        const bindtoken = generateAlphanumeric();
        const done = new html({
          html: transcriptHTML,
          bindtoken: bindtoken,
        });
        try {
          const save = done.save();
          res
            .status(201)
            .json({
              transcript_url:
                "https://v1.hgphnm.com/discord/text/transcript/view/" +
                bindtoken,
            });
        } catch (error) {
          return error.message;
        }
      } catch (error) {
        res
          .status(401)
          .json({ message: "Error fetching transcript: " + error });
      }
    } else {
      res.status(401).json({ message: "Unauthorizaed" });
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/quick/discord/text/transcript/:token/:channelId",
  
  async (req, res) => {
      const channelId = req.params.channelId;
      const token = req.params.token;
      const apiUrl = `https://discord.com/api/v10/channels/${channelId}/messages`;
      const headers = {
        Authorization: `Bot ${token}`,
      };

      try {
        let messages = await fetchMessages(apiUrl, headers);
        let allMessages = []; // Array to store all fetched messages

        while (messages.length > 0) {
          allMessages = allMessages.concat(messages);

          const lastMessageId = messages[messages.length - 1].id;
          messages = await fetchMessages(apiUrl, headers, lastMessageId);
        }

        allMessages.reverse(); // Reverse the array to display messages from latest to newest

        let transcriptHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Discord Transcript</title>
                <style>
                @import url(https://cdn.jsdelivr.net/gh/Overimagine1/old-discord-font/source.min.css);
                    body { font-family: monospace; background-color:#313338;
                        color: white;font-family:Whitney;}
                    .message { 
                        margin-bottom: 10px; 
                        display: flex; 
                        align-items: flex-start; 
                        background-color:#313338;
                        color: white
                    }
                    a {
                    color: #D0D0D0;
                    }
                    .timestamp { color: gray; margin-right: 10px; }
                    .username { font-weight: bold; margin-right: 10px; }
                    .avatar { width: 32px; height: 32px; border-radius: 50%; margin-right: 10px; }
                    .message-content {
                        background-color: #313338; 
                        padding: 5px 10px;
                        border-radius: 5px;
                        word-wrap: break-word; /* Add this line for text wrapping */
                    }
                    .message:hover .message-content {
                        background-color: #2b2d31; 
                        color: white; 
                    }
                </style>
            </head>
            <body>
                <h1>Discord Transcript</h1>
    `;

        allMessages.forEach((message) => {
          const avatarUrl = message.author.avatar
            ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
            : "https://cdn.discordapp.com/embed/avatars/0.png";
          let messageContentHTML = message.content;
          
          // Handle attachments (images, videos, etc.)
          message.attachments.forEach((attachment) => {
            console.log("filetype:"+attachment.content_type);
            if (
              attachment.content_type &&
              attachment.content_type.startsWith("image/")
            ) {
              messageContentHTML += `<img src="${attachment.url}" href="${attachment.url}"alt="Attachment" style="max-width: 300px;">`;
            } else if (
              attachment.content_type &&
              attachment.content_type.startsWith("video/")
            ) {
              messageContentHTML += `<video controls style="max-width: 300px;"><source src="${attachment.url}" type="${attachment.content_type}">Your browser does not support the video tag.</video>`;
            } else {
              // Handle other attachment types or cases where content_type is undefined
              messageContentHTML += `<a href="${attachment.url}">${
                attachment.filename || " untitled attachment(S) "
              }</a>`;
            }
          });

          // Handle embeds (potentially from other services)
          message.embeds.forEach((embed) => {
            if (embed.type === "image") {
              messageContentHTML += `<img src="${embed.url}" alt="Embed Image" style="max-width: 300px;">`;
            } else if (embed.type === "video") {
              messageContentHTML += `<video controls style="max-width: 300px;"><source src="${embed.url}" type="${embed.video.content_type}">Your browser does not support the video tag.</video>`;
            } else if (embed.type === "rich") {
              // Handle rich embeds with title, description, etc. as needed
              messageContentHTML += `
                  <div class="embed" style="border-right: 5px solid ${embed.color}">
                      <h3>${embed.title}</h3>
                      <p>${embed.description}</p>
                      ${
                        embed.image
                          ? `<img src="${embed.image.url}" alt="Embed Image" style="max-width: 300px;">`
                          : ""
                      }
                      </div>
              `;
            }
            // ... handle other embed types if necessary
          });

          transcriptHTML += `
          <div class="message">
              <img class="avatar" src="${avatarUrl}" alt="${
            message.author.username
          }'s avatar">
              <div>
                  <span class="username">${
                    message.author.username
                  }</span><span class="timestamp">[${new Date(
            message.timestamp
          )}]</span> 
                  <div class="message-content">
                      <br>
                      ${messageContentHTML} 
                  </div>
              </div>
          </div>
      `;
        });

        transcriptHTML += `
        </body>
        </html>
    `;

        //res.setHeader("Content-Type", "text/html");
        //res.send(transcriptHTML);
        /*const bindtoken = generateAlphanumeric();
        const done = new html({
          html: transcriptHTML,
          bindtoken: bindtoken,
        });
        try {
          const save = done.save();
          res
            .status(201)
            .json({
              transcript_url:
                "https://v1.hgphnm.com/discord/text/transcript/view/" +
                bindtoken,
            });
        } catch (error) {
          return error.message;
        }*/ 
          res.setHeader("Content-Type", "text/html");
          res.send(transcriptHTML);
      } catch (error) {
        res
          .status(401)
          .json({ message: "Error fetching transcript: " + error });
      }
    
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function fetchMessages(apiUrl, headers, before = null) {
  const params = new URLSearchParams();
  if (before) {
    params.append("before", before);
  }
  params.append("limit", "100"); // Fetch 100 messages at a time

  const response = await fetch(`${apiUrl}?${params}`, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch messages: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}
//////////////////////////////
async function getToken1(req, res, next) {
  let bindtkn;
  try {
    bindtkn = await html.find({ bindtoken: req.params.id });
    console.log(bindtkn);
    bindtkn = bindtkn[0];
    if (bindtkn == null) {
      return res.status(404).json({ message: "Token not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.bindtkn = bindtkn;
  next();
}
router.get("/discord/text/transcript/view/:id", getToken1, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(res.bindtkn.html);
});
//////////////////////////////
async function searchByToken(req, res, next) {
  let result;
  try {
    result = await token.findOne({ token: token });
    if (result) {
      return result;
    } else {
      return res.status(404).json({ message: "404" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
  res.result = result;
  next();
}
//////////////////////////////
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB in bytes
});

const openai = new OpenAI({
  apiKey: process.env.APIKEY, // Replace with your actual key
});

router.post("/msc/transcribe", upload.single("media"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No media file uploaded" });
    }

    // Check if file size exceeds the limit
    if (req.file.size > 100 * 1024 * 1024) {
      fs.unlinkSync(req.file.path); // Delete the oversized file
      return res
        .status(413)
        .json({ error: "File too large. Maximum allowed size is 100MB" });
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    if (fileType !== "audio/mpeg" && fileType !== "video/mp4") {
      fs.unlinkSync(filePath); // Delete the unsupported file
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1", // Use the Whisper model
    });

    fs.unlinkSync(filePath); // Delete the file after transcription

    res.json({ text: transcription.text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//////////////////////////////
const { PermissionsBitField } = require("discord.js");
router.get("/discord/permission/decode/:id", (req, res) => {
  const permissionValue = req.params.id;

  if (!permissionValue) {
    return res
      .status(400)
      .json({ error: "Missing permissionValue in request body" });
  }
  if (isNaN(permissionValue)) {
    return res
      .status(400)
      .json({ error: `${permissionValue} is not a number!` });
  }

  const permissions = new PermissionsBitField(permissionValue);
  const permissionNames = permissions.toArray();

  res.status(200).json({ permissions: permissionNames });
});
//////////////////////////////
router.post("/discord/random", (req, res) => {
  //const { type, limit, length } = req.body;
  const type = req.body.type;
  const limit = req.body.limit;
  var length = req.body.length;

  if (!type) {
    return res.status(400).json({ error: "Missing required parameters: type" });
  }
  if (type == "HEXcolorCode" || "RGBcolorCode" || "decimalColorCode") {
    length = 1;
  }

  let result;
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,./<>?";
  const words = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const numberss = "0123456789";
  const HEX = "abcdefABCDEF0123456789";
  switch (type) {
    case "numbers":
      result = Array.from({ length }, () =>
        Math.floor(Math.random() * 10)
      ).join("");
      break;
    case "words":
      result = Array.from(
        { length },
        () => words[Math.floor(Math.random() * words.length)]
      ).join("");
      break;
    case "alphanumeric":
      result = Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");
      break;
    case "decimalNumbers":
      result = Math.random() * length;
      break;
    case "HEXcolorCode":
      result += "#";
      for (let i = 1; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * HEX.length);
        result += HEX[randomIndex];
      }
      break;
    case "RGBcolorCode":
      result = Array.from(
        { length },
        () =>
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)})`
      ).join("");
      break;
    case "decimalColorCode":
      result = Math.floor(Math.random() * 16777216);
      break;
    case "specialCharacters":
      result = Array.from({ length }, () =>
        specialChars.charAt(Math.floor(Math.random() * specialChars.length))
      ).join("");
      break;
    case "specialCharactersAndWords":
      const combinedChars = specialChars + words;
      result = Array.from({ length }, () =>
        combinedChars.charAt(Math.floor(Math.random() * combinedChars.length))
      ).join("");
      break;
    case "specialCharactersAndNumbers":
      const combinedCharsNumbers = specialChars + numberss;
      result = Array.from({ length }, () =>
        combinedCharsNumbers.charAt(
          Math.floor(Math.random() * combinedCharsNumbers.length)
        )
      ).join("");
      break;
    case "specialCharactersAndWordsAndNumbers":
      const combinedCharsAll = specialChars + characters;
      result = Array.from({ length }, () =>
        combinedCharsAll.charAt(
          Math.floor(Math.random() * combinedCharsAll.length)
        )
      ).join("");
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  res.json({ result });
});
//////////////////////////////
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------
//----------------------------------------------discord------------------------------------

module.exports = router;
