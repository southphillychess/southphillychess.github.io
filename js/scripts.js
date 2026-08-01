/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

// Function to get current date/time in Eastern Time
function getEasternDate() {
    const now = new Date();
    // Format options to get parts of the date in America/New_York timezone
    const options = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    const dateParts = {};
    parts.forEach(part => {
        dateParts[part.type] = part.value;
    });

    return {
        // Create a base date using the Eastern Time year, month, and day at noon to avoid timezone shift issues
        dateObj: new Date(`${dateParts.month}/${dateParts.day}/${dateParts.year} 12:00:00`),
        weekday: dateParts.weekday,
        month: dateParts.month,
        day: dateParts.day
    };
}

function updateNextWednesday() {
    const eastern = getEasternDate();
    let targetDate = eastern.dateObj;

    // If today is not Wednesday (getDay() === 3 for Wednesday), calculate the next one
    if (targetDate.getDay() !== 3) {
        const dayOfWeek = targetDate.getDay();
        // Calculate days until next Wednesday
        const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7;
        targetDate.setDate(targetDate.getDate() + daysUntilWednesday);
    }

    // Format as M/D (without leading zeros for standard short format, or use numeric formatting)
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    const formattedDate = `${month}/${day}`;

    // Find the element and update its content
    const element = document.querySelector('.next-wednesday');
    if (element) {
        element.textContent = formattedDate;
    }
}

// Run on DOM load
document.addEventListener('DOMContentLoaded', updateNextWednesday);
