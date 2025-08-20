document.addEventListener('DOMContentLoaded', function() {
    // Select all the language toggle buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Select all elements that have English or German text
    const enTexts = document.querySelectorAll('.en-text');
    const deTexts = document.querySelectorAll('.de-text');

    // This is the main function that switches the language
    const setLanguage = (lang) => {
        if (lang === 'de') {
            // If German is selected:
            // Hide all English elements
            enTexts.forEach(el => el.style.display = 'none');
            // Show all German elements
            deTexts.forEach(el => el.style.display = 'inline');

            // Update the active state on the buttons
            document.querySelector('[data-lang="de"]').classList.add('active');
            document.querySelector('[data-lang="en"]').classList.remove('active');

        } else {
            // Otherwise, default to English:
            // Show all English elements
            enTexts.forEach(el => el.style.display = 'inline');
            // Hide all German elements
            deTexts.forEach(el => el.style.display = 'none');

            // Update the active state on the buttons
            document.querySelector('[data-lang="en"]').classList.add('active');
            document.querySelector('[data-lang="de"]').classList.remove('active');
        }
        
        // Save the user's choice in their browser's memory
        localStorage.setItem('language', lang);
    };

    // Add an event listener to each button
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // When a button is clicked, get its language ('en' or 'de')
            const selectedLang = button.dataset.lang;
            // Call the main function to switch the language
            setLanguage(selectedLang);
        });
    });

    // When the page first loads, check if a language was saved previously
    const savedLang = localStorage.getItem('language');

    // If a language was saved, use it. Otherwise, default to English.
    setLanguage(savedLang || 'en');
});
