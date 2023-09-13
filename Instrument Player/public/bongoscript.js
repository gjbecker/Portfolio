//Store key mappings
let DRUM_KEYS = ['q','e']

//Bongos controller
const drums = document.querySelectorAll('.drum')
const drumsKeyboard = document.querySelectorAll('.key-code')

drums.forEach(drum => {
    drum.addEventListener('click', () => playNote(drum))
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
    const drumIndex = DRUM_KEYS.indexOf(key)

    if (drumIndex > -1) playNote(drums[drumIndex])
})

drumsKeyboard.forEach((key,index) => {
    key.innerHTML = DRUM_KEYS[index];
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
    drumInput = document.getElementById('drumkey').value

    if (validate(drumInput)){
        DRUM_KEYS = drumInput.split(",")
    }
    else{
        console.log("invalid")
        return
    }

    drumsKeyboard.forEach((key,index) => {
        key.innerHTML = DRUM_KEYS[index];
    })

    closeForm()
})



//Map keys validation
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const drumForm = document.getElementById('drumkey')
const re = new RegExp("^(?!.*?([A-Za-z]).*?\1)[A-Za-z](?:,[A-Za-z])*$")
let tempArray1 = []

function validate(string1) {
    bool = false
    if (re.test(string1)){
        bool = true
    }
    else{
        alert('Needs commas', 'danger')
        return false
    }
    tempArray1 = string1.split(",")
    if (containsDuplicates(tempArray1)){
        alert('Contains duplicates', 'danger')
        return false
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
