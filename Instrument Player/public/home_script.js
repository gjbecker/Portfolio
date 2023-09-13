// Searchbar
const search = document.getElementById('search')
const clear = document.getElementById('clear')
var cards = Array.from(document.querySelectorAll(`[class="col"]`))
const inputSearch = document.getElementById('search_bar')


// Collapse Item Cards
function collapse(card) {
    if (card.querySelector(`[class="card h-100"]`).id.slice(0,inputSearch.value.length) === inputSearch.value.toLowerCase()) {expand(card)}
    else {card.classList.add('collapse')}
}
// Expand Item Cards
function expand(card) {
    card.classList.remove('collapse')
}
// Search Button
search.addEventListener('click', event => {
    event.preventDefault()
    cards.forEach(collapse)
})     
// Clear Search Button
clear.addEventListener('click', event => {
    event.preventDefault()
    cards.forEach(expand)
    inputSearch.value = ""
})