var fontFacesLiteral = `
<style type="text/css">
   @font-face {
        font-family: "Atkinson Hyperlegible Next";
        src: url('${browser.runtime.getURL("fonts/Atkinson_Hyperlegible_Next/AtkinsonHyperlegibleNextVF-Variable.ttf")}') format('TrueType') tech(variations);
        font-weight: 200 800;
  }

  @font-face {
      font-family: "Fast Sans";
      src: url('${browser.runtime.getURL("fonts/Fast/Sans/Fast_Sans_Regular.woff2")}') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: "Fast Sans";
      src: url('${browser.runtime.getURL("fonts/Fast/Sans/Fast_Sans_Italic.woff2")}') format('woff2');
      font-weight: normal;
      font-style: italic;
  }

  @font-face {
      font-family: "Fast Sans";
      src: url('${browser.runtime.getURL("fonts/Fast/Sans/Fast_Sans_Bold.woff2")}') format('woff2');
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: "Fast Sans";
      src: url('${browser.runtime.getURL("fonts/Fast/Sans/Fast_Sans_BoldItalic.woff2")}') format('woff2');
      font-weight: bold;
      font-style: italic;
  }

  @font-face {
      font-family: "Fast Serif";
      src: url('${browser.runtime.getURL("fonts/Fast/Serif/Fast_Serif_Regular.woff2")}') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: "Fast Serif";
      src: url('${browser.runtime.getURL("fonts/Fast/Serif/Fast_Serif_Italic.woff2")}') format('woff2');
      font-weight: normal;
      font-style: italic;
  }

  @font-face {
      font-family: "Fast Serif";
      src: url('${browser.runtime.getURL("fonts/Fast/Serif/Fast_Serif_Bold.woff2")}') format('woff2');
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: "Fast Serif";
      src: url('${browser.runtime.getURL("fonts/Fast/Serif/Fast_Serif_BoldItalic.woff2")}') format('woff2');
      font-weight: bold;
      font-style: italic;
  }

  @font-face {
      font-family: "Lexend";
      src: url('${browser.runtime.getURL("fonts/Lexend/Lexend-VariableFont_wght.woff2")}') format(woff2) tech(variations);
      font-weight: 100 900;
  }

  @font-face {
      font-family: "Open Sans";
      src: url('${browser.runtime.getURL("fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.woff2")}') format(woff2) tech(variations);
      font-weight: 300 800;
      font-stretch: 75% 100%;
  }

  @font-face {
      font-family: "Open Sans";
      src: url('${browser.runtime.getURL("fonts/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.woff2")}') format(woff2) tech(variations);
      font-weight: 300 800;
      font-stretch: 75% 100%;
      font-style: italic;
  }

 @font-face {
      font-family: "Focus Sans";
      src: url('${browser.runtime.getURL("fonts/Focus_Sans/FocusSans_Regular.woff2")}') format(woff2);
  }

  @font-face {
      font-family: "Focus Sans Focus";
      src: url('${browser.runtime.getURL("fonts/Focus_Sans/FocusSans_FocusRegular.woff2")}') format(woff2);
  }
</style>
`
$(function () {
    const fontFacesElement = $('<style>').html(fontFacesLiteral);
    $('head').append(fontFacesElement);
});

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "changeFont") {
        fontChangeHandler();
    }
    else if (message.action === "changeWeight") {
        weightChangeHandler();
    }
    else if (message.action === "changeSlant") {
        slantChangeHandler();
    }
    else if (message.action === "clearStyle") {
        clearStyle();
    }
});

async function fontChangeHandler() {
    let result = await browser.storage.local.get("currentFontSelection");
    try {
        let fontSelection = result.currentFontSelection || false;
        if (fontSelection) {
            changeFont(fontSelection);
        }
    }
    catch (error) {
        console.warn(`Error: ${error.message}`);
    }
}

async function weightChangeHandler() {
    let result = await browser.storage.local.get("currentWeightSelection");
    try {
        let weightSelection = result.currentWeightSelection || false;
        if (weightSelection) {
            changeWeight(weightSelection);
        }
    }
    catch (error) {
        console.warn(`Error: ${error.message}`);
    }
}

async function slantChangeHandler() {
    let result = await browser.storage.local.get("currentSlantSelection");
    try {
        let slantSelection = result.currentSlantSelection || false;
        if (slantSelection) {
            changeSlant(slantSelection);
        }
    }
    catch (error) {
        console.warn(`Error: ${error.message}`);
    }
}


function changeFont(fontSelection) {
    $('#lectio').remove();
    if (fontSelection === "Reset") {
        browser.storage.local.remove("currentFontSelection");
        return;
    }
    else {
        let styleLiteral = `* { font-family: ${fontSelection}, sans-serif !important; } `
        const el = $('<style>', { id: "lectio" }).html(styleLiteral);
        $('head').append(el);
    }
}

function changeWeight(weightSelection) {
    $('#lectio-weight').remove();
    let styleLiteral = `* { font-weight: ${weightSelection}; }`;
    const el = $('<style>', { id: "lectio-weight" }).html(styleLiteral);
    $('head').append(el);
}

function changeSlant(slantSelection) {
    $('#lectio-slant').remove();
    let styleLiteral = `* { font-style: ${slantSelection}; }`;
    const el = $('<style>', { id: "lectio-slant" }).html(styleLiteral);
    $('head').append(el);
}

function clearStyle() {
    $('#lectio').remove();
    $('#lectio-weight').remove();
    $('#lectio-slant').remove();
    browser.storage.local.remove("currentFontSelection");
    browser.storage.local.remove("currentWeightSelection");
    browser.storage.local.remove("currentSlantSelection");
}