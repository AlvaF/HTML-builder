const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'files');
const copy = path.join(__dirname, 'files-copy');

function copyDir(source, copy) {
    fs.mkdir(copy, { recursive: true }, (err) => {
        if (err) {
            console.error('Ошибка при создании папки:', err);
            return;
        }

        fs.readdir(source, (err, data) => {
            if (err) {
                console.error('Ошибка при чтении папки:', err);
                return;
            }

            data.forEach((file) => {
                const sourceP = path.join(source, file);
                const targetP = path.join(copy, file);

                fs.stat(sourceP, (err, stats) => {
                    if (err) {
                        console.error('Ошибка при получении информации о файле:', err);
                        return;
                    }

                    if (stats.isFile()) {
                        fs.copyFile(sourceP, targetP, (err) => {
                            if (err) {
                                console.error('Ошибка при копировании файла:', err);
                            }
                        });
                    } else if (stats.isDirectory()) {
                        copyDir(sourceP, targetP);
                    }
                });
            });
        });
    });
}

copyDir(source, copy);
