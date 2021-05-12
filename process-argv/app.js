const people = require("./people");
const { Command } = require("commander");
const program = new Command();

// program.option("-ga, --get-all");
program
  .option("-a, --action <type>")
  .option("-n, --name <type>")
  .option("-ln, --last-name <type>")
  .option("-d, --delete <type>");
program.parse(process.argv);

const options = program.opts();
console.log(options);
switch (options.action) {
  case "get-all":
    console.log(people);
    break;
  case "add":
    const newUser = { name: options.name, lastName: options.lastName };
    people.push(newUser);
    break;
}

// const argv = require("yargs").argv;
// // console.log(argv);

// switch (argv.action) {
//   case "get":
//     const user = people.find(({ name }) => name === argv.name);
//     console.log(user);
//     break;
// }
