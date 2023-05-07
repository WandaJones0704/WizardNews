const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");

app.use(morgan("dev"));

app.use(express.static("public"));

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

app.get("/", (req, res) => res.send(generateListingPostsHtml()));

function generateListingPostsHtml() {
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizards in WandaLand</title>
    <link rel ="stylesheet" href="/style.css" />
  </head>
  <body>
 
     <header><img src="/logo.png"/> WandaLand Wizards </header>
  `;

  const posts = postBank.list();

  const postHTML = posts.map((post) => {
    return `
    
       <p>   
        <span class="news-position">  
              ${post.id}. ☕️ </span><strong><a href="/posts/${post.id}">${post.title}</a></strong>
                <small>By: ${post.name}</small>
        </p>  
         <span class="news-info">
                 ${post.upvotes} upvotes 
                 | ${post.date} `;
  });

  html += postHTML.join(" ");

  html += `

  </body>
  </html>`;
  console.log("html" + html);

  return html;
}
app.get("/", (req, res) => res.send(myHandler));

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    throw new Error("Post not Found");
  } else {
    res.send(
      `<html>
      <head>
        <title>Wizards in WandaLand</title>
        <link rel ="stylesheet" href="/style.css" />
      </head>
      <body>
      <header><img src="/logo.png"/> WandaLand Wizards </header>
      <p>   
      
    <span class="news-position">  
          <strong>${post.title}</strong></span>
            <small>By: ${post.name}</small>
  <p/>  
     <span class="news-info">
          ${post.content} 
             <p>
              ${post.date} 
              <p/>
              
              
             </body> 
              </html>`
    );
  }
});
