const db = require("../model/helper");
const puppeteer = require('puppeteer')


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

  
  const listOfParties = [...new Set(senators.map((senator) => senator.party))]

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
    await db(`INSERT INTO parties (party, organ, webpage) VALUES ("${party}", "Senado", "${webpages[party]}");`)
  }
  
  for (const senator of senators) {
  const party = await db(`SELECT id FROM parties WHERE party="${senator.party}";`)
  
    await db(`INSERT INTO politicians (name, email_address, msgs_sent, organ, party_id) VALUES ("${senator.name}", "${senator.email}", 0, "Senado", "${party?.data[0]?.id}");`)
  }

  await new Promise((r) => setTimeout(r, 120000));
  await browser.close();
}

addSenatorsToDatabases();


async function getEmailAddressesOfDiputados() {
  const browser = await puppeteer.launch({ headless:true, defaultViewport: null});
  const page = await browser.newPage();
  const numberOfDiputadas = 350;

  const allDiputadas = []

    for (let i = 0; i < numberOfDiputadas; i++) {
      await page.goto(`https://www.congreso.es/es/busqueda-de-diputados?p_p_id=diputadomodule&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_diputadomodule_mostrarFicha=true&codParlamentario=${i}&idLegislatura=XV&mostrarAgenda=false`,
          {waitUntil: "domcontentloaded"})

      let diputada = await page.evaluate(() => {
        const emailDip = document?.querySelector("div.email-dip > a")
        const nameDip = document?.querySelector("div.nombre-dip")
        const affiliationDip = document?.querySelector("div.grupo-dip > a")
        const dipu = {
          name: nameDip?.innerText,
          email : emailDip?.href.substring(7),
          party: affiliationDip?.innerText
        }
            console.log(dipu)
            return dipu
      })
      allDiputadas.push(diputada)
    }

  const listOfParties = [...new Set(allDiputadas.map((diputada) => diputada.party))]

  const webpages = {
    "G.P. Popular en el Congreso ( GP )" : "https://www.pp.es/actualidad/noticias",
    "G.P. VOX ( GVOX )" : "https://www.voxespana.es/programa/programa-electoral-vox",
    "G.P. Socialista ( GS ) " : "https://www.psoe.es/actualidad/noticias-actualidad/",
    "G.P. Plurinacional SUMAR ( GSUMAR )" : "https://movimientosumar.es/wp-content/uploads/2023/07/Un-Programa-para-ti.pdf",
    "G.P. Mixto ( GMx )" : "https://www.congreso.es/es/proposiciones-de-ley",
    "G.P. Republicano ( GR )" : "https://duckduckgo.com/?q=congreso+de+diputados+espa%C3%B1a&atb=v309-1&iar=news&ia=news",
    "G.P. Junts per Catalunya ( GJxCAT )" : "https://junts.cat/actualitat",
    "G.P. EH Bildu ( GEH Bildu )" : "https://ehbildu.eus/es#albisteak",
    "G.P. Vasco (EAJ-PNV) ( GV (EAJ-PNV) )" : "https://www.eaj-pnv.eus/es/noticias/"
  }

  for (const party of listOfParties) {
    await db(`INSERT INTO parties (party, organ, webpage) VALUES ("${party}", "Congreso de Diputadas", "${webpages[party]}");`)
  }

  for (let dipu of allDiputadas) {
    const party = await db(`SELECT id FROM parties WHERE party="${dipu.party}";`)
  
    await db(`INSERT INTO politicians (name, email_address, msgs_sent, organ, party_id) VALUES ("${dipu.name}", "${dipu.email}", 0, "Congreso de Diputadas", "${party?.data[0]?.id}");`)
  }

await new Promise((r) => setTimeout(r, 120000));
await browser.close()

}

getEmailAddressesOfDiputados();

