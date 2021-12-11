const track = document.querySelector('.carouselTrack');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carouselButtonRight');
const prevButton = document.querySelector('.carouselButtonLeft');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth)

//arrange the slides next to each other
//slides[0].style.left = slideWidth * 0 + 'px';
//slides[1].style.left = slideWidth * 1 + 'px';
//slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX( -' + targetSlide.style.left +')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide')
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {

    if (targetIndex === 0) {
      prevButton.classList.add('isHidden');
      nextButton.classList.remove('isHidden')
    } else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove('isHidden');
      nextButton.classList.add('isHidden');
    } else {
      prevButton.classList.remove('isHidden');
      nextButton.classList.remove('isHidden');
    }
}
//when i click left, move to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});
//when i click right , move to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});
//when i click the nav button move to that slide

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.currentSlide');
  const currentDot = dotsNav.querySelector('.currentSlide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})
