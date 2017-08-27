const puppeteer = require('puppeteer');
const domain = 'https://studio.code.org';
const imagepath = './img/';

async function oneScreenshot( page, c, s, p, ex ) {

  const course = '/s/course';
  const stage = 2;
  const puzzle = 3;
  
  let pagename =  domain + '/s/course' + c + '/stage/' + s + '/puzzle/' + p;
  let filename =  imagepath + c + '/c' + c + 's' + zero2( s ) + 'p' + zero2( p ) + ex + '.png';
  console.log( pagename, filename );
  try {
    await page.goto( pagename, {
      waitUntil: 'networkidle'
    });
  } catch ( err ) {
    console.log( "page.goto error !" );
  }
  return page.screenshot({ path: filename });
}

function zero2( n ) {
  return ('00' + n).slice( -2 );
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto( domain + '/course', {
  	waitUntil: 'networkidle'
  });
  console.log( await page.cookies() );
  await page.screenshot({ path: imagepath + 'example.png' });
  // 日本語に設定 
  await page.setCookie({ name:'language_', value:'ja' } );

  const courses = [
    {course: 2, section: [
      3,
      3,
      11,
      12,
      2,
      14,
      16,
      14,
      3,
      11,
      12,
      2,
      15,
      2,
      2,
      10,
      11,
      2,
      13
    ]},
    {course: 3, section: [
      3,
      15,
      15,
      3,
      10,
      11,
      10,
      12,
      2,
      3,
      12,
      9,
      13,
      13,
      10,
      6,
      7,
      3,
      3,
      2,
      15
    ]},
    {course: 4, section: [
      1,
      9,
      14,
      1,
      1,
      16,
      8,
      1,
      11,
      12,
      7,
      13,
      1,
      17,
      11,
      8,
      1,
      11,
      6,
      8,
      5,
      5
    ]}
  ];
  const c = courses[2].course;
  const tbl = courses[2].section;
  
  for ( let s = 0; s < tbl.length; s++ ) {
    console.log( "course3 ", s+1, tbl[s] );
    for ( let p = 0; p < tbl[s]; p++ ) {
      await oneScreenshot(page, c, s+1, p+1, "a");
      await page.mouse.click(100, 100);
      await oneScreenshot(page, c, s+1, p+1, "b");
    }
  }

  browser.close();
})();
