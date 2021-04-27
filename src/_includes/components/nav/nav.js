window.addEventListener('load', () => {
  const dropdownBtn = document.getElementById('dropdown-btn')
  const dropdown = document.getElementById('dropdown-menu')

  dropdownBtn.addEventListener('click', (event) => {
    const isOpen = isVisible(dropdown)

    if (isOpen) {
      closeDropDown(dropdown)
    } else {
      openDropDown(dropdown)
    }
  })
})

function openDropDown(element) {
  element.classList.add('visible')
  element.setAttribute('aria-expanded', 'true')

  setTimeout(() => {
    hideOnClickOutside(element)
  })
}

function closeDropDown(element) {
  element.classList.remove('visible')
  element.classList.add('false')
  element.setAttribute('aria-expanded', 'false')
}

function isVisible(element) {
  return element.classList.contains('visible')
}

function hideOnClickOutside(element) {
  const outsideClickListener = (event) => {
    const isClickInside = element.contains(event.target)
    if (!isClickInside) {
      closeDropDown(element)
      removeClickListener()
    }
  }

  const removeClickListener = () => {
    window.removeEventListener('click', outsideClickListener)
  }

  window.addEventListener('click', outsideClickListener)
}
