/*|===================================================================|*/
/*|                        Program Information                        |*/
/*|===================================================================|*/
/*| Name: Auto Rhyme Tables                                           |*/
/*| Description: Node js application, meant to be partenred with HTML |*/
/*| UI, to search and filter word rhymes.                             |*/
/*|===================================================================|*/
/*| Author: Jack Kelly                                                |*/
/*| Date: 4/8/2020                                                   |*/
/*| Version: v1.0.0                                                   |*/
/*|===================================================================|*/


const electron = require('electron');
const { app, BrowserWindow, Menu, ipcRenderer, ipcMain } = electron;
const shell = electron.shell;
const path = require('path');
const url = require('url');
const fs = require('fs-extra');
// Modules to control the web scraping process.
const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;
const http = require('http');

const timeout = millis => new Promise(resolve => setTimeout(resolve, millis));

let one = [];
let two = [];
let three = [];
let four = [];
let five = [];
let six = [];
let seven = [];
let eight = [];
let nine = [];
let ten = [];

var fileName = "";
var html = "";



const chromeOptions = {
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    slowMo: 0,
    defaultViewport:null
};

function getDate() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let fullDate = (month + "-" + date + "-" + year);
    return fullDate;
}

//set ENV
process.env.NODE_ENV = 'production';



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


// Listen for app to be ready
app.on('ready', function() {
    // Create new window
    mainWindow = new BrowserWindow({
      width: 750,
      height: 790
    });
    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function() {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
}

var filteredWords = [];
var overviewResults = [];





// Catch mcNumber:add
ipcMain.on('words:add', function(e, words) {


    while (words.indexOf(' ') > -1) {
      words = words.replace(" ","");
    }


    var comma = words.indexOf(',');
    var filtered;


    while (comma > -1) {
        comma = words.indexOf(',');

        filterd = words.substring(0, comma);
        filteredWords.push(filterd);
        var plusOne = (comma + 1);
        words = words.substring(plusOne);
        comma = words.indexOf(',');

    }
    filteredWords.push(words);
    console.log(filteredWords);
    findRhymes();
});

ipcMain.on('show:results', function(e) {
    printResults();
  });

async function findRhymes() {
    mainWindow.webContents.send('progress:current');
fileName = ("C:\\RhymeTables\\ValidRhymeTables\\(" + getDate() + ")\\RhymeResults.html");

    for (var i = 0; i < filteredWords.length; i++) {


        console.log("\nBegining of main for loop.");

        var word = filteredWords[i];

        const browser = await puppeteer.launch(chromeOptions);

        const page = await browser.newPage();

        await page.goto("https://www.rhymezone.com/");

        await page.type('#rzinput', word);
        await page.select("#form1 > select", "adv");
        try {
            await page.waitForSelector('#form1 > input[type=submit]:nth-child(3)', {
                timeout: 6000
            });
            console.log("\nSearch Button Present!");
            await page.click("#form1 > input[type=submit]:nth-child(3)");
        } catch (error) {
            console.log("\nSearch button NOT present!");
        }

            try {
                await page.waitForSelector('#rzadv_table_wrapper', {
                    timeout: 6000
                });
                console.log("word : " + word + " Rhyme table PRESENT");
            } catch (error) {
                console.log("word : " + word + " Rhyme table NOT present");
                browser.close();
                break;
            }
            one.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(1) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            two.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(2) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            three.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(3) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            four.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(4) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            five.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(5) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            six.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(6) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            seven.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(7) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            eight.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(8) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            nine.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(9) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
            ten.push(await page.$$eval('#rzadv_table > tbody > tr:nth-child(10) > td:nth-child(1) > span > b > a', tds => tds.map((td) => {return td.textContent;})));
                  browser.close();
              }
              one.forEach( x => console.log("\nrhyme:" + x));
          console.log("\n end of for loop");
        saveFile();
      }

      function saveFile(){
        console.log("\n start of html sec");
            html += `<html>
            <style>
            table {
              font-family: "Times New Roman", Times, serif;
              border: 6px solid black;
              font-size: 24px;
              text-align: center;
              border-collapse: collapse;
            }
            table td,
            table th {
              border: 3px solid black;
              font-size: 35px;
              padding: 4px 8px;
            }
            table tr th:nth-child(odd) {
              background: #ebe8e8;
              text-decoration: underline;
              color: black;
            }
            table tr th:nth-child(even) {
              background: #242424;
              text-decoration: underline;
              color: white;
            }
            table tbody td {
              font-size: 30px;
            }
            table tr td:nth-child(odd) {
              background: #ebe8e8;
              color: black;
            }
            table tr td:nth-child(even) {
              background: #242424;
              color: white;
            }
            table thead {
              background: #0b6fa4;
              border-bottom: 5px solid black;
            }
            table thead th {
              font-size: 17px;
              font-weight: bold;
              color: #ffffff;
              text-align: center;
              border-left: 2px solid black;
            }
            table thead th:first-child {
              border-left: none;
            }
            
            table tfoot {
              font-size: 14px;
              font-weight: bold;
              color: #333333;
              background: #d0e4f5;
              border-top: 3px solid #444444;
            }
            table tfoot td {
              font-size: 14px;
            }
            
              </style>
<body><center><table>`;


var x;
html += "<tr>"
for ( x =0; x < filteredWords.length; x++){
  
  html+= `<th>` + filteredWords[x] + `</th>`; 
  
} html += "</tr>";


                          html += "<tr>";
                          for ( x =0; x < one.length; x++){
                            html+= `<td>` + one[x] + `</td>`;
                          } html += "</tr><tr>";
                          for ( x =0; x < two.length; x++){
                            html+= `<td>` + two[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < three.length; x++){
                            html+= `<td>` + three[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < four.length; x++){
                            html+= `<td>` + four[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < five.length; x++){
                            html+= `<td>` + five[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < six.length; x++){
                            html+= `<td>` + six[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < seven.length; x++){
                            html+= `<td>` + seven[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < eight.length; x++){
                            html+= `<td>` + eight[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < nine.length; x++){
                            html+= `<td>` + nine[x] + `</td>`;
                          }html += "</tr><tr>";
                          for ( x =0; x < ten.length; x++){
                            html+= `<td>` + ten[x] + `</td>`;
                          }

                          html += "</tr>";
            





            html += "</table></center></body></hmtl>";

            fs.ensureFileSync(fileName);

            fs.writeFile(fileName, html, 'utf8', (err) => {
                if (err) throw err;
                console.log("The file has been saved!");
            });

            mainWindow.webContents.send('complete:success');
            console.log("\ncalled complete:success");
            printResults();
      }





function printResults() {
    shell.openExternal(fileName);
}

// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'File',
        submenu: [{
                label: 'Print Results',
                click() {
                    printResults();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}


async function findRyhmes(word){

}