// Функция преобразования массива чисел в ASCII строки
function encodeNumbers(numbers) {
  const result = [];
  
  for (let num of numbers) {
      if (num <= 256) {
          // Преобразуем число в ASCII символ
          result.push(String.fromCharCode(num + 32));
      } else {
          // Для чисел больше 256 добавляем нулевой символ и разницу
          const diff = num - 256;
          result.push('\x00' + String.fromCharCode(diff + 32));
      }
  }
  
  return result.join('');
}

// Функция декодирования ASCII строки обратно в числа
function decodeString(encodedStr) {
  const result = [];
  let i = 0;
  
  while (i < encodedStr.length) {
      const currentChar = encodedStr.charCodeAt(i);
      
      if (currentChar === 0) {
          // Если встретили нулевой символ - читаем следующий байт как разницу
          const diff = encodedStr.charCodeAt(i + 1);
          result.push(diff + 256 - 32);
          i += 2;
      } else {
          // Обычное число <= 256
          result.push(currentChar - 32);
          i++;
      }
  }
  
  return result;
}
function generateTest900() {

    const numbers = [];
    // Генерируем по три числа для каждого значения от 0 до 299
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 3; j++) {
            numbers.push(i);
        }
    }
    return  numbers ;

}
function generateTestCases() {
  const testCases = {
      simple: [100, 105, 110, 115, 120],
      random50: Array.from({length: 50}, () => Math.floor(Math.random() * 300)),
      random100: Array.from({length: 100}, () => Math.floor(Math.random() * 300)),
      random500: Array.from({length: 500}, () => Math.floor(Math.random() * 300)),
      random1000: Array.from({length: 1000}, () => Math.floor(Math.random() * 300)),
      singleDigit: Array.from({length: 300}, () => Math.floor(Math.random() * 10)),
      twoDigits: Array.from({length: 300}, () => Math.floor(Math.random() * 90) + 10),
      threeDigits: Array.from({length: 300}, () => Math.floor(Math.random() * 200) + 100),
      eachThree: generateTest900(),
  };

  return testCases;
}

// Функция для расчёта коэффициента сжатия
function calculateCompressionRatio(originalSize, compressedSize) {
  return originalSize / compressedSize;
}


// Функция для тестирования с различными наборами данных
function runTests() {
  const testCases = generateTestCases();
  
  console.log('Начало тестирования...\n');
  
  for (const [name, numbers] of Object.entries(testCases)) {
      console.log(`Тест: ${name}`);
      console.log(`Исходный массив: [${numbers.slice(0, 10).join(', ')}${numbers.length > 5 ? '...' : ''}]`);
      console.log(`Длина массива: ${numbers.length}`);
      
      const asciiString = encodeNumbers(numbers);
      console.log(`Сжатая строка: ${asciiString}`);
      
      const decodedNumbers = decodeString(asciiString);
       console.log(`Коэффициент сжатия: ${calculateCompressionRatio(numbers.length * 4, asciiString.length).toFixed(2)}:1`);      
      // Проверяем корректность декодирования
      const isCorrect = JSON.stringify(numbers) === JSON.stringify(decodedNumbers);
      console.log(`Корректность декодирования: ${isCorrect ? '✓' : '✗'}`);
      console.log('---\n');
  }
}


// Запускаем все тесты
runTests();