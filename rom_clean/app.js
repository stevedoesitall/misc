/* PLEASE READ
1. Available commands: region and title
2. Region code and folder values are case insensitive; region code shortcut is 'r' and folder shortcut is 'f'
3. Title clean only needs the folder shortcut (-f)
4. Sample command ('u' is the region code; 'test' is the folder): node app.js title -r='u' -f='test'
5. Run region clean before title clean to avoid deleting the wrong version of a ROM
6. Last update: 02.19.18 */

const yargs = require('yargs');
const roms = require('./clean_roms.js');

const region_options = {
			describe: 'Region code',
			demand: true,
			alias: 'r'
		}

const folder_options = {
			describe: 'Folder name',
			demand: true,
			alias: 'f'
        }
        
const argv = yargs
        .command('region', 'Clean ROM files by region.', {
            region: region_options,
            folder: folder_options
        })
        .command('title', 'Clean ROM files by title.', {
            folder: folder_options
        })
        .help()
        .argv;

const command = argv._[0];

if (command == 'region') {
    if (argv.region.indexOf('[') != -1 || argv.region.indexOf(']') != -1) {
        console.log('Do not include brackets ("[" or "]") in your region name!');
        return false;
    }
    const folder = argv.folder;
    const region = argv.region;
    const rom = roms.region_clean(folder, region);
    console.log('Cleaning ROM files based on region...');
}

else if (command == 'title') {
    const folder = argv.folder;
    const rom = roms.title_clean(folder);
    console.log('Cleaning ROM files based on title...');
}