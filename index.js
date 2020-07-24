const fetch = require('node-fetch');
const {program} = require('commander');
const {format} = require('date-fns');
const pad = require('pad-right');

program
  .option('-u, --user <type>', '<username>')
  .option('-p, --page <type>', 'page')
  .option('-n, --namepad <type>', 'pad the name');
program.parse(process.argv);

if (!program.user) {
  console.log('No user input. Please use -u <username>');
  return;
}

async function run() {
  const page = program.page ? program.page : 1;
  const url = `https://api.github.com/users/${program.user}/repos?type=owner&sort=created&page=${page}`;
  const response = await fetch(url)
    .then(res => res)
    .then(d => d.json())

  response.forEach(repo => {
    const name = pad(repo.name, program.namepad ? program.namepad : 50, ' ');
    const date = pad(format(new Date(repo.created_at), "d-M-Y"), 12, ' ');

    console.log(`${name} ${date} ${repo.url}`);
  })
}

run();
