// import postBank from "./postBank";

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
  const posts = postBank.list();

  const postHTML = posts.map((post) => {
    return `<li> <strong>Title</strong>: ${post.title} 
                <strong> Author: </strong> ${post.name}</li>  `;
  });

  html = postHTML.join(" ");

  return html;
}
// app.get("/", (req, res) => {const post = postBank.list();

// const postList = post.map(post =>
// <a href="/posts/${post.id}">${post.title}</a>
// </li>`
// ).join('');

// const html = (
//   <html>
//     <head>
//       <title>Wizard News</title>
//     </head>
//     <body>
//       <ul></ul>
//     </body>
//   </html>
// );

// res.send(html);

// const PORT = 1337;

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
