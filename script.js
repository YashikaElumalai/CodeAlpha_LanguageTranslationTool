const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.querySelector("#translate-btn");
const copyBtn = document.querySelector("#copy-btn");
const selectTag = document.querySelectorAll("select");

// Setup language options (Example: English and Tamil)
const languages = {
    "en-GB": "English",
    "ta-IN": "Tamil",
    "hi-IN": "Hindi",
    "es-ES": "Spanish"
};

selectTag.forEach((tag, id) => {
    for (let country_code in languages) {
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : (country_code == "ta-IN" ? "selected" : "");
        let option = `<option value="${country_code}" ${selected}>${languages[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Translation Logic
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;

    if (!text) return;

    toText.placeholder = "Translating...";
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            toText.placeholder = "Translation";
        });
});

// Copy Logic (The professional extra feature)
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    setTimeout(() => copyBtn.innerText = originalText, 2000);
});