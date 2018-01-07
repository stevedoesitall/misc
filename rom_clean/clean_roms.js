const fs = require('fs');

var directory = '/Users/stephengiordano/Desktop/';
var now = new Date().toString();

function region_clean(folder, region) {
    var rom_counts = {
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
    var region_code = '[' + region.toUpperCase() + ']';
    var path = directory + folder.toLowerCase() + '/';
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            rom_counts.processed = rom_counts.processed + 1;
            if (file.indexOf(region_code) == -1) {
                fs.unlink(path + file, (err) => {
                    if (err) {
                        console.log('Failed to delete file: ' + file);
                        console.log(err);
                        var status = 'errored';
                        rom_counts.errored = rom_counts.errored + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.')
                            }
                        });
                    }
                    else {
                        console.log('Successfully deleted: ' + file);
                        var status = 'deleted';
                        rom_counts.deleted = rom_counts.deleted + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.')
                            }
                        });
                    }
                });
            }
            else {
                console.log(file + ' kept.');
                var status = 'kept';
                rom_counts.kept = rom_counts.kept + 1;
                fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                    if (err) {
                        console.log('Unable to append to file.')
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
    var rom_counts = {
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
    var used_titles = [];
    var path = directory + folder.toLowerCase() + '/';
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            rom_counts.processed = rom_counts.processed + 1;
            var rom_name = file.substr(0,file.indexOf('_'));
            if (used_titles.includes(rom_name)) {
                fs.unlink(path + file, (err) => {
                    if (err) {
                        console.log('Failed to delete file: ' + file);
                        console.log(err);
                        var status = 'errored';
                        rom_counts.errored = rom_counts.errored + 1;
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.')
                            }
                        });
                    }
                    else {
                        console.log('Successfully deleted: ' + file);
                        var status = 'deleted';
                        fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                            if (err) {
                                console.log('Unable to append to file.')
                            }
                        });
                        rom_counts.deleted = rom_counts.deleted + 1;
                    }
                });
            }
            else {
                used_titles.push(rom_name);
                console.log(file + ' kept.');
                var status = 'kept';
                rom_counts.kept = rom_counts.kept + 1;
                fs.appendFile('server.log', file + ': ' + status + '\n', (err) => {
                    if (err) {
                        console.log('Unable to append to file.')
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