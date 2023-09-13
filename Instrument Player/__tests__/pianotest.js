import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

const targetFile = path.resolve(__dirname, '../views/instruments/piano.ejs')

describe("Piano Screen", () => {
    let currentUser = {username:"Login", logout:""}
    let dom
    let container
    ejs.renderFile(targetFile,{title: 'Piano', currentUser}, function (err, str) {
        if (err){
            console.log(err)
        }
        if (str){
            beforeEach(() => {
                dom = new JSDOM(str, {}, {runScripts: 'dangerously'})
                container = dom.window.document.body
            })
        }
    it('should be 12', () => {
            console.log('>>>Number of keys: ', container.querySelectorAll('.key').length)
            expect(container.querySelectorAll('.key')).not.toBeNull()
            expect(container.querySelectorAll('.key').length).toBe(12)  
        })
    })
    it('should be 5', () => {
        console.log('>>>Number of black keys: ', container.querySelectorAll('.key.black').length)
        expect(container.querySelectorAll('.key.black')).not.toBeNull()
        expect(container.querySelectorAll('.key.black').length).toBe(5)
    })
    it('should be 7', () => {
        console.log('>>>Number of white keys: ', container.querySelectorAll('.key.white').length)
        expect(container.querySelectorAll('.key.white')).not.toBeNull()
        expect(container.querySelectorAll('.key.white').length).toBe(7)
    })
    test('map keys not on screen', () => {
        console.log('>>>Display type: ', dom.window.document.getElementById('popup').style.display)
        expect(dom.window.document.getElementById('popup').style.display).toBe('none')
    })
    test('keyboard mappings', () => {
        console.log('>>>Key mappings: ', container.querySelectorAll('.key-code'))
        expect(container.querySelectorAll('.key.white')).not.toBeNull()
    })

})

