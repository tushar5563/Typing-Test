const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

//set value
let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph() {
    const paragraph = [
        "Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required.",
        "Subscribe to Drop X Out.",
        "Believe in yourself, because no one else can do it better than you.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Mistakes are proof that you are trying. Keep going!",
        "Don't wait for opportunity. Create it yourself.",
        "Your potential is endless. Keep pushing beyond your limits.",
        "Every day may not be good, but there’s something good in every day.",
        "It's never too late to start chasing your dreams.",
        "Progress is progress, no matter how small. Celebrate your small wins.",
        "Be so good they can’t ignore you.",
        "The future depends on what you do today, so make it count.",
        "Doubt kills more dreams than failure ever will.",
        "Challenges are what make life interesting, and overcoming them is what makes life meaningful.",
        "Take risks: if you win, you'll be happy; if you lose, you'll be wiser.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "Don’t let yesterday take up too much of today.",
        "You don't have to be perfect to be amazing.",
        "Stay focused on your journey, not on the comparison to others.",
        "Great things never come from comfort zones.",
        "Success is not about speed, but about consistency and endurance.",
        "Failure is not the opposite of success; it's part of success.",
        "Your hard work will pay off, just stay patient and keep moving forward.",
        "Dream big, work hard, stay focused, and surround yourself with good people.",
        "Your value doesn't decrease based on someone’s inability to see your worth.",
        "Keep your eyes on the stars, but your feet on the ground.",
        "Life is not about waiting for the storm to pass, but about learning to dance in the rain.",
        "You can’t go back and change the beginning, but you can start where you are and change the ending.",
        "Don’t be afraid to give up the good to go for the great.",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Start where you are. Use what you have. Do what you can.",
        "Don't stop until you're proud of yourself.",
        "Difficult roads often lead to beautiful destinations.",
        "Strength doesn’t come from what you can do, it comes from overcoming the things you once thought you couldn’t.",
        "Don’t limit your challenges, challenge your limits.",
        "Success is not how high you have climbed, but how you make a positive difference in the world."
    ];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

//Handle user input
function initTyping(){
    const char= typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex- mistake;
    }
    else{
clearInterval(timer);
input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();