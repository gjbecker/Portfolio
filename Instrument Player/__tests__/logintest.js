import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'

const targetFile = path.resolve(__dirname, '../views/login.ejs')

describe("Login screen", () => {
    let currentUser = {username:"Login", logout:""}
    let errors = []
    let reqSignup = {
        fname:"",
        lname:"",
        email:"",
        newUsername:"",
        newPassword:""
      }
    let reqLogin = {
        username:"",
        password:""
      }
    let dom
    let container
    ejs.renderFile(targetFile,{title:'Login', currentUser, errors, reqLogin, reqSignup}, function (err, str) {
        if (err){
            console.log(err)
        }
        if (str){
            beforeEach(() => {
                dom = new JSDOM(str, {}, {runScripts: 'dangerously'})
                container = dom.window.document.body
            })
        }
    it('should be 7', () => {
            console.log('>>>Number of form controls: ', container.querySelectorAll('.form-control').length)
            expect(container.querySelectorAll('.form-control')).not.toBeNull()
            expect(container.querySelectorAll('.form-control').length).toBe(7)  
        })
    })
    it('should be 2', () => {
        console.log('>>>Number of login form controls: ', container.querySelector('#login').querySelectorAll('.form-control').length)
        expect(container.querySelector('#login').querySelectorAll('.form-control')).not.toBeNull()
        expect(container.querySelector('#login').querySelectorAll('.form-control').length).toBe(2)  
    })
    it('should be 5', () => {
        console.log('>>>Number of signup form controls: ', container.querySelector('#signup').querySelectorAll('.form-control').length)
        expect(container.querySelector('#signup').querySelectorAll('.form-control')).not.toBeNull()
        expect(container.querySelector('#signup').querySelectorAll('.form-control').length).toBe(5)  
    })
})