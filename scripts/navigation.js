document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    function setActiveSection(sectionId) {
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                setTimeout(() => {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.display = 'none';
                    section.classList.remove('active');
                }, 300);
            }
        });
    }

    function setActiveButton(button) {
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            setActiveSection(sectionId);
            setActiveButton(button);
        });
    });

    // Set chat as default active section
    setActiveSection('chat');
    setActiveButton(document.querySelector('[data-section="chat"]'));
});
