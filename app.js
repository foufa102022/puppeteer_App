

const express = require("express");

const puppeteer = require("puppeteer");

const engine = require("express-handlebars").engine;

const app = express();
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("news");
});

app.get("/fetchNews", async function (req, res) {
    let searchQuery = global;
   let searchbbcURL = "https://www.bbc.co.uk/search?q=" + searchQuery;

 
    console.log(searchbbcURL);
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();
  
    await page.goto(searchbbcURL);
  
    const html = await page.evaluate(function () {
        let allProducts = document.querySelectorAll('.ssrcss-53phst-Promo')
   
   
        let products = [];
        for (let product of allProducts) {
            let actualityTitle = product.querySelector(".ssrcss-tq7xfh-PromoContent").textContent;   
            products.push({ actualityTitle, })
        }
        
        
        return products;
      });
    
      console.log(html);
    
     await browser.close();
    
    
      res.render("fetchNews", {
        resultat: html,
      });
    });
    app.get("/about", function (req, res) {});

app.listen(3000);






































 

 
      
    
     
   
    

