const ioHandler = (entries, self) => {
  for (let entry of entries) {
    const target = entry.target;

    if (entry.intersectionRatio > 0.7) {
      target.classList.add('active', target.getAttribute("data-animation"))
    }
  }
}

const ioConfig = {
  threshold: 0.7
};

const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type)

  for (key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child))
    else el.appendChild(child)
  })

  return el
}

const createFrameSlides = chars => {
  const delayStart = 25;
  const fragment = new DocumentFragment();
  chars = chars.split('');
  let length = chars.length;
  chars.forEach((char, index) => {
    const el = elFactory(
      'span',
      { 
        'data-char': `${char === ' ' ? 'space' : char}`,
        class: `${char === ' ' ? 'space' : 'char'}`,
        style: `--char-index:${index+delayStart};--char-index-reverse:${length-index}`
      },
      `${char}`
    );
    fragment.appendChild(el);
  })
  
  return fragment;
}



document.addEventListener('DOMContentLoaded', () => {

  let splits = document.querySelectorAll('[data-split-word]');

  splits.forEach(split => {
    let splitTextContent = split.textContent;

    split.innerHTML = '';
    split.appendChild(createFrameSlides(splitTextContent))
  })

  const blocks = document.querySelectorAll("[data-animation]");

  const io = new IntersectionObserver(ioHandler, ioConfig);

  [].forEach.call(blocks, block => io.observe(block));

  const goto = document.querySelectorAll('.btn');
  goto.forEach(frame => {
    frame.addEventListener('click', () => {
      event.preventDefault();
      const sectionCurrent = frame.closest('.section');
      sectionCurrent.classList.add('reverse');
      const sectionTo = document.querySelector(frame.getAttribute('data-href'));
      setTimeout(() => {
        document.querySelectorAll('.section').forEach(article => {
          article.style.display = 'none';
          article.style.visibility = 'hidden';
        });
        sectionTo.style.display = 'grid';
        sectionTo.style.visibility = 'visible';
        sectionCurrent.classList.remove('active', 'reverse', sectionCurrent.getAttribute('data-animation'));
      }, 1800);
    });
  });

});