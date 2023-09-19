const body = document.querySelector('body');
const hero = document.getElementById("hero")
const contact = document.getElementById("contact")
        const outputElement = document.getElementById('output');
        let recognition;

        function scrollToContact() {
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        function scrollToHero() {
            const contactSection = document.getElementById('hero');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            respond('Scrolling to home section.');
        }

        function respond(message) {
            const response = document.createElement('p');
            response.textContent = `Bot: ${message}`;
        }

        function startRecognition() {
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

                recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript.toLowerCase();

                    const commands = {
                        'switch to dark theme': () => {
                            contact.style.backgroundColor = 'black';
                            hero.style.backgroundColor = 'black';
                            contact.style.color = 'white';
                            hero.style.color = 'white'
                        },
                        'switch to light theme': () => {
                            contact.style.backgroundColor = 'white';
                            hero.style.backgroundColor = 'white';
                            contact.style.color = 'black';
                            hero.style.color = 'black'
                        },
                        'go to contact': () => {
                            scrollToContact();
                        },
                        'go to home': () => {
                            scrollToHero();
                        },
                        'useless website': () => {
                            alert("then just leave")
                        },
                        'what are you doing': () => {
                            alert("i am trying to help you")
                        },
                        'open debug media': () => {
                            window.location.href = "https://youtube.com/@debugmedia?si=NNDzLOxXPUj_orWH";
                        },
                        'open login page': () => {
                            window.location.href = "Login.html";
                        },
                    };

                    if (commands.hasOwnProperty(transcript)) {
                        commands[transcript]();
                    } else {
                        console.log('Command not recognized.');
                    }
                };

                recognition.onend = () => {
                    startRecognition();
                };

                recognition.start();
            } else {
                console.log('Speech recognition is not supported in your browser')
            }
        }

        startRecognition();