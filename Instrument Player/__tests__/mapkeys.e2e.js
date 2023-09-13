import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

const targetFile = path.resolve(__dirname, '../views/instruments/piano.ejs')

describe("Map Keys", () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
    })

    it("shows map keys form", async () => {
        await page.goto("http://localhost:"+ process.env.PORT)
        await page.click("#piano")
        await page.click("#navmap.nav-item.nav-link")
        const text = await page.$eval("#maptitle", (e) => e.textContent)
        expect(text).toContain("Map Keys")
    })

    it("should update key mappings", async () => {
        await page.goto("http://localhost:"+ process.env.PORT)
        await page.click("#piano")
        await page.click("#navmap.nav-item.nav-link")
        await page.click("#white")
        await page.type("#white", "q,w,e,r,t,y,u")

        await page.click("#black")
        await page.type("#black", "z,x,c,v,b")

        await page.click("#mapsubmit.btn.btn-success")
        const text = await page.$eval("#ckey.key-code.white", (e) => e.textContent)
        console.log(text)
        expect(text).toContain("q")

    })

    afterAll(() => browser.close())

})