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
 */

/**
 * Define Global Variables - NONE
 */
 
/**
 * Start Helper Functions - NONE
*/

/**
 * Begin Main Functions
 */
main(); //Code execution starts here.

/**
* To dynamically build the navigation buttons, get the number of existing ".landing__container" classes and then insert the required number of unordered list items 
* (each with an embedded button element for visual clarity) into the navigation menu as a horizontal unordered list of button elements.   
*/
function main(evt) {
    const navList = document.getElementById('navbar__list');
    navList.insertAdjacentHTML('afterbegin', '<p><bold><em>Click a "Section" button to scroll to a particular section:</em></bold></p>');
    
    for (let i = 1; i <= document.querySelectorAll(".landing__container").length; i++) {  //for "length" ref: https://stackoverflow.com/questions/20040825/check-how-many-li-there-are-in-a-ul-with-javascript/20040849   (section 7 answer) */
        const liNavButton = document.createElement('li');
        const navbutton = document.createElement("button");
        navbutton.innerHTML = 'Section ' + i;
        liNavButton.appendChild(navbutton);
        navList.appendChild(liNavButton);
    } 

    //For efficiency, add the event listener to the buttons parent element (and not to each button), and have one separate setBubbleBackground function (see further below).
    //Moreover, also for efficency, use the "true" parmeter to invoke the listener at the capturing phase, instead of waiting to go to the "at target" and "bubbling" phases.   
    navList.addEventListener('click', setBubbleBackground, true);  
}

/**
* This function - called from clicking one of the navigation buttons generated above - removes the floating bubbles background from all sections, and then resets
* the bubbles background for the clicked navigation button in question - so the user knows which section class is active. Scrolling to the selected section is then run.
*/
function setBubbleBackground(evt) {
    for (let i = 1; i <= document.querySelectorAll(".landing__container").length; i++) {
        document.querySelector('#section' + i).classList.remove("your-active-class");
        document.querySelector('#section' + i).style.opacity = 0.09;  //Fade out the text on non active sections. 
    }
        
    //evt.target.textContent.substring(8) - this returns the section number from the 'Event Delegation' parm, that was selected when clicking on one of the nav buttons.
    document.querySelector('#section' + evt.target.textContent.substring(8)).classList.add("your-active-class");  //ref: https://stackoverflow.com/questions/51642432/easy-way-to-set-active-class-with-javascript/51642512
    document.querySelector('#section' + evt.target.textContent.substring(8)).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); //ref: https://stackoverflow.com/questions/3163615/how-to-scroll-an-html-page-to-a-given-anchor
    document.querySelector('#section' + evt.target.textContent.substring(8)).style.opacity = 1; //Hightlight the text on the selected section to mark it as active.
}

/**
 * End Main Functions
 */





//Background reading on onclick v eventlistener - https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick.

//Note: 1st attempt used an onclick and <a herf> syntax passed to insertAdjacentHTML. To achieve the actual scrolling effect, the syntax "html {scroll-behavior: smooth;}"
//was added directly to the styles.css file. I decided to remove this code to use the more modern addEventListener syntax (n.b. but leaving this old code below as a
//comment for learning purposes). 

//for (let i = 1; i <= document.querySelectorAll(".landing__container").length; i++) {  
//     navList.insertAdjacentHTML('beforeend', '<li><button id="' + i + '" onclick="setBubbleBackground(this.id)"><a href="#section' + i + '"> Section ' + i + '&nbsp &nbsp' + '</a></button></li>');
//} 
