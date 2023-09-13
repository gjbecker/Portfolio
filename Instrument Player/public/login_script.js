const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

// Forms
const signupForm = document.getElementById('signup')
const loginForm = document.getElementById('login')


/// Validation
signupForm.addEventListener('submit', event => {
    if (!signupValidate()){
        alertPlaceholder.innerHTML = ""
            alert('<i class="bi-exclamation-circle"></i> Something went wrong!', 'danger')
    }
    event.preventDefault()
    event.stopPropagation()
}, false)

loginForm.addEventListener('submit', event => {
    if (!loginValidate()){
        alertPlaceholder.innerHTML = ""
            alert('<i class="bi-exclamation-circle"></i> Something went wrong!', 'danger')
    }
    event.preventDefault()
    event.stopPropagation()
}, false)

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissable" role="alert">`,
        `   <div>${message}</div>`,
        '    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}


// Validation Tests
let signupValidate = function(){
  val = true;
  let name1 = document.getElementById('inputName1')
  let name2 = document.getElementById('inputName2')
  let email = document.getElementById('inputEmail3')
  let username = document.getElementById('setUsername')
  let password = document.getElementById('setPassword3')
  
  if (name1.value.length == 0)
  {
    name1.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    name1.setAttribute("class", "form-control is-valid");
  }

  if (name2.value.length == 0)
  {
    name2.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    name2.setAttribute("class", "form-control is-valid");
  }

  if (!email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  }
  else{
      email.setAttribute("class", "form-control is-valid");
  }

  if (username.value.length == 0)
  {
    username.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    username.setAttribute("class", "form-control is-valid");
  }

  if (password.value.length < 8 || password.value.length > 20)
  {
    password.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    password.setAttribute("class", "form-control is-valid");
  }

  if (val){    
    for (const [key, value] of Object.entries()) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
    }
    alertPlaceholder.innerHTML = ""
    alert('<i class="bi-person-check-fill"></i> You have signed up successfully!', 'success')
  }
  return val;
}

let loginValidate = function(){
    val = true;
    let username = document.getElementById('inputUsername')
    let password = document.getElementById('inputPassword3')

  if (username.value.length == 0)
  {
    username.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    username.setAttribute("class", "form-control is-valid");
  }

  if (password.value.length < 8 || password.value.length > 20)
  {
    password.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    password.setAttribute("class", "form-control is-valid");
  }

  if (val){    
    for (const [key, value] of Object.entries()) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
    }
    alertPlaceholder.innerHTML = ""
    alert('<i class="bi-person-check-fill"></i> You have logged in successfully!', 'success')
    }
    return val;
}