/* =========================================
   FERMANAGH SUPERCAR EXPERIENCE - JAVASCRIPT
   Interactive features and functionality
   ========================================= */

/* WHAT IS JAVASCRIPT?
   JavaScript is a programming language that makes websites interactive.
   While HTML creates the content and CSS styles it, JavaScript adds behavior:
   - Click handlers (what happens when you click something)
   - Animations and effects
   - Form validation (checking if data is correct)
   - Dynamic content updates (changing page without refreshing)
   
   HOW DOES THIS FILE WORK?
   This file waits for the page to fully load, then adds interactive features
   using "event listeners" - basically instructions to do something when
   the user performs an action (like clicking or scrolling).
*/

/* ===== DOMCONTENTLOADED EVENT =====
   'DOMContentLoaded' means "the HTML structure is fully loaded"
   We wrap all our code in this to ensure HTML elements exist before we try to use them
   
   Think of it like: "Wait until the house is built, THEN decorate it"
   If we tried to decorate before the house was built, we'd get an error */

document.addEventListener('DOMContentLoaded', function() {
    /* 
       BREAKDOWN:
       - document = the entire web page
       - addEventListener = "listen for an event"
       - 'DOMContentLoaded' = the event to listen for (page fully loaded)
       - function() { } = the code to run when that event happens
    */
    
    /* ===== SMOOTH SCROLLING FOR ANCHOR LINKS ===== 
       When you click a link that goes to a section on the same page,
       it smoothly scrolls to that section instead of jumping instantly
       
       WHAT ARE ANCHOR LINKS?
       These are links with # in the href, like:
       <a href="#cars">Go to Cars Section</a>
       They point to an element with id="cars" on the same page
       
       DEFAULT BEHAVIOR (without our code):
       Page instantly jumps to the element - no animation
       
       OUR CODE DOES:
       Smoothly animates the scroll over 300-500ms for visual appeal
    */
    
    const links = document.querySelectorAll('a[href^="#"]');
    /* 
       WHAT THIS DOES:
       - document.querySelectorAll() = "find ALL elements matching this pattern"
       - 'a[href^="#"]' = "links (a) where href STARTS WITH (#)"
       - const links = "save these elements in a variable called 'links'"
       
       EXAMPLE:
       If page has: <a href="#cars">Cars</a>, <a href="#info">Info</a>
       It will find both of them and save as an array
       
       WHY "const"?
       const = constant (can't be changed after creation)
       Use const for things that won't change, let for things that will
    */
    
    links.forEach(link => {
        /* 
           forEach = "for each item in the list, do something"
           
           EXPLANATION:
           If links = [link1, link2, link3]
           forEach will run the code 3 times: once per link
           
           'link' = current item being processed
           => = arrow function syntax (shorthand for: function(link) { })
        */
        
        link.addEventListener('click', function(e) {
            /* 
               When this specific link is clicked:
               
               addEventListener('click', ...) = "watch for click event on this link"
               function(e) = when clicked, run this function
               'e' = the event object (contains info about the click)
            */
            
            e.preventDefault();
            /* 
               preventDefault = "don't do the default action"
               
               DEFAULT ACTION: click a link, page jumps instantly
               WITH preventDefault: we control what happens instead
               
               WHY WE USE IT:
               Without this, the page jumps AND our smooth scroll runs
               We only want the smooth scroll
            */
            
            const targetId = this.getAttribute('href');
            /* 
               getAttribute = "get an attribute from this element"
               'href' = the attribute to get
               'this' = the current link being clicked
               
               EXAMPLE:
               If you click <a href="#cars">Cars</a>
               targetId will be "#cars"
               
               'const targetId' = save the result in a variable
            */
            
            const targetElement = document.querySelector(targetId);
            /* 
               querySelector = "find ONE element matching this"
               (querySelectorAll finds ALL, querySelector finds first one)
               
               EXAMPLE:
               If targetId = "#cars"
               This finds: <section class="cars" id="cars">...</section>
               
               WHY?
               Because #cars means "element with id='cars'"
            */
            
            if (targetElement) {
                /* 
                   if (targetElement) checks: "does this element exist?"
                   
                   WHY CHECK?
                   If link href="#nonexistent" but no element has id="nonexistent"
                   Then querySelector returns null (nothing found)
                   Our code would error if we don't check first
                   
                   GOOD PRACTICE:
                   Always check if something exists before using it
                */
                
                targetElement.scrollIntoView({
                    /* 
                       scrollIntoView = "scroll the page until this element is visible"
                       
                       The { } with options inside = configuration object
                       We're telling it HOW to scroll
                    */
                    
                    behavior: 'smooth',
                    /* 
                       behavior: 'smooth' = animate the scroll smoothly
                       alternative: 'auto' = instant jump (default)
                       
                       This is what creates the nice visual effect!
                    */
                    
                    block: 'start'
                    /* 
                       block: 'start' = align element to the top of the screen
                       
                       OTHER OPTIONS:
                       'start' = align to top
                       'center' = align to middle
                       'end' = align to bottom
                       'nearest' = align whichever is closest
                    */
                });
            }
        });
    });

    /* ===== NAVBAR ACTIVE LINK HIGHLIGHTING =====
       When you're on a page section, highlight the corresponding nav link
       
       VISUAL EFFECT:
       - User scrolls to "Cars" section
       - "Cars" link in navbar gets highlighted automatically
       - User scrolls to "Contact" section
       - "Contact" link gets highlighted instead
       
       HOW IT WORKS:
       1. Check which section is currently visible
       2. Find the nav link that points to that section
       3. Add an 'active' class to highlight it
       4. Remove 'active' from all other links
       
       WHY USEFUL?
       Helps user know where they are on the page
    */
    
    const navLinks = document.querySelectorAll('.nav-links a');
    /* 
       Get all navigation links
       '.nav-links a' = "find all <a> elements inside something with class 'nav-links'"
       
       Example: if HTML has:
       <ul class="nav-links">
           <li><a href="#hero">Home</a></li>
           <li><a href="#cars">Cars</a></li>
       </ul>
       Then navLinks will contain both <a> elements
    */
    
    window.addEventListener('scroll', function() {
        /* 
           window.addEventListener('scroll', ...) = "when user scrolls the page"
           This function runs continuously as user scrolls
           
           WHY 'window'?
           window = the entire browser/page
           Scrolling is a property of the whole page, not just one element
        */
        
        let current = '';
        /* 
           'let current' = create a variable that can change
           We'll store the name of the current section here
           
           DIFFERENCE: let vs const
           const = can't change after creation
           let = can change as needed
           
           START VALUE: '' (empty string)
           We'll fill it with actual section class as we loop through
        */
        
        const sections = document.querySelectorAll('section');
        /* 
           Get all <section> elements on the page
           Each section represents a different part: Hero, Info, Cars, etc.
           
           WHY SECTIONS?
           In your HTML, each major content area is a <section>
           We're checking which <section> is currently visible
        */
        
        sections.forEach(section => {
            /* For each section, check if it's currently visible */
            
            const sectionTop = section.offsetTop;
            /* 
               offsetTop = "distance from top of page to this element"
               
               EXAMPLE:
               If page is 3000px tall:
               - Hero section starts at 0px
               - Cars section starts at 1500px
               - Contact section starts at 2500px
               
               sectionTop tells us where each section begins
            */
            
            if (pageYOffset >= sectionTop - 200) {
                /* 
                   pageYOffset = "how far down the page has the user scrolled?"
                   
                   EXPLANATION:
                   - pageYOffset = 0 = user is at top of page
                   - pageYOffset = 500 = user has scrolled down 500px
                   - pageYOffset = 2000 = user has scrolled down 2000px
                   
                   THE CONDITION: pageYOffset >= sectionTop - 200
                   
                   This checks: "has user scrolled to within 200px of section start?"
                   
                   WHY '-200'?
                   Without the -200, you'd need to scroll all the way to the section
                   The -200 makes it highlight BEFORE you reach the section
                   Creates a more responsive feeling
                   
                   EXAMPLE:
                   Cars section starts at 1500px
                   So we highlight when user reaches: 1500 - 200 = 1300px
                   User sees highlighting before they see the section
                */
                
                current = section.getAttribute('class');
                /* 
                   Get the class name of this section
                   
                   EXAMPLE:
                   <section class="cars">
                   getAttribute('class') returns: "cars"
                   
                   We save this in the 'current' variable
                   Now we know which section the user is viewing
                */
            }
        });
        
        navLinks.forEach(link => {
            /* For each navigation link... */
            
            link.classList.remove('active');
            /* 
               classList = list of CSS classes on an element
               remove('active') = remove the 'active' class from this link
               
               WHY?
               We want only ONE link highlighted at a time
               So we first remove 'active' from ALL links
               Then we add it back to the correct one
               
               EXAMPLE FLOW:
               Before: <a href="#cars" class="active">Cars</a>
               After remove: <a href="#cars" class="">Cars</a>
               (the class attribute is now empty)
            */
            
            if (link.getAttribute('href').includes(current)) {
                /* 
                   Check: "does this link's href contain the current section name?"
                   
                   EXAMPLE:
                   current = "cars"
                   link href = "#cars"
                   Does "#cars" include "cars"? YES
                   
                   includes() = "check if text contains this substring"
                   
                   Another example:
                   current = "info"
                   link href = "#cars"
                   Does "#cars" include "info"? NO
                   
                   So this link won't get highlighted
                */
                
                link.classList.add('active');
                /* 
                   Add the 'active' class to highlight this link
                   
                   In your CSS, you'd style it like:
                   a.active { color: gold; }
                   
                   So when 'active' class is added, it turns gold
                */
            }
        });
    });

    /* ===== BUTTON CLICK HANDLERS =====
       Make buttons do something when clicked
       
       WHAT ARE EVENT HANDLERS?
       Functions that run in response to user actions
       
       COMMON EVENTS:
       - 'click' = user clicks an element
       - 'hover' = mouse moves over element
       - 'submit' = user submits a form
       - 'scroll' = page scrolls
       - 'resize' = window resizes
       
       HOW THEY WORK:
       1. Select an element
       2. Add an event listener
       3. Provide a function to run when event happens
    */
    
    /* ===== GET CAR BUTTON ===== */
    
    const getCarButton = document.querySelector('.vehicle-info button');
    /* 
       querySelector = find ONE element
       '.vehicle-info button' = "find a button inside an element with class 'vehicle-info'"
       
       EXAMPLE HTML:
       <div class="vehicle-info">
           <button>Get one Now!</button>   ← This button gets selected
       </div>
    */
    
    if (getCarButton) {
        /* 
           Safety check: "does this button exist?"
           
           WHY CHECK?
           If the HTML doesn't have this button, querySelector returns null
           If we try to use null, the code crashes
           This check prevents crashes
           
           GOOD PRACTICE:
           Always check if something exists before using it
           Especially when using querySelector (which returns null if not found)
        */
        
        getCarButton.addEventListener('click', function() {
            /* When the button is clicked, run this function */
            
            alert('Thank you for your interest! Please contact us for available vehicles.');
            /* 
               alert() = show a popup message to the user
               
               WHAT IS alert?
               Simple popup window that stops the page until user clicks OK
               
               WHEN TO USE:
               Important messages, warnings, confirmations
               
               BETTER ALTERNATIVES:
               - Modals (fancy popups)
               - Toast notifications (small messages)
               - Update page content directly
               
               We use alert here because it's simple and works everywhere
            */
        });
    }
    
    /* ===== CONTACT BUTTON ===== */
    
    const contactButton = document.querySelector('.contact-button');
    /* 
       Find button with class 'contact-button'
       
       EXAMPLE HTML:
       <button class="contact-button">Contact Us</button>   ← This one
    */
    
    if (contactButton) {
        /* Check if button exists */
        
        contactButton.addEventListener('click', function() {
            /* When clicked... */
            
            alert('We will contact you soon! Check your email for our response.');
            /* Show a confirmation message */
        });
    }

    /* ===== NAVIGATION LINK CLICK EFFECTS =====
       Add a subtle effect when you click a nav link
       
       WHAT'S THE EFFECT?
       Link becomes slightly transparent (fade out a bit)
       Then fades back to full opacity
       
       This gives visual feedback that the user clicked something
       Creates a professional, polished feel
    */
    
    navLinks.forEach(link => {
        /* For each navigation link... */
        
        link.addEventListener('click', function() {
            /* When the link is clicked... */
            
            this.style.opacity = '0.7';
            /* 
               this = the current link being clicked
               .style = access CSS styling of this element
               opacity = transparency level (0 = invisible, 1 = fully visible)
               
               So opacity = '0.7' means 70% visible (slightly transparent)
               
               VISUAL EFFECT:
               Link becomes dimmer for a moment
            */
            
            setTimeout(() => {
                /* 
                   setTimeout = "run this code after a delay"
                   The delay is specified in milliseconds (1000ms = 1 second)
                   200 = 200 milliseconds = 0.2 seconds
                   
                   WHY USE setTimeout?
                   To show the click effect (dimness) for a moment
                   Before returning to normal
                   
                   WITHOUT setTimeout:
                   opacity would change to 0.7 and back instantly (no effect)
                   
                   WITH setTimeout:
                   1. Click happens → opacity becomes 0.7 (fades out)
                   2. Wait 200ms
                   3. Opacity becomes 1 (fades back in)
                   User sees the fade effect!
                */
                
                this.style.opacity = '1';
                /* 
                   Return to full opacity
                   opacity = 1 means fully visible
                */
            }, 200);
            /* 200 milliseconds = 0.2 seconds */
        });
    });

    /* ===== FORM VALIDATION =====
       Check form inputs when user submits the form
       
       WHAT IS FORM VALIDATION?
       Making sure user filled in all required fields correctly
       
       EXAMPLES:
       - Email field must have @ symbol
       - Password must be at least 8 characters
       - Name field can't be empty
       
       WHEN DOES THIS RUN?
       When user clicks submit button on a form
    */
    
    const form = document.querySelector('form');
    /* 
       Try to find a <form> element on the page
       querySelector returns null if form doesn't exist
    */
    
    if (form) {
        /* If a form exists on this page... */
        
        form.addEventListener('submit', function(e) {
            /* 
               'submit' event = when user clicks submit button
               'e' = the submit event (contains info about submission)
            */
            
            const inputs = this.querySelectorAll('input, textarea');
            /* 
               Find all text inputs and textareas in this form
               'input, textarea' = "find inputs OR textareas"
               
               EXAMPLE:
               <form>
                   <input type="text" placeholder="Name">
                   <textarea>Message</textarea>
                   <button type="submit">Send</button>
               </form>
               
               inputs would find: the input and textarea
            */
            
            let isValid = true;
            /* 
               Assume form is valid to start
               If we find any empty fields, we'll change this to false
               
               'let' because this value will change as we check fields
            */
            
            inputs.forEach(input => {
                /* For each form input... */
                
                if (input.value.trim() === '') {
                    /* 
                       input.value = what the user typed
                       .trim() = remove spaces from start and end
                       === '' = equals empty string
                       
                       EXAMPLE:
                       If user typed: "  John  "
                       input.value = "  John  "
                       input.value.trim() = "John"
                       "John" === '' ? FALSE (it's not empty)
                       
                       If user typed: "    " (just spaces)
                       input.value = "    "
                       input.value.trim() = ""
                       "" === '' ? TRUE (it's empty after removing spaces)
                       
                       So we catch both empty fields AND fields with just spaces
                    */
                    
                    input.style.borderColor = 'red';
                    /* 
                       Show error: turn the field's border red
                       User can see which field is empty
                    */
                    
                    isValid = false;
                    /* 
                       Mark entire form as invalid
                       If ANY field is empty, the form is bad
                    */
                } else {
                    input.style.borderColor = 'green';
                    /* 
                       If field is filled: show success with green border
                       Positive feedback to user
                    */
                }
            });
            
            if (!isValid) {
                /* 
                   If isValid is false (meaning validation failed):
                   ! means "NOT" so !isValid means "not valid"
                */
                
                e.preventDefault();
                /* 
                   preventDefault = "don't submit the form"
                   Prevents data from being sent with empty fields
                */
                
                alert('Please fill in all fields');
                /* Tell user what went wrong */
            }
        });
    }

    /* ===== HOVER EFFECTS ON CAR CARDS =====
       Add visual feedback when you hover over car items
       
       WHAT IS HOVER?
       When the mouse is over an element (without clicking)
       
       VISUAL EFFECTS WE'RE ADDING:
       - Mouse over card: it grows slightly
       - Mouse leaves card: it returns to normal size
       
       WHY USEFUL?
       Shows user that something is interactive/clickable
       Makes the interface feel responsive
    */
    
    const carItems = document.querySelectorAll('.vehicle-info ul li');
    /* 
       Find all car list items
       '.vehicle-info ul li' = "find all <li> inside <ul> inside .vehicle-info"
       
       EXAMPLE HTML:
       <div class="vehicle-info">
           <ul>
               <li>Ferrari 488 GTB</li>     ← These get selected
               <li>Lamborghini Huracan</li> ← These get selected
               <li>Porsche 911 Turbo S</li> ← These get selected
           </ul>
       </div>
    */
    
    carItems.forEach(item => {
        /* For each car item... */
        
        item.addEventListener('mouseenter', function() {
            /* 
               'mouseenter' = when mouse first moves onto the element
               (different from 'mouseover' - doesn't bubble up to parent elements)
            */
            
            this.style.transform = 'scale(1.02)';
            /* 
               transform = modify the element's appearance
               scale(1.02) = make it 102% of original size (2% bigger)
               
               MATH:
               1.0 = original size (100%)
               1.1 = 110% size (10% bigger)
               1.02 = 102% size (2% bigger)
               0.9 = 90% size (10% smaller)
               
               VISUAL EFFECT:
               Card slightly grows when mouse hovers over it
               Creates a "lift" or "focus" effect
            */
        });
        
        item.addEventListener('mouseleave', function() {
            /* 
               'mouseleave' = when mouse moves away from element
               Opposite of mouseenter
            */
            
            this.style.transform = 'scale(1)';
            /* 
               Return to normal size
               scale(1) = 100% of original size (normal)
            */
        });
    });

    /* ===== SCROLL-TO-TOP BUTTON =====
       Create a button that appears when you scroll down,
       clicking it takes you back to the top
       
       HOW IT WORKS:
       1. Create a button element (not in HTML, dynamically added by JavaScript)
       2. Hide it by default
       3. Show it when user scrolls down past 300px
       4. Clicking it smoothly scrolls back to top
       
       WHY DYNAMICALLY CREATE IT?
       We could add it to HTML, but creating it with JavaScript:
       - Shows you how to create elements with code
       - Keeps HTML cleaner
       - Can be reused in other projects easily
    */
    
    const scrollToTopButton = document.createElement('button');
    /* 
       createElement = create a new HTML element programmatically
       'button' = the type of element to create
       
       This creates: <button></button>
       But it's not on the page yet - it's just in memory
       
       ANALOGY:
       Like ordering parts to build something, but haven't assembled yet
    */
    
    scrollToTopButton.textContent = '↑ Top';
    /* 
       textContent = the text inside the element
       '↑ Top' = up arrow symbol followed by "Top"
       
       Now the button is: <button>↑ Top</button>
    */
    
    scrollToTopButton.id = 'scroll-to-top';
    /* 
       id = unique identifier for this element
       Like giving an element a name so we can find it later
       
       Now the button is: <button id="scroll-to-top">↑ Top</button>
    */
    
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
        color: #1a1a1a;
        border: none;
        padding: 12px 16px;
        border-radius: 50%;
        cursor: pointer;
        font-weight: 700;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        transition: all 0.3s ease;
    `;
    /* 
       cssText explanation:
       - position: fixed = stay in same spot even when page scrolls (floating button)
       - bottom: 30px = 30 pixels from the bottom of screen
       - right: 30px = 30 pixels from the right edge (positions in bottom-right)
       - background: linear-gradient = gold gradient background (same as buttons in CSS)
       - color: #1a1a1a = black text color
       - border: none = remove default button border
       - padding: 12px 16px = inner spacing
       - border-radius: 50% = make it circular
       - cursor: pointer = show hand cursor (indicates clickable)
       - font-weight: 700 = bold text
       - display: none = hidden by default (we'll show it when user scrolls)
       - z-index: 999 = on top of everything else on page
       - box-shadow = drop shadow with gold color
       - transition: all 0.3s ease = smooth animation for any property changes
    */
    
    document.body.appendChild(scrollToTopButton);
    /* 
       appendChild = add this element to the page
       document.body = the <body> element
       
       So we're saying: "Add this button to the end of the page body"
       
       Now the button is actually visible on the page!
    */
    
    window.addEventListener('scroll', function() {
        /* When the user scrolls... */
        
        if (window.pageYOffset > 300) {
            /* 
               pageYOffset = how far down page user has scrolled
               If greater than 300 pixels...
            */
            
            scrollToTopButton.style.display = 'block';
            /* Show the button */
        } else {
            scrollToTopButton.style.display = 'none';
            /* Hide the button if user is near the top */
        }
    });
    
    scrollToTopButton.addEventListener('click', function() {
        /* When user clicks the scroll-to-top button... */
        
        window.scrollTo({
            top: 0,
            /* 
               Scroll to position 0 (the top)
               
               OTHER OPTIONS:
               top: 500 = scroll to 500px from top
               top: 9999 = scroll to very far down
               left: 0 = horizontal scroll (for wide pages)
            */
            
            behavior: 'smooth'
            /* Smooth animation instead of instant jump */
        });
    });
    
    /* Add hover effect to scroll button */
    scrollToTopButton.addEventListener('mouseenter', function() {
        /* When mouse hovers over the button... */
        this.style.transform = 'scale(1.1)';
        /* Make it 10% bigger */
    });
    
    scrollToTopButton.addEventListener('mouseleave', function() {
        /* When mouse leaves... */
        this.style.transform = 'scale(1)';
        /* Return to normal size */
    });

    /* ===== LAZY LOADING IMAGES =====
       Images only load when they're about to be visible
       
       WHAT IS LAZY LOADING?
       Don't load images until user might see them
       
       WHY USEFUL?
       - Faster page load time (fewer images to download initially)
       - Saves bandwidth (user might not scroll to all images)
       - Better performance on slow connections
       
       HOW IT WORKS:
       1. Set image src to empty or placeholder
       2. Put real image URL in data-src attribute
       3. Use JavaScript to detect when image comes into view
       4. When visible, move URL from data-src to src (loads image)
       
       EXAMPLE HTML:
       <img data-src="car1.jpg" alt="Car">
       JavaScript will change it to:
       <img src="car1.jpg" alt="Car">
    */
    
    const images = document.querySelectorAll('img[data-src]');
    /* 
       Find all images that have a data-src attribute
       'img[data-src]' = "img elements with data-src attribute"
       
       Note: In your current HTML, you might not have data-src yet
       You'd need to add it like: <img data-src="path/to/image.jpg" src="">
    */
    
    if ('IntersectionObserver' in window) {
        /* 
           Check if browser supports IntersectionObserver
           (most modern browsers do, but older ones don't)
           
           'IntersectionObserver' in window = "is IntersectionObserver available?"
           
           WHY CHECK?
           For browsers that don't support it, this code would crash
           This check prevents errors on old browsers
        */
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            /* 
               IntersectionObserver = automatically watches elements
               Tells us when elements come into/out of view
               
               (entries, observer) = two parameters:
               - entries = list of elements that changed visibility
               - observer = the observer object (for controlling it)
               
               => = arrow function syntax (shorthand)
            */
            
            entries.forEach(entry => {
                /* For each element that changed visibility... */
                
                if (entry.isIntersecting) {
                    /* 
                       entry.isIntersecting = is this element visible in viewport?
                       true = yes, visible
                       false = no, not visible
                    */
                    
                    const img = entry.target;
                    /* entry.target = the actual element being observed */
                    
                    img.src = img.dataset.src;
                    /* 
                       Load the image by copying data-src to src
                       
                       dataset.src = access the data-src attribute
                       When you set data-src in HTML, JavaScript accesses it as dataset.src
                       
                       EXAMPLE:
                       HTML: <img data-src="car.jpg">
                       JavaScript: img.dataset.src gets "car.jpg"
                       Then: img.src = "car.jpg" loads the image
                    */
                    
                    img.classList.add('loaded');
                    /* 
                       Add 'loaded' class to indicate image is loading
                       You could style this in CSS for fade-in effects:
                       img.loaded { opacity: 1; transition: opacity 0.3s; }
                    */
                    
                    observer.unobserve(img);
                    /* 
                       Stop watching this image
                       Since it's loaded, no need to watch it anymore
                       Saves performance
                    */
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        /* 
           Start watching all images
           observe(img) = "start watching this image for visibility changes"
        */
    }

    /* ===== NAVIGATION BURGER MENU (Mobile) =====
       If you have a hamburger menu button, this makes it work
       
       WHAT IS A HAMBURGER MENU?
       Three horizontal lines (≡) that open/close mobile navigation
       Very common on mobile websites
       
       HOW IT WORKS:
       1. User clicks hamburger button
       2. Mobile menu appears/disappears (toggle)
       3. User clicks a link in menu
       4. Menu closes automatically
       
       HOW TO USE THIS CODE:
       You need HTML like:
       <button class="hamburger"></button>
       <nav>links here</nav>
       
       Then CSS to hide nav on small screens and show it with .active class
    */
    
    const hamburger = document.querySelector('.hamburger');
    /* 
       Find the hamburger button
       '.hamburger' = element with class="hamburger"
       
       EXAMPLE HTML:
       <button class="hamburger">
           <span></span>
           <span></span>
           <span></span>
       </button>
    */
    
    const nav = document.querySelector('header nav');
    /* 
       Find the navigation menu
       'header nav' = the <nav> element inside <header>
    */
    
    if (hamburger && nav) {
        /* 
           If both hamburger and nav exist...
           We use && (AND) to check both conditions
           
           && means: "if first is true AND second is true, then..."
           If either is false, the code inside doesn't run
        */
        
        hamburger.addEventListener('click', function() {
            /* When hamburger button is clicked... */
            
            hamburger.classList.toggle('active');
            /* 
               toggle = "switch between on and off"
               addClass if not present, remove if present
               
               EXAMPLE:
               First click: <button class="hamburger active"></button>
               Second click: <button class="hamburger"></button>
               Third click: <button class="hamburger active"></button>
               
               WHY USEFUL?
               In CSS, you'd style:
               .hamburger { } = closed state
               .hamburger.active { } = open state (three lines become X)
            */
            
            nav.classList.toggle('active');
            /* Toggle the nav menu open/close the same way */
        });
        
        /* Close menu when a link is clicked */
        const navItems = nav.querySelectorAll('a');
        /* Find all links in the nav */
        
        navItems.forEach(item => {
            /* For each nav link... */
            
            item.addEventListener('click', function() {
                /* When a nav link is clicked... */
                
                hamburger.classList.remove('active');
                /* Remove 'active' from hamburger (close button) */
                
                nav.classList.remove('active');
                /* Remove 'active' from nav (close menu) */
                
                /* 
                   WHY?
                   User clicks a link, wants to go to that section
                   Menu should automatically close
                   If menu stayed open, it would block the content
                   
                   ANALOGY:
                   Like closing a door after walking through it
                */
            });
        });
    }

    /* ===== PAGE LOAD ANIMATION =====
       Fade in content when page loads
       
       VISUAL EFFECT:
       Page appears blank for a moment, then fades in
       Creates a professional, smooth entrance
       
       HOW IT WORKS:
       1. Set page opacity to 0 (invisible)
       2. Wait 100ms
       3. Add transition property
       4. Set opacity to 1 (visible)
       Browser animates the opacity change over 0.5 seconds
       
       WHY USEFUL?
       Prevents jarring appearance of unstyled content
       Shows content is loading intentionally, not just appearing
    */
    
    document.body.style.opacity = '0';
    /* 
       Start with invisible page
       opacity: 0 = 0% visible (fully transparent)
       opacity: 1 = 100% visible (fully opaque)
       opacity: 0.5 = 50% visible (semi-transparent)
       
       document.body = the <body> element (entire page)
    */
    
    setTimeout(() => {
        /* Wait 100 milliseconds, then... */
        
        document.body.style.transition = 'opacity 0.5s ease';
        /* 
           Add smooth transition to body
           
           BREAKDOWN:
           'opacity' = animate this property
           '0.5s' = over 0.5 seconds
           'ease' = smooth easing (starts slow, speeds up, ends slow)
           
           OTHER EASING OPTIONS:
           'linear' = constant speed
           'ease-in' = slow start, fast end
           'ease-out' = fast start, slow end
           'ease-in-out' = slow start and end, fast middle
        */
        
        document.body.style.opacity = '1';
        /* Fade in to fully visible */
        
        /* 
           WHAT HAPPENS:
           1. opacity = 0 (invisible)
           2. Set transition rule
           3. opacity = 1 (visible)
           Browser sees: "opacity changed from 0 to 1, and there's a transition rule"
           So it animates the change over 0.5 seconds instead of instant
        */
    }, 100);
    /* After 100 milliseconds */

    /* ===== PERFORMANCE MONITORING =====
       Log page performance to console (useful for debugging)
       
       WHAT IS PERFORMANCE MONITORING?
       Measuring how long the page takes to load
       Helps identify slow pages that need optimization
       
       HOW IT WORKS:
       JavaScript has a performance.timing object
       It records timestamps of various page load stages:
       - navigationStart = when user navigated to page
       - loadEventEnd = when everything finished loading
       
       We calculate: loadEventEnd - navigationStart = total time
       
       HOW TO VIEW:
       Open browser console (F12) and look for the log message
       Example output: "Page loaded in 1234ms"
    */
    
    window.addEventListener('load', function() {
        /* 
           'load' event = when EVERYTHING has finished loading
           (images, stylesheets, scripts, all resources)
           
           Different from DOMContentLoaded:
           - DOMContentLoaded = just HTML structure loaded
           - load = everything including images, stylesheets, etc.
           
           'load' fires later but is more complete
        */
        
        const perfData = window.performance.timing;
        /* 
           performance.timing = object with timestamps
           
           PROPERTIES:
           navigationStart = when navigation started
           loadEventEnd = when page fully loaded
           Many more exist (you can log perfData to see all)
        */
        
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        /* 
           Calculate total load time
           
           EXAMPLE:
           navigationStart = 1000 (1000ms since page epoch)
           loadEventEnd = 3234 (3234ms since page epoch)
           pageLoadTime = 3234 - 1000 = 2234ms (about 2.2 seconds)
        */
        
        console.log('Page loaded in ' + pageLoadTime + 'ms');
        /* 
           Log the result to console
           
           'console.log()' = print message to browser console
           '+' = concatenate (join) strings together
           
           OUTPUT: "Page loaded in 2234ms"
           
           HOW TO VIEW:
           F12 or Ctrl+Shift+I = open browser developer tools
           Go to "Console" tab to see the message
           
           WHY USEFUL?
           Track performance over time
           Identify if page got slower
           Compare different versions
           Debug loading issues
        */
    });

    /* ===== END OF JAVASCRIPT ===== */
});

/* ===== ADDITIONAL UTILITY FUNCTIONS =====
   These are helper functions you can use in your code
   
   WHAT ARE UTILITY FUNCTIONS?
   Reusable code snippets that do common tasks
   Like having tools in a toolbox
   
   HOW TO USE THEM:
   Call them in other parts of your JavaScript:
   Example: getUrlParameter('id')
   
   WHY SEPARATE?
   Keep your code organized and reusable
   If multiple functions need same logic, put it in a utility
*/

/* ===== FUNCTION: getUrlParameter =====
   Get a parameter from the URL query string
   
   WHAT IS A URL PARAMETER?
   Extra information at the end of URL starting with ?
   
   EXAMPLES:
   www.example.com?name=John&age=30
   
   'name=John' = parameter name with value John
   'age=30' = parameter age with value 30
   
   HOW TO USE:
   getUrlParameter('name') → returns "John"
   getUrlParameter('age') → returns "30"
   getUrlParameter('missing') → returns ""
   
   WHY USEFUL?
   Track where user came from
   Pass data between pages
   UTM parameters for marketing
*/

function getUrlParameter(name) {
    /* 
       Parameter: 'name' = the parameter name to search for
       
       EXAMPLE:
       If URL is: example.com?brand=Ferrari&color=Red
       getUrlParameter('brand') looks for the parameter 'brand'
    */
    
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    /* 
       Clean up the name parameter
       Replace [ and ] characters (if name contains them)
       
       WHY?
       JavaScript regex special characters can cause problems
       This escapes them so they're treated as literal text
       
       .replace() = replace text
       /[\[]/  = regex pattern for [
       '\\[' = escaped version safe for regex
       
       YOU DON'T NEED TO UNDERSTAND THIS COMPLETELY
       Just copy/paste this code - it's a standard pattern
    */
    
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    /* 
       Create a search pattern (regular expression)
       
       EXAMPLE:
       If name = 'brand'
       This creates pattern: [\\?&]brand=([^&#]*)
       
       WHAT IT MATCHES:
       ?brand=value → the ?brand=value part
       &brand=value → the &brand=value part
       Captures the VALUE part in parentheses
    */
    
    const results = regex.exec(location.search);
    /* 
       location.search = the ? and everything after it in URL
       
       EXAMPLE:
       URL: example.com?brand=Ferrari&color=Red
       location.search = "?brand=Ferrari&color=Red"
       
       regex.exec() = search for the pattern in location.search
       Returns an array with matches, or null if not found
    */
    
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    /* 
       Return the result
       
       IF results === null:
       Return empty string '' (parameter not found)
       
       ELSE (parameter found):
       results[1] = the captured value
       .replace(/\+/g, ' ') = convert + to spaces (URL encoding)
       decodeURIComponent() = decode special characters
       Example: %20 becomes space, %21 becomes !
       
       RETURN EXAMPLE:
       URL: example.com?car=Ferrari%20F8
       Returns: "Ferrari F8" (decoded and spaces restored)
    */
}

/* ===== FUNCTION: formatCurrency =====
   Format a number as currency
   
   HOW TO USE:
   formatCurrency(1234.5) → returns "$1234.50"
   formatCurrency(999) → returns "$999.00"
   
   WHY USEFUL?
   Display prices consistently
   Always show 2 decimal places
   Add currency symbol
*/

function formatCurrency(amount) {
    /* Parameter: amount = number to format */
    
    return '$' + amount.toFixed(2);
    /* 
       toFixed(2) = format to 2 decimal places
       
       EXAMPLES:
       (1234.5).toFixed(2) → "1234.50"
       (999).toFixed(2) → "999.00"
       (1234.567).toFixed(2) → "1234.57" (rounds up)
       
       + '$' = add dollar sign in front
       Result: "$1234.50"
    */
}

/* ===== FUNCTION: isElementInViewport =====
   Check if an element is currently visible on screen
   
   HOW TO USE:
   if (isElementInViewport(document.getElementById('myElement'))) {
       console.log('Element is visible!');
   }
   
   RETURNS:
   true = element is visible on screen right now
   false = element is off-screen (above or below viewport)
   
   WHY USEFUL?
   Load images only when visible
   Start animations when user sees them
   Track which content user is viewing
*/

function isElementInViewport(el) {
    /* Parameter: el = the element to check */
    
    const rect = el.getBoundingClientRect();
    /* 
       getBoundingClientRect() = get element's position and size
       
       Returns object with:
       top = distance from viewport top
       left = distance from viewport left
       bottom = distance from viewport bottom
       right = distance from viewport right
       width = element width
       height = element height
       
       EXAMPLE:
       If element is at top of screen: top = 0
       If element is below screen: top = very large number
    */
    
    return (
        rect.top >= 0 &&
        /* Top of element is below top of screen */
        
        rect.left >= 0 &&
        /* Left of element is to the right of screen left */
        
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        /* Bottom of element is above bottom of screen */
        
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        /* Right of element is to the left of screen right */
    );
    /* 
       Returns true if ALL conditions are true
       (element is fully visible on screen)
       
       Returns false if ANY condition is false
       (element is partially or fully off-screen)
    */
}

/* ===== FUNCTION: debounce =====
   Prevent a function from running too often
   
   WHAT IS DEBOUNCING?
   Limiting how often a function runs
   
   WHY USEFUL?
   Some events fire very frequently:
   - 'scroll' = fires dozens of times per second
   - 'resize' = fires many times while resizing
   - 'input' = fires every keystroke
   
   Running expensive code this often = slow page
   Debounce makes sure code only runs once per pause
   
   HOW TO USE:
   const debouncedFunction = debounce(myFunction, 300);
   window.addEventListener('scroll', debouncedFunction);
   
   Now myFunction only runs 300ms after scrolling stops
   
   ANALOGY:
   Like waiting for someone to finish talking before replying
   Don't interrupt on every word, wait for them to pause
*/

function debounce(func, wait) {
    /* 
       Parameters:
       func = the function to debounce
       wait = milliseconds to wait before running
    */
    
    let timeout;
    /* Store the timeout ID so we can cancel it */
    
    return function executedFunction(...args) {
        /* 
           Return a new function that will be debounced
           
           ...args = capture any arguments passed to it
           (... is the "spread operator" - captures multiple arguments as array)
        */
        
        const later = () => {
            /* Function to run after the wait time */
            
            clearTimeout(timeout);
            /* Cancel the previous timeout if it exists */
            
            func(...args);
            /* Run the original function with the arguments */
        };
        
        clearTimeout(timeout);
        /* Cancel the previous timeout */
        
        timeout = setTimeout(later, wait);
        /* 
           Set a new timeout
           If function is called again before this timeout completes,
           the clearTimeout above will cancel it and start a new one
           
           RESULT:
           - User scrolls rapidly: scroll event fires 50 times
           - But your function only runs once at the end
           - When scrolling stops for 300ms, the function runs
        */
    };
}

/* ===== END OF UTILITY FUNCTIONS ===== */
