const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const count = document.getElementById("count");

inputText.addEventListener("input", () => {
    count.textContent = inputText.value.length;
});

async function translateText() {

    const text = inputText.value.trim();

    if (!text) {
        alert("Please enter text");
        return;
    }

    const source =
        document.getElementById("sourceLang").value;

    const target =
        document.getElementById("targetLang").value;

    output.innerHTML = "Translating...";

    try {

        const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        const data = await response.json();

        output.innerHTML =
        data.responseData.translatedText;

    } catch (error) {

        output.innerHTML =
        "Translation Failed!";
    }
}

function copyText() {

    navigator.clipboard.writeText(
    output.innerText);

    alert("Copied Successfully!");
}

function speakText() {

    const text = output.innerText;

    if (!text) return;

    speechSynthesis.cancel();

    const speech =
    new SpeechSynthesisUtterance(text);

    const target =
    document.getElementById("targetLang").value;

    const langMap = {
        en:"en-US",
        hi:"hi-IN",
        te:"te-IN",
        ta:"ta-IN",
        kn:"kn-IN",
        ml:"ml-IN",
        bn:"bn-IN",
        gu:"gu-IN",
        mr:"mr-IN",
        pa:"pa-IN",
        ur:"ur-PK",
        fr:"fr-FR",
        es:"es-ES",
        de:"de-DE",
        zh:"zh-CN",
        ja:"ja-JP",
        ko:"ko-KR",
        ar:"ar-SA",
        ru:"ru-RU"
    };

    speech.lang =
    langMap[target] || "en-US";

    speechSynthesis.speak(speech);
}

function swapLanguages() {

    const source =
    document.getElementById("sourceLang");

    const target =
    document.getElementById("targetLang");

    let temp = source.value;

    source.value = target.value;
    target.value = temp;
}

function startVoiceInput() {

    const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Use Google Chrome for Voice Input");
        return;
    }

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {

        inputText.value =
        event.results[0][0].transcript;

        count.textContent =
        inputText.value.length;
    };
}