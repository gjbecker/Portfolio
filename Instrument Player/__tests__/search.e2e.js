import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

const targetFile = path.resolve(__dirname, '../views/home.ejs')

describe("Search", () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
    })

    it("Search for piano", async () => {
        await page.goto("http://localhost:"+ process.env.PORT)
        await page.click("#search_bar")
        await page.type("#search_bar", "pi")
        await page.click("#search.btn.btn-outline-light")
        const text = await page.$eval("#piano-title.card-title", (e) => e.textContent)
        console.log(text)
        expect(text).toContain("Piano")
    })
    it("clear search and show all", async () => {
        await page.click("#clear.btn.btn-outline-light")
        const text = await page.$eval("#bongos-title.card-title", (e) => e.textContent)
        console.log(text)
        expect(text).toContain("Bongo")
    })

    afterAll(() => browser.close())

})