const db = require("../model/helper");
const puppeteer = require("puppeteer");
console.log(db, "totally exists");
// async function insertIntoDB(name, email, party) {
//     try {
//         await db(`INSERT INTO politicians (name, email_address, party, msgs_sent) VALUES ("${name}", "${email}", "${party}", 0);`)
//     } catch (err) {
//         console.log({msg : "the alliance has fallen"})
//     }
// }

async function addSenatorsToDatabases() {
  //// open a new browser, args are setting the visibility and view
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.senado.es/web/relacionesciudadanos/participacion/senadores/index.html",
    { waitUntil: "domcontentloaded" }
  );

  const addresses = await page.evaluate(() => {
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
        });
      }
    }

    return result;
  });

  for (const address of addresses) {
    db(
      `INSERT INTO politicians (name, email_address, party, msgs_sent) VALUES ("${address.name}", "${address.email}", "${address.party}", 0);`
    );
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
//       const email = document.querySelector("div.email-dip > a")
//       console.log(email)
//     })
//   }

// await page.goto("https://www.congreso.es/es/busqueda-de-diputados", {waitUntil: "domcontentloaded"})

// const addresses = await page.evaluate(async () => {
//   const bodyOfPage = document.querySelector("#_diputadomodule_contentPaginationDiputados > table > tbody")
//   for (let dip in bodyOfPage) {
//     const nextLink = document.querySelector(`${dip} > tr > th > a`)
//     await page.goto(nextLink.href)
//     const getMailDip = await page.evaluate(() => {
//       const email = document.querySelector("div.email-dip > a").href
//       console.log(email)
//     })
//   }
// })

// await new Promise(r => setTimeout(r, 240000));
// await browser.close()

// }

// getEmailAddressesOfDiputados();
