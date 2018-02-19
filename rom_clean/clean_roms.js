const fs = require('fs');
const path = require('path');

//Change the value of directory to the folder you want to clean, ex. /Users/stephenagiordano/Desktop/Rom Files
const directory = path.join(__dirname, '../');
const now = new Date().toString();

function region_clean(folder, region) {
    const rom_counts = {
        processed: 0,
        kept: 0,
        errored: 0,
        deleted: 0
    };
    fs.appendFile('server.log', '\n' + 'Job: Region Clean; Run On ' + now + '\n', (err) => {
        if (err) {
            console.log('Unable to append to file.')
        }
    });
    const region_code = '[' + region.toUpperCase() + ']';
    const folder_path = directory + folder.toLowerCase() + '/';
    fs.readdir(folder_path, (err, files) => {
        files.forEach(file => {
            rom_counts.processed = rom_counts.processed + 1;
            if (file.indexOf(region_code) == -1) {
                fs.unlink(folder_path + file, (err) => {
                    if (err) {
                        console.log('Failed to delete file: ' + file);
                        console.log(err);
                        const status = 'errored';
                        rom_counts.errored = rom_counts.errored + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.');
                            }
                        });
                    }
                    else {
                        console.log('Successfully deleted: ' + file);
                        const status = 'deleted';
                        rom_counts.deleted = rom_counts.deleted + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.');
                            }
                        });
                    }
                });
            }
            else {
                console.log(file + ' kept.');
                const status = 'kept';
                rom_counts.kept = rom_counts.kept + 1;
                fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                    if (err) {
                        console.log('Unable to append to file.');
                    }
                });
            }
            if (rom_counts.processed == files.length) {
                setTimeout(() => {
                    console.log(`ROM region clean finished. Processed: ${rom_counts.processed}. Kept: ${rom_counts.kept}. Deleted: ${rom_counts.deleted}. Errored: ${rom_counts.errored}.`);
                }, 3000);
            }
        });
    });
};

function title_clean(folder) {
    const rom_counts = {
        processed: 0,
        kept: 0,
        errored: 0,
        deleted: 0
    };
    fs.appendFile('server.log', '\n' + 'Job: Title Clean; Run On ' + now + '\n', (err) => {
        if (err) {
            console.log('Unable to append to file.')
        }
    });
    const used_titles = [];
    const path = directory + folder.toLowerCase() + '/';
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            rom_counts.processed = rom_counts.processed + 1;
            const rom_name = file.substr(0,file.indexOf('_'));
            if (used_titles.includes(rom_name)) {
                fs.unlink(path + file, (err) => {
                    if (err) {
                        console.log('Failed to delete file: ' + file);
                        console.log(err);
                        const status = 'errored';
                        rom_counts.errored = rom_counts.errored + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.');
                            }
                        });
                    }
                    else {
                        console.log('Successfully deleted: ' + file);
                        const status = 'deleted';
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.');
                            }
                        });
                        rom_counts.deleted = rom_counts.deleted + 1;
                    }
                });
            }
            else {
                used_titles.push(rom_name);
                console.log(file + ' kept.');
                const status = 'kept';
                rom_counts.kept = rom_counts.kept + 1;
                fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                    if (err) {
                        console.log('Unable to append to file.');
                    }
                });
            }
            if (rom_counts.processed == files.length) {
                setTimeout(() => {
                    console.log(`ROM title clean finished. Processed: ${rom_counts.processed}. Kept: ${rom_counts.kept}. Deleted: ${rom_counts.deleted}. Errored: ${rom_counts.errored}.`);
                }, 3000);
            }
        });
    });
};

module.exports = {
    region_clean,
    title_clean
};