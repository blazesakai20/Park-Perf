document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function getBotResponse(input) {
        let response = 'I\'m not sure how to respond to that.';

        const lowerInput = input.toLowerCase();
        const places = ['galgotias university', 'sharda university', 'amity university', 'gl bajaj', 'dlf mall', 'cp', 'railway station delhi', 'botanical garden metro station', 'pari chowk metro station', 'rajiv chowk'];
        const placeShortForms = {
            'gu': 'galgotias university',
            'galgotia': 'galgotias university',
            'galgotias': 'galgotias university',
            'sharda': 'sharda university',
            'amity': 'amity university',
            'dlf': 'dlf mall',
            'cp': 'cp',
            'rajiv chowk': 'rajiv chowk',
            'railway station delhi': 'railway station delhi'
        };
        const times = ['4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];

        // Resolve short forms to full place names
        let matchedPlace = places.find(place => lowerInput.includes(place));
        if (!matchedPlace) {
            Object.keys(placeShortForms).forEach(shortForm => {
                if (lowerInput.includes(shortForm)) {
                    matchedPlace = placeShortForms[shortForm];
                }
            });
        }

        // Greeting responses
        if (['hello', 'hi', 'hey', 'hola'].some(greeting => lowerInput.includes(greeting))) {
            response = 'Hello! How can I assist you today?';
        }
        // Farewell responses
        else if (['bye', 'goodbye'].some(farewell => lowerInput.includes(farewell))) {
            response = 'Goodbye! Have a great day!';
        }
        // Booking and availability queries
        else if (['book a slot', 'find slot', 'any slot available'].some(slotQuery => lowerInput.includes(slotQuery))) {
            if (matchedPlace) {
                response = 'Please specify a time to book a slot at ' + matchedPlace + '.';
            } else {
                response = 'Please specify a valid place to book a slot.';
            }
        } else if (times.some(time => lowerInput.includes(time)) && matchedPlace) {
            response = 'Slot booked for ' + lowerInput.match(/\d+ pm/) + ' at ' + matchedPlace + '!';
        } else if (lowerInput.includes('time is full') || lowerInput.includes('place not available')) {
            response = 'Slot time is full or place is not available yet.';
        } else if (['what is this', 'how does this work', 'explain', 'tell me more', 'how does it work'].some(infoQuery => lowerInput.includes(infoQuery))) {
            response = 'This is the Parking Assistant bot! I can help you find parking, book a slot, check availability, and answer general questions.';
        } else if (!matchedPlace) {
            response = 'The place you entered is not in our database.';
        } else {
            response = 'Slots are not available at this time.';
        }
        
        addMessage('Bot: ' + response);
    }

    sendBtn.addEventListener('click', function() {
        const input = userInput.value;
        if (input) {
            addMessage('You: ' + input, true);
            getBotResponse(input);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendBtn.click();
        }
    });
});
