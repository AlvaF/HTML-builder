const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Ошибка при чтении папки:', err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Ошибка при получении информации о файле:', err);
                return;
            }

            if (stats.isFile()) {
                const fileSize = Math.round(stats.size / 1024);
                const fileExtension = path.extname(file);
                const fileName = path.basename(file, fileExtension);

                console.log(`${fileName} - ${fileExtension.slice(1)} - ${fileSize}kb`);
            }
        });
    });
});