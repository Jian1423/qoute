/* ================
    RANDOM QOUTE
 ================*/

 async function getQuote() {
    try {
        const text = document.getElementById("customText")
        const img = document.getElementById("img")

        text.value = "Loading..."
        const res = await fetch("https://dummyjson.com/quotes/random")
        const data = await res.json()
        img.src = `https://picsum.photos/600/300?${Date.now()}`
        text.value = `#${data.id}\n${data.quote} \n\n- ${data.author}`
       
    } catch (err) {
        console.log(err)
    }
 }

function loadVoices(){

    const select = document.getElementById("voiceSelect");
    select.innerHTML = "";

    const voices = speechSynthesis.getVoices();

    console.log("Voices" + voices)
    voices.forEach((v, i) => {

        const option = document.createElement("option");

        let gender = v.name.toLowerCase().includes("female") ? "♀️ Female"
                    : v.name.toLowerCase().includes("male") ? "♂️ Male"
                    : "🎧 Neutral";

        option.value = i;
        option.textContent = `${gender} - ${v.name}`;

        select.appendChild(option);
    });

    selectedVoice = voices[0] || null;

    select.onchange = () => {
        selectedVoice = voices[select.value];
    };
}

function speak(){  
   
    const textarea = document.getElementById("customText");
    const text = textarea.value;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    if (selectedVoice) {
        utter.voice = selectedVoice;
    } else if (voices.length > 0) {
        utter.voice = voices[0];
    }

    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;

    speechSynthesis.speak(utter);
}

function pauseSpeech(){ speechSynthesis.pause(); }
function resumeSpeech(){ speechSynthesis.resume(); }
function stopSpeech(){ speechSynthesis.cancel(); }
speechSynthesis.onvoiceschanged = loadVoices;
 
 getQuote()