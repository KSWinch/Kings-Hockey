import puppeteer from'puppeteer';

// const url = 'https://crhl.hockeyshift.com/stats#/489/schedule?all&team_id=465723';

export default class WebScrapperService { 
    constructor(url) {
        this.url = url
    }

    async getElement() {
        const elements = this.page.waitForSelector('::-p-xpath(/html/body/div[1]/main/div/div/div/stats-page/partial/div/partial/div/div[2]/div/div[1]/table/tbody/tr[1]/td[7])');
        //const scheduleData = await this.page(() => {
            //const elements = Array.from(document.querySelectorAll('/html/body/div[1]/main/div/div/div/stats-page/partial/div/partial/div/div[2]/div/div[1]/table/tbody')); // Adjust the selector
            //return elements.map(element => element.textContent.trim());
        //});
        return elements
    }

    async initializeWebScrapper() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(this.url, { waitUntil: 'networkidle0' });
        console.log(this.page)
    }
}


