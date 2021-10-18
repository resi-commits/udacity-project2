/**
 * Define Global Variables
 * 
*/
// first step: put all 4 sections into a static NodeList, one section === one element 
const sections = document.querySelectorAll('section');
// loop over this NodeList like normal Array -> e.g. foreach()-loop
// to create an unordered list of elements
// use the #navbar__list id as it is already available in the HTML
const navList = document.querySelector('#navbar__list');
// add button
const scrollToTopButton = document.querySelector('#scrollToTop')
// using a document fragment improves the performance as reflow and repaint is only started once
const navListFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// to apply or remove some specific styling use the following helper functions add and remove
// add function
const addStyles = (item) => {
  item.classList.add('activeSection');
  const navClass = document.querySelector(`.${item.id}`);
  navClass.classList.add('activeNavBar')
}

// remove function
const removeStyles = (item) => {
  item.classList.remove('activeSection');
  const navClass = document.querySelector(`.${item.id}`);
  navClass.classList.remove('activeNavBar')
}

// check for current viewport to adapt styling
// this section was reused from this knowledge post: https://knowledge.udacity.com/questions/85408
// adjusted the values of of the box 
const changeToActive = (items) => {
  for (const item of items) {
    const box = item.getBoundingClientRect();
    // played with the values of top and bottom and experienced the best result with the value of 250 
    if (box.top <= 250 && box.bottom >= 250) {
      // addStyles method to apply specific styling for active section & navbar
      addStyles(item);
    } else {
      // removeStyles method to remove specific styling for active section & navbar
      removeStyles(item);
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBar = (items) => {
  items.forEach(function(item) {
    // create single list element
    const navListItem = document.createElement('li');
    // set name of item and using href to link the correct item 
    navListItem.innerHTML= `<a class='menu__link ${item.id}' href=#${item.id}>${item.dataset.nav}</a>`
    // add elements to the fragment
    navListFragment.appendChild(navListItem);
    console.log(`successful for ${navListItem}`)
  });
  // add the list to the navbar
  navList.appendChild(navListFragment);
  // navigation bar was successfully added
}

// Scroll to anchor ID using scrollTO event
// this part was reused (Link: https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165) and changed to my needs
const scrollToSection = (event) => {
  // see documentation: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  // without preventDefault() the click handling will not be executed
  event.preventDefault();
  // get href and set offsetTop
  const sectionHref = event.target.getAttribute("href");
  const sectionOffset = document.querySelector(sectionHref).offsetTop;
  scrollTo({
    top: sectionOffset,
    behavior: "smooth"
  });
}

// Scroll to top if user clicks on button "Scroll to top"
const scrollToTop = () => {
  scrollTo({
    top: top,
    behavior: "smooth"
  });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBar(sections);

// Scroll to section on link click
// add eventListener when clicking on the Navigation bar -> scroll to linked section
navList.addEventListener('click', function(event) {
  scrollToSection(event);
});

// Set sections as active
// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", function() {
  changeToActive(sections);
});

// Scroll to top on button click
scrollToTopButton.addEventListener('click', function() {
  scrollToTop();
});
