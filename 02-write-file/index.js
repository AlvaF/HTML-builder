const fs = require('fs');
const readline = require('readline');

const filePath = 'output.txt';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function writeToFile(text) {
    fs.appendFile(filePath, text + '\n', (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
        }
    });
}

function exitHandler() {
    rl.close();
    console.log('Прощайте!');
    process.exit(0);
}

process.on('SIGINT', exitHandler); // Обработка сигнала Ctrl+C
rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        exitHandler();
    } else {
        writeToFile(input);
    }
});

fs.writeFile(filePath, '', (err) => {
    if (err) {
        console.error('Ошибка при создании файла:', err);
    } else {
        console.log('Файл успешно создан.');
        console.log('Введите текст (или "exit" для завершения):');
    }
});