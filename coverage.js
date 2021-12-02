const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async (site) => {
    const browser = await puppeteer.launch({'headless':false}, {waitUntil: 'networkidle2'})
    const page = await browser.newPage()
    await page.goto('https://www.google.com/')
    await page.click('button[id="L2AGLb"]')
    await page.waitForNavigation()
    await page.click('input[class="gLFyf gsfi"]')
    await page.keyboard.type(`site:${site} covid after:2020-01-01 before:2020-12-31`)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    const result = await page.evaluate(() => {

      if (document.getElementById("result-stats").innerText.includes("About")) {
        
        let results = Number(document.getElementById("result-stats").innerText.split("About ")[1].split(" result")[0].replace(/[,]/g,""))
        return results

      } else {
        let results = Number(document.getElementById("result-stats").innerText.split(" result")[0].replace(/[,]/g,""))
        return results
      } 
    });
    browser.close()
    stats = {site, result}
    return stats
  };

const sites = ["publico.pt", "observador.pt", "jornaldeleiria.pt","jornaleconomico.sapo.pt","ointerior.pt"]
var numberArticles = []
  
async function sequentialScrape(item) {
    // notice that we can await a function
    // that returns a promise
    await scrape(item).then((value) => {
        //console.log(value);
        numberArticles.push(value)
      });
};

async function processArray(array) {
    for (const item of array) {
      await sequentialScrape(item);
    }
    console.log('Scraping Finished!');
    //console.log(numberArticles)
    data = JSON.stringify(numberArticles);
    //console.log(data);
    fs.writeFile("./results_covid.json", data, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
   
      console.log("JSON file has been saved.");
  });
};

processArray(sites);