/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

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

// to check if section is near to viewport
const changeToActive = (items) => {
  for (const item of items) {
    const box = item.getBoundingClientRect();
    // played with the values of top and bottom and experienced the best result with the value of 250 
    if (box.top <= 250 && box.bottom >= 250) {
      // Apply active state on the current item and the corresponding Nav link.
      addStyles(item);
    } else {
      // Remove active state from other item and corresponding Nav link.
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
const scrollToSection = (event) => {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scrollTo({
    top: offsetTop,
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

