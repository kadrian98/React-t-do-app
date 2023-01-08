import React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header/Header";
import Loading from "./app/components/Loading";
import { StaticRouter as Router } from "react-router-dom/server";
import StateContext from "./app/StateContext";

function Shell() {
  return (
    <StateContext.Provider value={{ loggedIn: false }}>
      <Router>
        <Header staticEmpty={true} />
        <Loading />
        <Footer />
      </Router>
    </StateContext.Provider>
  );
}

const startOfHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo React</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
    />
    <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="app">`;

const endOfHTML = `</div>
    </body>
  </html>`;

/* Use Node tools (outside the scope of this course) to setup a
  stream we can write to that saves to a file on our hard drive
*/
const fileName = "./app/index-template.html";
const writeStream = fs.createWriteStream(fileName);

// Add the start of our HTML template to the stream
writeStream.write(startOfHTML);

/*
  Add the actual React generated HTML to the stream.
  We can use ReactDomServer (you can see how we imported
  that at the very top of this file) to generate a string
  of HTML text that a Node stream can leverage.
*/
const myStream = ReactDOMServer.renderToPipeableStream(<Shell />, {
  onAllReady() {
    myStream.pipe(writeStream);
    // End the stream with the final bit of our HTML
    writeStream.end(endOfHTML);
  }
});
