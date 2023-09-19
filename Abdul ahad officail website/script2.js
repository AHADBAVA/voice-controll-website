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
                        'go to home': () => {
                            window.location.href = "second.html";
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