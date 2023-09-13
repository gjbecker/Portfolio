import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

const targetFile = path.resolve(__dirname, '../views/login.ejs')

describe("Login", () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
    })

    it("Login test user", async () => {
        await page.goto("http://localhost:"+ process.env.PORT +"/login") 
        await page.click("#inputUsername")
        await page.type("#inputUsername", "test0")
        await page.click("#inputPassword3")
        await page.type("#inputPassword3", "password")
        await page.click("#login-btn")
        const text = await page.$eval("#user", (e) => e.textContent)
        console.log("User: " + text)
        expect(text).toContain("test")
    })
    afterAll(() => browser.close())

})