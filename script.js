document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const enTexts = document.querySelectorAll('.en-text');
    const deTexts = document.querySelectorAll('.de-text');

    // Function to set the language
    function setLanguage(lang) {
        if (lang === 'en') {
            // Show English text, hide German text
            enTexts.forEach(el => el.style.display = 'inline');
            deTexts.forEach(el => el.style.display = 'none');
            // Update button active state
            document.querySelector('.lang-btn[data-lang="en"]').classList.add('active');
            document.querySelector('.lang-btn[data-lang="de"]').classList.remove('active');
            // Store preference
            localStorage.setItem('language', 'en');
        } else if (lang === 'de') {
            // Show German text, hide English text
            enTexts.forEach(el => el.style.display = 'none');
            deTexts.forEach(el => el.style.display = 'inline');
            // Update button active state
            document.querySelector('.lang-btn[data-lang="de"]').classList.add('active');
            document.querySelector('.lang-btn[data-lang="en"]').classList.remove('active');
            // Store preference
            localStorage.setItem('language', 'de');
        }
    }

    // Add click event listeners to the buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // Check for saved language preference on page load
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        // Default to English if no preference is saved
        setLanguage('en');
    }
});
