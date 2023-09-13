import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import puppeteer from 'puppeteer'

const targetFile = path.resolve(__dirname, '../views/login.ejs')

describe("Validation", () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()
    })

    it("Login validation", async () => {
        await page.goto("http://localhost:"+ process.env.PORT +"/login") 
        await page.click("#login-btn")
        const text = await page.$eval("#error", (e) => e.textContent)
        console.log(text)
        expect(text).toContain("Username")
        expect(text).toContain("Password")
    })
    it("Signup validation", async () => {
        await page.goto("http://localhost:"+ process.env.PORT +"/login") 
        await page.click("#signup-btn")
        const text = await page.$eval("#error", (e) => e.textContent)
        console.log(text)
        expect(text).toContain("First")
        expect(text).toContain("Last")
        expect(text).toContain("email")
        expect(text).toContain("Username")
        expect(text).toContain("password")
    })

    afterAll(() => browser.close())
})