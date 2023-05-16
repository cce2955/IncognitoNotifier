
chrome.windows.onCreated.addListener((window) => {
    chrome.windows.get(window.id, { populate: true }, (currentWindow) => {
    const activeTab = currentWindow.tabs.find((tab) => tab.active);if (activeTab && activeTab.incognito && !activeTab.url.startsWith('chrome://')) {
        chrome.windows.update(currentWindow.id, { focused: true });
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon128.png',
          title: 'Incognito Identifier',
          message: 'You are browsing in incognito mode'
        });
      }
    });
});      
