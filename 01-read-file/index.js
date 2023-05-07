const fs = require('fs');

const filePath = 'text.txt';

const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', (data) => {
    console.log(data);
});

readStream.on('error', (error) => {
    console.error('Ошибка при чтении файла:', error);
});