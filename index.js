const exp = require("constants");
let express = require("express");
const { copyFileSync } = require("fs");
let uuid = require("uuid");
var methodOverride = require('method-override');
let app = express(); 
app.use(methodOverride('_method'));


let port = 808;
let path = require("path");
const { randomUUID } = require("crypto");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>
{
    res.send("server is working succesfully");
});
let posts = [
    {
        username:"Rizwan",content:"Coding is life",id:uuid.v4()
    },
    {
        username:"mohamamd",content:"Coding is life",id:uuid.v4()
    },
    {
        username:"shafiqa",content:"Coding is life",id:uuid.v4()
    }
]
let idcout  = 3;
app.get("/posts",(req,res)=>
{
    // res.send("GET POST REQUESTED ");
    res.render("index.ejs",{posts:posts});
    console.log(posts);
});
app.get("/posts/new",(req,res)=>
    {
        // res.send("GET POST REQUESTED ");
        res.render("new.ejs");
    });
    app.post("/posts",(req,res)=>{
        console.log(req.body);
        let {user,content} = req.body;
        console.log(user,content);
        posts.push({username:user,content:content,id:uuid.v4()});
        // res.send("POST CREATED");
        console.log(posts);
        res.redirect("/posts")
        
    });
    app.get("/posts/:id",(req,res)=>
        {
            let {id} = req.params;
            // res.send("GET POST REQUESTED ");
            // id =parseInt(id);
            let post = posts.find((post)=>post.id==id);
            res.render("show.ejs",{post:post});
            console.log(posts);
        });
        app.get("/posts/:id/edit",(req,res)=>
            {
                let {id} = req.params;
                // res.send("GET POST REQUESTED ");
                // id =parseInt(id);
                let post = posts.find((post)=>post.id==id);
                res.render("edit.ejs",{post:post})
            });

app.patch("/posts/:id",(req,res)=>
        {
            let {id} = req.params;
            let newContent = req.body.content;
            let post = posts.find((post)=>post.id==id);
            console.log(newContent);
            post.content = newContent;
            // res.send("PATCH REQUESTED"+" "+post.content);
            res.redirect("/posts");
            console.log(post);
            // app.redirect("/posts");
        });
        app.delete("/posts/:id",(req,res)=>{
            let {id} = req.params;
            // let newContent = req.body.content;
             posts = posts.filter((post)=>post.id !==id); 
            res.redirect("/posts"); 

        })
    