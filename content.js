// Block icon SVG
const blockIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-slash">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
</svg>`;

// Main functions

// Simulate a click on an element
const simulateClick = (element) => {
    if (element) {
        element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
};

// Delay helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main block sequence
async function blockUser(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("XBlocker: Starting block sequence...");

    const tweetElement = event.currentTarget.closest('article[data-testid="tweet"]');
    if (!tweetElement) {
        console.error("XBlocker: Tweet element not found.");
        return;
    }

    const moreButton = tweetElement.querySelector('button[data-testid="caret"]');
    if (!moreButton) {
        console.error("XBlocker: 'More' button not found.");
        return;
    }
    simulateClick(moreButton);
    await sleep(100);

    const blockMenuItem = document.querySelector('div[data-testid="block"]');
    if (!blockMenuItem) {
        console.error("XBlocker: 'Block' option not found in menu.");
        simulateClick(moreButton); 
        return;
    }
    simulateClick(blockMenuItem);
    await sleep(100);

    const confirmButton = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
    if (!confirmButton) {
        console.error("XBlocker: Block confirmation button not found.");
        return;
    }
    simulateClick(confirmButton);
    console.log("XBlocker: User should be blocked.");
    
    // Optionally hide blocked tweet
    tweetElement.style.opacity = '0.5';
    tweetElement.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        tweetElement.style.display = 'none';
    }, 500);
}

// Add block buttons to all tweets
function addBlockButtons() {
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');

    tweets.forEach(tweet => {
        if (tweet.querySelector('.one-click-block-btn')) {
            return;
        }

        const insertionPoint = tweet.querySelector('div.r-1wbh5a2.r-dnmrzs.r-1ny4l3l');
        if (insertionPoint) {
            const button = document.createElement('div');
            button.className = 'one-click-block-btn';
            button.innerHTML = blockIconSVG;
            button.style.cursor = 'pointer';
            button.style.marginLeft = '8px';
            button.style.color = 'rgb(113, 118, 123)';
            button.title = 'Block this user with one click';

            button.addEventListener('mouseenter', () => button.style.color = 'rgb(239, 68, 68)');
            button.addEventListener('mouseleave', () => button.style.color = 'rgb(113, 118, 123)');
            button.addEventListener('click', blockUser);

            insertionPoint.appendChild(button);
        }
    });
}

// Observe DOM for dynamically loaded tweets
const observer = new MutationObserver((mutations) => {
    addBlockButtons();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial run for already loaded tweets
console.log("XBlocker: Content script loaded. Observing page.");
addBlockButtons();
