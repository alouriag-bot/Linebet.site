// Function to copy the promo code to the clipboard
function copyCode() {
    const codeElement = document.getElementById('promoCode');
    const copyButton = codeElement.nextElementSibling;
    if (!codeElement) {
        console.error('Error: Promo code element not found');
        return;
    }
    const code = codeElement.innerText;
    // Use the modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(() => {
            showCopyFeedback(copyButton);
        }).catch(err => {
            console.error('Clipboard API failed: ', err);
            attemptFallbackCopy(codeElement, copyButton);
        });
    } else {
        // Fallback for older browsers
        attemptFallbackCopy(codeElement, copyButton);
    }
}

function attemptFallbackCopy(codeElement, copyButton) {
    try {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeElement.innerText;
        tempTextArea.style.position = 'absolute';
        tempTextArea.style.opacity = '0';
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        showCopyFeedback(copyButton);
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
}

function showCopyFeedback(button) {
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
    }, 2000);
}

// Functions to open and close modals
function openModal(modalId) {
    try {
        document.getElementById(modalId).style.display = 'flex';
    } catch (e) {
        console.error('Error opening modal:', e);
    }
}

function closeModal(modalId) {
    try {
        document.getElementById(modalId).style.display = 'none';
    } catch (e) {
        console.error('Error closing modal:', e);
    }
}

// Expose functions to the global scope
window.openModal = openModal;
window.closeModal = closeModal;

// Add smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
