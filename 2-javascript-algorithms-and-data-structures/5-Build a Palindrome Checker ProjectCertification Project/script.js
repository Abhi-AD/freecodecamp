document.getElementById('check-btn').addEventListener('click', function() {
     const userInput = document.getElementById('text-input').value.toLowerCase().replace(/[^a-z0-9]/g, '');
     if (userInput === '') {
       alert('Please input a value');
       return;
     }
   
     const reversedInput = userInput.split('').reverse().join('');
     if (userInput === reversedInput) {
       document.getElementById('result').innerText = document.getElementById('text-input').value + ' is a palindrome';
     } else {
       document.getElementById('result').innerText = document.getElementById('text-input').value + ' is not a palindrome';
     }
   });
   