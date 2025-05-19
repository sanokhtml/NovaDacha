const animItems = document.querySelectorAll('._anim-items');
const buttons = document.querySelectorAll('.buttons_s');
document.querySelectorAll('._anim-items._anim-instant').forEach(el => {
  el.classList.add('_active');
});

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            if (animItem.classList.contains('_anim-instant')) continue;
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart

            if (animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                if (
                  pageYOffset > 0 &&
                  pageYOffset > animItemOffset - animItemPoint &&
                  pageYOffset < animItemOffset + animItemHeight
                ) {
                  animItem.classList.add('_active');
                }

            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll()
}
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('buttons_s') && target.classList.contains('_active')) {
              setTimeout(() => {
                  target.classList.remove('buttons_s');
              }, 1300);
          }
      }
  }
});

buttons.forEach(button => {
  observer.observe(button, { attributes: true });
});


document.querySelectorAll("a.yakir").forEach(link =>{
    link.addEventListener('click', function (e){
        e.preventDefault()

        const href = this.getAttribute('href').substring(1)

        const scrollTarget = document.getElementById(href)
        const topOffset = 101

        const elementPosition = scrollTarget.getBoundingClientRect().top
        const offsetPosition = elementPosition - topOffset

        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth"
        })
    })
})


let hasCounted = false;

function animateCounters() {
  const counterSection = document.querySelector('.frame-wrapper');
  const sectionTop = counterSection.getBoundingClientRect().top + window.scrollY;
  const scrollTop = window.scrollY;

  if (!hasCounted && scrollTop + window.innerHeight > sectionTop + 100) {
    const numbers = document.querySelectorAll('.text-wrapper-7');
    numbers.forEach(el => {
      el.classList.add('viz');
      let i = 1;
      const num = parseInt(el.getAttribute('data-num'), 10);
      const step = (2000 / num);

      const interval = setInterval(() => {
        if (i <= num) {
          el.textContent = i;
          i++;
        } else {
          clearInterval(interval);
        }
      }, step);
    });

    hasCounted = true;
  }
}

window.addEventListener('scroll', animateCounters);

const modal = document.getElementById('telegramModal');
const openButtons = document.querySelectorAll('.buttons-2');
const closeButton = modal.querySelector('.close');
const body = document.body;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function openModal() {
  const scrollBarWidth = getScrollbarWidth();
  document.body.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
  modal.classList.add('active');
  body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('active');
  body.classList.remove('modal-open');
  document.body.style.removeProperty('--scrollbar-width');
}

openButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
function setImageContHeightVariable() {
  const imageCont = document.querySelector('.image-cont');
  if (imageCont) {
    const height = imageCont.offsetHeight;
    document.documentElement.style.setProperty('--image-cont-height', `${height}px`);
  }
}

window.addEventListener('DOMContentLoaded', setImageContHeightVariable);
window.addEventListener('resize', setImageContHeightVariable);

function setImageContBottomVariable() {
  const imageCont = document.querySelector('.image-cont');
  if (imageCont) {
    const rect = imageCont.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const bottom = rect.bottom + scrollTop;
    document.documentElement.style.setProperty('--image-cont-bottom', `${bottom}px`);
  }
}

window.addEventListener('DOMContentLoaded', setImageContBottomVariable);
window.addEventListener('resize', setImageContBottomVariable);
