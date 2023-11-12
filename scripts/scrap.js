const db = require("../model/helper");
const puppeteer = require('puppeteer')


async function addSenatorsToDatabases() {
  //// open a new browser, args are setting the visibility and view
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.senado.es/web/relacionesciudadanos/participacion/senadores/index.html",
    { waitUntil: "domcontentloaded" }
  );

  const senators = await page.evaluate(() => {
    const allSenators = document.querySelectorAll(
      "li.alterna three-col, li.three-col"
    );

    const result = [];
    
    for (let sen of allSenators) {
      let email = sen.querySelector("span.col-3 > a");
      let nameSen = sen.querySelector("span.col-1 > a");
      let affiliationSen = sen.querySelector("span.col-2 > acronym");

      if (email.href.startsWith("mailto:")) {
        result.push({
          name: nameSen.innerText,
          email: email.href.substring(7),
          party: affiliationSen.title,
        })
      }
    }

    return result
  });

  // for (const party of listOfParties) {
  //   db(`INSERT INTO politicians (party) VALUES ("${party}")`)
  // }
  
  const listOfParties = [...new Set(senators.map((senator) => senator.party))]
  // console.log(listOfParties)

  const webpages = {
    "GRUPO PARLAMENTARIO POPULAR EN EL SENADO" : "https://www.pp.es/actualidad/noticias",
    "GRUPO PARLAMENTARIO VASCO EN EL SENADO (EAJ-PNV)" : "https://senado.eaj-pnv.eus/es/noticias/",
    "GRUPO PARLAMENTARIO PLURAL EN EL SENADO JUNTS PER CATALUNYA-COALICIÓN CANARIA-AGRUPACIÓN HERREÑA INDEPENDIENTE-BLOQUE NACIONALISTA GALEGO" : "https://videoservlet.senado.es/web/composicionorganizacion/gruposparlamentarios/composiciongruposparlamentarios/fichaGrupoParlamentario/iniciativasgrupo/index.html?lang=es_ES&id=807&id2=713&id3=S&id4=14",
    "GRUPO PARLAMENTARIO SOCIALISTA" : "https://www.psoe.es/congreso/noticias-congreso/",
    "GRUPO PARLAMENTARIO MIXTO" : "https://www.senado.es/web/composicionorganizacion/gruposparlamentarios/composiciongruposparlamentarios/fichaGrupoParlamentario/iniciativasgrupo/index.html;jsessionid=DWLblLSXnq1622xLvJSjmy1p0lJ1BXnGFfhQQpQNy32P7S5m2LrR!-705651948?id=806&id2=711&id3=S&id4=15",
    "GRUPO PARLAMENTARIO IZQUIERDA CONFEDERAL (MÁS MADRID, EIVISSA I FORMENTERA AL SENAT, COMPROMÍS, AGRUPACIÓN SOCIALISTA GOMERA Y GEROA BAI)" : "https://www.senado.es/web/actividadparlamentaria/actualidad/noticias/index.html",
    "GRUPO PARLAMENTARIO IZQUIERDAS POR LA INDEPENDENCIA (ESQUERRA REPUBLICANA-EUSKAL HERRIA BILDU)" : "https://www.esquerra.cat/ca/inici",
  }

  
  for (const party of listOfParties) {
    await db(`INSERT INTO parties (party, webpage) VALUES ("${party}", "${webpages[party]}");`)
  }
  
  for (const senator of senators) {
  // const party_id = await db(`SELECT id FROM parties WHERE party="${senator.party}";`)
  
    await db(`INSERT INTO politicians (name, email_address, msgs_sent, party) VALUES ("${senator.name}", "${senator.email}", 0, "${senator.party}");`)
  }

  await new Promise((r) => setTimeout(r, 240000));
  await browser.close();
}


addSenatorsToDatabases();



// async function getEmailAddressesOfDiputados() {
//   const browser = await puppeteer.launch({ headless:false, defaultViewport: null});
//   const page = await browser.newPage();
//   let numberOfDiputados = 350;
//   for (let i = 0; i < numberOfDiputados; i++) {
//     await page.goto("https://www.congreso.es/es/busqueda-de-diputados?p_p_id=diputadomodule&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_diputadomodule_mostrarFicha=true&codParlamentario="+i+"&idLegislatura=XV&mostrarAgenda=false", {waitUntil: "domcontentloaded"})
//     let emails = await page.evaluate(() => {
//       const email = document.waitForSelector("div.email-dip > a")
//       console.log(email)
//     })
//   }

// await page.goto("https://www.congreso.es/es/busqueda-de-diputados", {waitUntil: "domcontentloaded"})

// const addresses = await page.evaluate(async () => {
//   const bodyOfPage = document.querySelector("#_diputadomodule_contentPaginationDiputados > table > tbody")
//   for (let dip in bodyOfPage) {
//     const nextLink = document.querySelector(`${dip} > tr > th > a`)
//     await page.goto(nextLink.href)
//     const getMailDip = await page.evaluate(async () => {
//       const email = document.waitForSelector("div.email-dip > a").href
      
//     })
//   }
// })

// await new Promise(r => setTimeout(r, 240000));
// await browser.close()

// }

// getEmailAddressesOfDiputados();
