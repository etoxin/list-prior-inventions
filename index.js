const fetch = require('node-fetch');
const {program} = require('commander');
const {format} = require('date-fns');
const pad = require('pad-right');

program
  .option('-u, --user <type>', '<username>')
  .option('-p, --page <type>', 'page');

program.parse(process.argv);

if (!program.user) {
  console.log('No user input. Please use -u <username>');
  return;
}

async function run() {
  const response = await fetch(`https://api.github.com/users/${program.user}/repos?type=owner&sort=created&page=${program.page ? program.page : 1}`).then(res => {
    return res;
  }).then(d => d.json())

  response.forEach(repo => {
    console.log(`${pad(repo.name, 50, ' ')}   ${pad(format(new Date(repo.created_at), "d-M-Y"), 10, ' ')}   ${repo.url}`);
  })
}

run();

