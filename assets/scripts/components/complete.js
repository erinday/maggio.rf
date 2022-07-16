const view = document.querySelector('[data-element="complete"]')

if (view) setTimeout(initComplete, 0)

function initComplete () {
  const buttonsVariants = view.querySelectorAll('[data-element="complete__variants-item"]')

  for (let i = 0, len = buttonsVariants.length; i < len; i++) {
    buttonsVariants[i].addEventListener('click', eventClickButtonsVariants)
  }

  function eventClickButtonsVariants (event) {
    const indexVariant = +event.currentTarget.dataset.variant
    activateVariant(indexVariant)
  }

  function activateVariant (index) {
    for (let i = 0, len = buttonsVariants.length; i < len; i++) {
      if (i === index) {
        buttonsVariants[i].classList.add('complete__variants-item_active')
      } else {
        buttonsVariants[i].classList.remove('complete__variants-item_active')
      }
    }
  }
}
