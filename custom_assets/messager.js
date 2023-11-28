    const creatorId = "@codingai";
    const ENDPOINT = 'https://ikkiiktxp6.execute-api.us-east-1.amazonaws.com/prod/ragBotResource/' + creatorId;
    function getPins() {

      // Make a GET request using fetch
      fetch(ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Adjust based on the API requirements
        },
      })
      .then(response => {
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // or response.json() if the response is in JSON format
      })
      .then(data => {
        console.log(data);
        // Update the HTML of the element with id 'dataDisplay' with the fetched data
        const customPins = document.getElementById('custom-pins');
        data.forEach(item => {
          console.log(item);
          const contentElement = document.createElement('div');
          contentElement.className = "btn-container";
          contentElement.innerHTML = item.link_content;
          customPins.appendChild(contentElement);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    function inputMessage() {
        // Get the user's message from the input field
        var userMessage = document.querySelector('.form-control').value;
        // Append the user's message to the chat container
        displayMessage('user', userMessage);
  
        // Clear the input field after sending the message
        document.querySelector('.form-control').value = '';
  
        sendMessage(userMessage);
  
      }
  
      function sendMessage(userMessage) {
  
          displayMessage('bot', '<div class="loader"></div>');
          var chatContainer = document.getElementById('inner-container');
          var botMessages = chatContainer.querySelectorAll('.bot-message');
  
          if (!botMessages) {
            return;
          }
  
          
          var lastBotMessage = botMessages[botMessages.length - 1];
          // lastBotMessage.innerHTML = '<div class="loader"></div>'; 
          //===========QUERY===============
          fetch(ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: userMessage
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            
            writeToBotMessage(lastBotMessage, data);
            
  
          })
          .catch(error => {
            console.error('Error:', error);
          });
          //=============QUERY-END===============
  
  
  
          // Get all user messages
          // var userMessages = document.querySelectorAll('.user-message');
          // Concatenate all user messages
          // var allUserMessages = Array.from(userMessages).map(message => message.innerText).join(' ');
          // Respond with a sample message (you can customize this part)
          // document.getElementById('inner-container').innerHTML += '<div class="message-block"><div class="message bot-message">' + allUserMessages + '</div></div>';
  
          
  
          // Scroll the chat container to the bottom to show the latest messages
          var chatContainer = document.getElementById('chat-container');
          chatContainer.scrollTop = chatContainer.scrollHeight;
      }
  
      function displayMessage(sender, message) {
              var chatContainer = document.getElementById('inner-container');
              var messageBlock = document.createElement('div');
              var messageElement = document.createElement('div');
  
              // Add classes to the message block and message elements based on the sender
              messageBlock.className = 'message-block';
              if (sender=='bot') {
                messageElement.className = 'message ' + sender + '-message';
              } else {
                messageElement.className = 'message ' + sender + '-message float-end';
              }
              
  
              // Set the text content of the message element
              messageElement.innerHTML = message;
  
              // Append the message element to the message block
              messageBlock.appendChild(messageElement);
  
              // Append the message block to the chat container
              chatContainer.appendChild(messageBlock);
  
              // Scroll to the bottom of the chat container
              chatContainer.scrollTop = chatContainer.scrollHeight;
      }
  
      function writeToBotMessage(lastBotMessage, data) {
        // Remove loader
        lastBotMessage.innerHTML = '';
  
        const words = data.words.split(' ');
        let i = 0;
        const intervalId = setInterval(() => {
          if (i < words.length) {
            lastBotMessage.innerHTML += words[i] + ' '; // Append each word with a space
            i++;
          } else {
            clearInterval(intervalId); // Stop the interval when all words are displayed
            lastBotMessage.innerHTML += `
              ${data.link_content}
            `;
          }
        }, 50); // Adjust the interval time (in milliseconds) to control the speed of the word display
      }