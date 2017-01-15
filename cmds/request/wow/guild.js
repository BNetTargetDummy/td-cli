#! /usr/bin/env node

const yargs = require('yargs');
const blizzard = require('blizzard.js').initialize({ apikey: process.env.BATTLENET_CLIENT_ID });

const guild = yargs
  .command({
    command: 'guild',
    describe: 'Fetch a World of Warcraft Guild',
    builder: (yargs) => {
      return yargs
        .options({
          realm: {
            alias: 'r',
            describe: 'The [realm] of the {guild}',
            type: 'string',
          },
          name: {
            alias: 'n',
            describe: 'The name of the guild',
            type: 'string',
          },
        })
        .demandOption(['realm', 'name'], 'Please provide at least the [realm] and [name] of the {guild}');
    },
    handler: (argv) => {
      const { origin, locale, realm, name } = argv;

      return blizzard.wow.guild(['profile'], { origin, locale, realm, name })
        .then(response => {
          console.log(JSON.stringify(response.data));
        });
    },
  }).argv;

module.exports = guild;