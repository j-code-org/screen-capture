const puppeteer = require('puppeteer');
const domain = 'https://studio.code.org';
var course = '/s/course3';
var stage = 2;
var puzzle = 3;
const imagepath = './img/';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto( domain + course + '/stage/' + stage + '/puzzle/' + puzzle, {
	waitUntil: 'networkidle'
  });
  console.log( await page.cookies() );
  await page.screenshot({path: imagepath + 'example.png' });

  await page.setCookie( { name:'language_', value:'ja' } );
  stage = 2;
  puzzle = 5;

  for ( var p = 1; p < 15; p++ ) {
    console.log( 'get:' + 's' + stage + 'p' + p );
    await page.goto( domain + course + '/stage/' + stage + '/puzzle/' + p, {
        waitUntil: 'networkidle'
    });
    //console.log( await page.cookies() );
    await page.screenshot({path: imagepath + 's' + stage + 'p' + p + '.png' });
  }

  browser.close();
})();
