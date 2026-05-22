$(function () {
    browser.storage.local.get("currentFontSelection").then((result) => {
        const storedFontSelection = result.currentFontSelection;
        if (storedFontSelection) {
            $("#fontMenu").val(storedFontSelection);
        }
    });

    $("#clearButton").on("click", function () {
        reset();
    });

    $("#fontMenu").on("change", function () {
        fontChangeEvent($(this).val());
    });

    $('input:radio[name=fontWeight]').on("click", function () {
        weightChangeEvent($('input[name=fontWeight]:checked').val());
    });

    $('input:radio[name=fontSlant]').on("click", function () {
        slantChangeEvent($('input[name=fontSlant]:checked').val());
    });
});

async function fontChangeEvent(newfontSelection) {
    await browser.storage.local.set({ "currentFontSelection": newfontSelection });
    let tabs = await browser.tabs.query({ currentWindow: true, active: true });
    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "jquery-4.0.0.slim.min.js" });
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: "changeFont" });
        }
        catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}

async function weightChangeEvent(newWeightSelection) {
    await browser.storage.local.set({ "currentWeightSelection": newWeightSelection });
    let tabs = await browser.tabs.query({ currentWindow: true, active: true });
    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "jquery-4.0.0.slim.min.js" });
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: "changeWeight" });
        }
        catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}

async function slantChangeEvent(newSlantSelection) {
    await browser.storage.local.set({ "currentSlantSelection": newSlantSelection });
    let tabs = await browser.tabs.query({ currentWindow: true, active: true });
    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "jquery-4.0.0.slim.min.js" });
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: "changeSlant" });
        }
        catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}

async function reset() {
    let tabs = await browser.tabs.query({ currentWindow: true, active: true });
    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "jquery-4.0.0.slim.min.js" });
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: "clearStyle" });
        }
        catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}