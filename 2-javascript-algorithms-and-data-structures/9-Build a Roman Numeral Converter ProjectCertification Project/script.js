document.getElementById('convert-btn').addEventListener('click', function() {
     var numberInput = document.getElementById('number').value;
     var outputDiv = document.getElementById('output');
   
     if (numberInput === '') {
       outputDiv.textContent = 'Please enter a valid number';
     } else {
       var number = parseInt(numberInput);
   
       if (number < 1) {
         outputDiv.textContent = 'Please enter a number greater than or equal to 1';
       } else if (number > 3999) { // Corrected condition
         outputDiv.textContent = 'Please enter a number less than or equal to 3999';
       } else {
         outputDiv.textContent = convertToRoman(number);
       }
     }
   });
   
   function convertToRoman(num) {
     var romanNumeral = '';
     var romanNumerals = {
       'M': 1000,
       'CM': 900,
       'D': 500,
       'CD': 400,
       'C': 100,
       'XC': 90,
       'L': 50,
       'XL': 40,
       'X': 10,
       'IX': 9,
       'V': 5,
       'IV': 4,
       'I': 1
     };
   
     for (var key in romanNumerals) {
       while (num >= romanNumerals[key]) {
         romanNumeral += key;
         num -= romanNumerals[key];
       }
     }
   
     return romanNumeral;
   }
   