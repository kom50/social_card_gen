const express = require("express"); 
const nodeHtmlToImage = require('node-html-to-image')
// const cors = require('cors'); 

const app = express()
// app.use(cors())  

async function dynamicSocialCardGenerator(req, res){
  console.log('call from Alert 1', req.query);

  let {title, img_url, info} = req.query 
  // title = title.split("%20").join(" ");
  // info = info.split("%20").join(" ");
   
  nodeHtmlToImage({
    output: './image.png',
    html: `<!DOCTYPE html>
      <html lang="en">
        <style>
        .card{
          border: 1px solid blue;
          width:1200px;
          height:600px; 
          background-color: #f2f2f2;
          position:relative; 
          border-bottom:5px yellow solid;
          box-sizing: border-box; 
        }
        .title{ 
          font-size:3.5rem;
          margin: 0; 
        }
        img{ 
          width: 200px;
          height:200px;
          border-radius:50%;
           
          margin-left:auto;
        }
        .info-label{
          position:absolute;
          bottom:45px;
          font-size:2.5rem;
          padding-left:60px;
       } 
      .box{
          display: flex;
          padding:60px;
      }
      .site-name{
        background-color: blue;
        color: white;
        padding: 5px;
        text-align: center;
        font-size: 2.5rem;
        position:absolute;
        bottom:0px;
        width: 100%;
        font-weight:bold;
     }
      </style>
    </head> 
     <body class='card'> 
        <div class="box">
          <h1 class='title'>{{title}} </h1> 
          <img src='{{img_url}}'/>   
        </div>
        {{#if info.length}}
          <p class='info-label'>Exams:- {{info}}</p> 
        {{/if}}
        <div class='site-name'>alert.exampathfinder.com</div>
        </body>
    </html>`, 
    content:{title, img_url, info  }, 
  }).then(data=>{
    res.set("Content-Type", "image/png");
    res.status(200)
    res.send(data)
  }).catch(err=>{
    res.status(404)
    res.send(err)
  })
}  
app.get('/social_card',  dynamicSocialCardGenerator)

const PORT = 3000

app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})