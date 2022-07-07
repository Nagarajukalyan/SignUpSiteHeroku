const request=require("request");
const express=require("express");
const app=express();
const https=require("https");

const bodyParser=require("body-parser");
const e = require("express");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req, res){
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }

            }
        ]
    }
    const JSONdata=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/2a88d5f6f0";
    const options={
        method:"POST",
        auth: "kalyan:5c6eccce691cab69ddf41305e6b79f1f-us8"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(JSONdata);
    request.end();

});
app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT||3000, function(){
    console.log("Server is running!");
});





