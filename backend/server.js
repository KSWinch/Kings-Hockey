// server.js
import express from 'express';
const app = express();
const PORT = 8080;
import WebScrapperService from './webscrapper.js';

// define the route
app.get('/',
    async (req, res) => {
        const webscrapper = new WebScrapperService('https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723')
        await webscrapper.initializeWebScrapper()
        console.log(await webscrapper.getElement())
        res.send(
            `<h1 style="color: green;">
            
            Hello Gfg!</h1>`
        );
    });

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });

    