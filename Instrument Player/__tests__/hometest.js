import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

const targetFile = path.resolve(__dirname, '../views/home.ejs')

describe("Home Screen", () => {
    let currentUser = {username:"Login", logout:""}
    let items = [
        {name:"piano", img:"/images/keyboard.png", desc:"This is a piano"},
        {name:"guitar", img:"/images/guitar.png", desc:"This is a guitar"},
        {name:"drums", img:"/images/drum.png", desc:"This a drumset"},
        {name:"bongos", img:"/images/bongos.png", desc:"These are bongos"},
      ]
    let dom
    let container
    ejs.renderFile(targetFile, { title:'Home', items, currentUser}, function (err, str) {
        if (err){
            console.log(err)
        }
        if (str){
            beforeEach(() => {
                dom = new JSDOM(str, {}, {runScripts: 'dangerously'})
                container = dom.window.document.body
            })
        }
    it('should be 4', () => {
            console.log('>>>Number of instruments: ', container.querySelectorAll('.card').length)
            expect(container.querySelectorAll('.card')).not.toBeNull()
            expect(container.querySelectorAll('.card').length).toBe(4)  
        })
    })

})