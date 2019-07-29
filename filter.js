// const btnScaleGray = document.querySelector('#theme-scaleGray');
// const btnSepia = document.querySelector('#theme-sepia');
// const btnInvertir = document.querySelector('#theme-invertir');
// const btnContrast = document.querySelector('#theme-contrast');
const htmlElem = document.querySelector('html');
const changeTheme = document.querySelector('#changeTheme');
const btnsChangeFontSize = [].slice.call(document.querySelectorAll('.changeSize'));

// btnScaleGray.addEventListener('click', () => {
//     htmlElem.style.setProperty('-webkit-filter', 'grayscale(1)')
//     htmlElem.style.setProperty('filter', 'grayscale(1)')
// })
// btnSepia.addEventListener('click', () => {
//     htmlElem.style.setProperty('filter', 'sepia(1)')
// })
// btnInvertir.addEventListener('click', () => {
//     htmlElem.style.setProperty('filter', 'invert(1)')
// })
// btnContrast.addEventListener('click', () => {
//     htmlElem.style.setProperty('filter', 'contrast(6)')
// })
function changeStyleFont(data) {
    let fontSize = ['14px', '20px', '28px']
    htmlElem.style.setProperty('--font_size', fontSize[data])
}

btnsChangeFontSize.map(elem => {
    elem.addEventListener('click', e => {
        dataFont = e.target.getAttribute('data');
        changeStyleFont(dataFont);
    })
})

changeTheme.addEventListener('change', (e) => {
    let valueTheme = e.target.value;
    htmlElem.setAttribute('hc', 'a'+valueTheme)
})