//PLEASE READ
//Available commands: region and title
//Region code and folder values are case insensitive; region code shortcut is 'r' and folder shortcut is 'f'
//Sample command ('u' is the region code; 'test' is the folder): node app.js title -r='u' -f='test'
//Run region clean before title clean to avoid deleting the wrong version of a ROM
//Last update: 12.27.17

const fs = require('fs');
const yargs = require('yargs');
const os = require('os');
const roms = require('./clean_roms.js');

var region_options = {
			describe: 'Region code',
			demand: true,
			alias: 'r'
		}

var folder_options = {
			describe: 'Folder name',
			demand: true,
			alias: 'f'
        }
        
var argv = yargs
        .command('region', 'Clean ROM files by region.', {
            region: region_options,
            folder: folder_options
        })
        .command('title', 'Clean ROM files by title.', {
            folder: folder_options
        })
        .help()
        .argv;

var command = argv._[0];

if (command == 'region') {
    if (argv.region.indexOf('[') != -1 || argv.region.indexOf(']') != -1) {
        console.log('Do not include brackets ("[" or "]") in your region name!');
        return false;
    }
    var rom = roms.region_clean(argv.folder, argv.region);
    console.log('Cleaning ROM files based on region...');
}

else if (command == 'title') {
    var rom = roms.title_clean(argv.folder);
    console.log('Cleaning ROM files based on title...');
}