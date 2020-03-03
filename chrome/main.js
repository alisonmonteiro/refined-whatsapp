function isValidContext() {
  const pane = document.querySelector('#pane-side > div > div > div > div')
  const app = document.querySelector('.app')

  return (pane && app)
}

function watchPaneClick() {
  const friends = document.querySelectorAll('#pane-side > div > div > div > div')

  friends.forEach(friend => {
    friend.addEventListener('click', () => {
      hideImages()
    })
  })
}

function hideImages() {
  const images = document.querySelectorAll('.message-in img, .message-out img')

  images.forEach(img => {
    const button = document.createElement('button')
    const parent = img.parentElement

    if (isEmoji(img)) {
      return
    }

    parent.style.height = '60px'
    img.style.display = 'none'

    button.textContent = 'Open'
    button.classList.add('OpenButton')

    parent.prepend(button)
  })
}

function isEmoji(image) {
  const {src, parentElement} = image
  const isEmoji = parentElement.tagName.toLowerCase() === 'span'
  const isSticker = !src.includes('data:image') && !src.includes('blob')

  if (isEmoji || isSticker) {
    return true
  }

  return false
}

function observeApp() {
  const app = document.querySelector('#app')

  if (!app) {
    return
  }

  const observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  }

  const appObserver = new MutationObserver((_, observer) => {
    if (isValidContext()) {
      observer.disconnect()
      watchPaneClick()
      return
    }
  });

  // Start observing the target node for configured mutations
  appObserver.observe(app, observerConfig);
}

window.addEventListener('DOMContentLoaded', () => {
  observeApp()
})