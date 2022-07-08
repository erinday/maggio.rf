const view = document.querySelector('[data-element="easily-place"]')

if (view) setTimeout(initEasilyPlace)

function initEasilyPlace () {
  const buttons = view.querySelectorAll('[data-element="easily-place__item"]')

  for (let i = 0, len = buttons.length; i < len; i++) {
    buttons[i].addEventListener('click', switchSlide)
  }

  function switchSlide (event) {
    inactiveButton('easily-place__item_active')
    event.currentTarget.classList.add('easily-place__item_active')
  }

  function inactiveButton (activeClass) {
    for (let i = 0, len = buttons.length; i < len; i++) {
      const classes = buttons[i].classList
      if (classes.contains(activeClass)) return classes.remove(activeClass)
    }
  }
}
