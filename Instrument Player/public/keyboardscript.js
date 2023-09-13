//Store key mappings
let WHITE_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l']
let BLACK_KEYS = ['w', 'e', 'u', 'i', 'o']

//Keyboard controller
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
const wKeyboardKeys = document.querySelectorAll('.key-code.white')
const bKeyboardKeys = document.querySelectorAll('.key-code.black')


keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

function playNote(key){
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}

document.addEventListener('keydown', e => {
    if (e.repeat) return
    const key = e.key
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

wKeyboardKeys.forEach((key,index) => {
    key.innerHTML = WHITE_KEYS[index];
})

bKeyboardKeys.forEach((key,index) => {
    key.innerHTML = BLACK_KEYS[index];
})

//Map keys
const map = document.getElementById('map')


function openForm() {
    document.getElementById('popup').style.display = "block"
}

function closeForm() {
    document.getElementById('popup').style.display = "none"
}

map.addEventListener('submit', event => {
    event.preventDefault()
    whiteInput = document.getElementById('white').value
    blackInput = document.getElementById('black').value

    if (validate(whiteInput, blackInput)){
        WHITE_KEYS = whiteInput.split(",")
        BLACK_KEYS = blackInput.split(",") 
    }
    else{
        console.log("invalid")
        return
    }

    wKeyboardKeys.forEach((key,index) => {
        key.innerHTML = WHITE_KEYS[index];
    })
    bKeyboardKeys.forEach((key,index) => {
        key.innerHTML = BLACK_KEYS[index];
    })


    console.log(WHITE_KEYS)
    console.log(BLACK_KEYS)
    closeForm()
})



//Map keys validation
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const whiteForm = document.getElementById('white')
const blackForm = document.getElementById('black')
const re = new RegExp("^(?!.*?([A-Za-z]).*?\1)[A-Za-z](?:,[A-Za-z])*$")
let tempArray1 = []
let tempArray2 = []

function validate(string1, string2) {
    bool = false
    if (re.test(string1)){
        bool = true
    }
    else{
        alert('Needs commas', 'danger')
        return false
    }
    if (bool = re.test(string2)){
        bool = true
    }
    else{
        alert('Needs commas', 'danger')
        return false
    }
    tempArray1 = string1.split(",")
    tempArray2 = string2.split(",")
    if (containsDuplicates(tempArray1)){
        alert('White input has duplicates', 'danger')
        return false
    }
    if (containsDuplicates(tempArray2)){
        alert('Black input has duplicates', 'danger')
        return false
    }
    if (tempArray1.some(item => tempArray2.includes(item))){
        alert('Cannot have same input for black and white', 'danger')
        bool = false
    }
    return bool
}

function containsDuplicates(array) {
    const result = array.some(element => {
      if (array.indexOf(element) !== array.lastIndexOf(element)) {
        return true;
      }
  
      return false;
    });
  
    return result;
  }


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