# Twitter Helper

A simple but powerful browser extension that adds a one-click "Block" button directly to tweets on X (formerly Twitter), allowing you to quickly and efficiently clean up your timeline.

## Why?

Navigating X/Twitter can sometimes be overwhelming due to spam, bots, or unwanted content. The default process of blocking a user requires at least three clicks:
1.  Click the "More" (...) menu.
2.  Click the "Block" option.
3.  Click the final "Block" confirmation button.

This extension streamlines the entire process into a **single click**, saving you time and effort.

## Features

-   **One-Click Blocking:** Adds a small block icon next to the user's name on every tweet.
-   **Seamless Integration:** The button blends in with the native X/Twitter UI.
-   **Efficient:** Uses modern JavaScript (`MutationObserver`) to handle dynamically loaded tweets without slowing down your browser.
-   **Privacy-Focused:** The extension runs entirely in your browser and does not collect any data.

## Installation (from source)

Since this extension is not on the Chrome Web Store, you can easily load it from the source code:

1.  **Download:** Download this repository as a ZIP file and unzip it, or clone it using Git:
    ```bash
    git clone [https://github.com/EXXC3PT10N/twitter-helper.git](https://github.com/EXXC3PT10N/twitter-helper.git)
    ```
2.  **Open Extensions Page:** Open your Chrome/Brave/Edge browser and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** Turn on the "Developer mode" toggle, usually located in the top-right corner.
4.  **Load the Extension:** Click the "Load unpacked" button and select the folder where you unzipped or cloned the repository.

The extension is now installed and ready to use!

## How It Works

The extension injects a **Content Script** (`content.js`) into all pages on `x.com` and `twitter.com`.

-   A `MutationObserver` watches the page for new tweets being added to the DOM as you scroll.
-   When new tweets are detected, the script finds the "More" menu (`...`) within each tweet and inserts our custom block button just before it.
-   When the block button is clicked, the script programmatically simulates the three clicks required to block the user, completing the action in milliseconds.

## Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, feel free to open an issue or submit a pull request. This could include:
-   Adding an option to "Mute" instead of "Block".
-   Improving the reliability of selectors if the X/Twitter UI changes.
-   Creating a settings page.
