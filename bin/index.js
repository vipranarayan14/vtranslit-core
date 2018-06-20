#!/usr/bin/env node

const VTranslitCli = require('./vtranslit-cli');

const options = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command(
    'string',
    'input a string',
    function (yargs) {

      return yargs
        .usage('Usage: $0 string -s <string> [options]')
        .options({
          'inputString': {
            alias: 's',
            demand: 'Specify the string to be transliterated',
            description: 'The string to be transliterated',
            type: 'string'
          }
        })
        .argv;

    }

  )
  .command(
    'file',
    'input a file',
    function (yargs) {

      return yargs
        .usage('Usage: $0 file -i <input_file path> [-o <output_file_path>] [options]')
        .options({

          inputFilePath: {
            alias: 'i',
            demand: 'Specify the path to the file to be transliterated',
            description: 'The path to the file to be transliterated',
            type: 'string'
          },

          outputFilePath: {
            alias: 'o',
            description: 'The path to the file to be transliterated',
            type: 'string'
          }

        });

    }

  )
  .options({
    fromScheme: {
      alias: 'f',
      choices: ['Itrn', 'Deva', 'Knda', 'Taml', 'Telu'],
      default: 'Itrn',
      demand: 'Specify Scheme to transliterate from',
      describe: 'Scheme to transliterate from',
      global: true,
      type: 'string'
    },

    toScheme: {
      alias: 't',
      choices: ['Itrn', 'Deva', 'Knda', 'Taml', 'Telu'],
      default: 'Deva',
      demand: 'Specify Scheme to transliterate to',
      describe: 'Scheme to transliterate to',
      global: true,
      type: 'string'
    }
  })

  .alias('v', 'version')
  .describe('v', 'show version information')

  .help('h')
  .alias('h', 'help')

  .argv;

const invalidCommandError = command => () => {

  throw new Error(`Unknown command: "${command}". Please refer the help (--help) for vaild commands.`);

};

(command => ({

  'file': () => {

    const vtranslitCli = new VTranslitCli(options.fromScheme, options.toScheme);

    vtranslitCli.file(options.inputFilePath, options.outputFilePath);

  },

  'string': () => {

    const vtranslitCli = new VTranslitCli(options.fromScheme, options.toScheme);

    vtranslitCli.string(options.inputString);

  }

}[command] || invalidCommandError(command)))(options._[0])();