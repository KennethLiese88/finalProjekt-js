import rls from "readline-sync";
import chalk from 'chalk';

const letterCasing = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

const defaultForString = (question, defaultValue) => question.trim() === "" ? defaultValue : question.trim();
const defaultForNumber = (question, defaultValue) => question.trim() === "" || isNaN(Number(question)) ? defaultValue : Number(question);

function defaultAndCasing(question, defaultValue) {
    return defaultForString(question, defaultValue).split(" ").map(item => letterCasing(item)).join(" ");
}

// Intro ---------------------------------------------------------------------------------

console.clear();
console.log(`
                                                                ▄▄           
                                                                  ▀▀▄        
                                                                     █       
                                                                     ▐█      
                                                                    ▄███     
     ▄▄▄█▀▀                                                      ▄▄█▀███▌    
  ▄███▀                                                     ▄▄▄██▀██████▌    
 ██▓█                                             ▄▄▄▄▄███▀▀▀▀▄▄███████▓▌    
▐█▓▐▌ ░                                      ▄▄███▀▀▀░░░▄▄▓▓██████████▓▓     
███░█▄                           ▄▄      ▄▄██▀▀  ░░░▒▒▓▓▓▓██████████▓▓▓      
▐███▒▀█▄▄                     ▄█▀     ░▄███▀░░░▒▒▒▓▓▓▓████████████▓▓▒▀       
 ████▓▓▄▄▀▀▀█▄▄▄            ▄▀▀█▄▄  ▄▄██▀  ░░▒▒▓▓███████████████▓▒▒▒         
  █▓███████░░▒█▀███▄▄▄     ▐▄▀▀▄▄▀█████ ░░▒▒▓▓▓████████████████▓▓▓▒▌         
   █▓█████████▓▓▒▒░░▀▀▀██▄▄▀▀██ ██▄▀██ ░▒▓▓███████▓▓▓▓▀▀███▀█▀███▓▓▓         
    █▓▓███████████▓▓▓▒▒░  ▀▀█▄▄████▌▐▌▒▓▓███▓▒░▀██▄██████▀▀▀▀▀▀▀█████▄▄      
    ▐█▓▓▓▓▓█████████████▓▓▓▒░ ▀▀████ ▌░▓▓▓░▄▄█████▀▀░░░▓▓███▓▓▒▒░░░███▀▀▀▀   
    ▐█▓▓▓▓▓▓▓▓▓▓▓██████████▓▓▒░░ ▐██▌▐▄▒░█████▀▀░░▒▒▓▓████████████▀▀         
    █▓▓▀▄▄▄███▄▄▄▄▄░░▒▓▓█████▓▓▒░ ██▌░██████▀▒▒▓▓▓█████████████▀   ▀█▄▄▄▄▄▀  
  ▄████▀▀▄▄▄▄▄  ▀▀▀███▄▄▀▀░▒▓▓▓▒░▐██ █████▀▒▓▓▓███████████████▌ ▄▄▀▀███▀▀    
 ▀▀▀███████▓▓▓▓▒▒░ ░ ▀▀███▄░▒▓▒░░██▓▐███▌░▒▓▓▓████████████████ ▐█  ▐▀        
      ▀▀█████▓▓▓▓▒▒░░░░ ▀████▄▄███▒  ▀███▄░▒▒▓▓▓▓▓████████████  ▀█▄▄         
         ▀██████▓▓▓▓▒▒░░ ▀███████▀     ▓███▄░▒▒▓▓▓▓▓▓▓▓███████▌    ▀▓█▄▄     
           ███████▓▓▓▓▒░░ ▐█████░        ▓███ ░▒▒░▄▄▄▄████▄▄▄█▀▄      ▀███▄  
           ▐█████▓▓▓▓▒░░░ ▐███▀           ▐███▄█████▀▀▀ ▄▄▄▄██████▄▄    ▀██▓ 
           ███▀░▒▄▄▄▄▄░  ▄███▌        ▄    ██████░░▄▓███▓▓▓▓▀▀▀          ▓██▌
          ███▄█▀▀▀▀▀▀▀████▀██     ▄▌  ▐▄   ████ ░▓▓██▓▓▓▀                ▐███
         ▐██▀▀▀▀██▓▓▒▒▒░▀▌▌▓█▌   ███▄  █▌ ▄███ ░▒▓██▓▀                  ▄▓██▓
         ▀        ▀▀▓▓▒░░▌█ ▓█  ▐██▀▀█▄██▐███░▒▒▓███                 ▄▄▓▓███▌
                     ▓▓▓░░█▌▀█▓▄█▀▄▓▓▒░▐█▌▐█▓▓▒▓███▌           ▄▄▓▒▒▓▓▓████▓ 
                     ▐█▓▓ ██ ▄▓▓▌░▓▓▒░░▐██ ████▓▓██       ░▄▒▒▓▓▓▓██████▓▓▓  
                      ▄█▄ ██▌▒▓▒█▌▓▒▒░ ▐██ ░▓███▄▄▀▌    ▄▒▓▓▓███████▓▓▓▓▓▀   
                   ▄█▓▓▓▒░▐██ ░▓▀█▓░░  ▌██▌▐█████████▄▄░▒▓▓██████▓▓▓▓▓▀▀     
                  █▓▓██▒▒░▐░██ ░░▐ ░   ▒▓█▌ ░▓▓▓▓████████▄▀▓███▓▓▓▓▀         
                 ▓▓██▓▒░░ ▐▓███ ░   ▄▄ ▀▀██   ░░▓▓▓█████▓███▄▓▓▓▓▀           
        ▄       ▓███▓▒░░   █████▄▄██████▄▄▄▌   ▄ ░▓▓▓█████████▄░▌            
       ▀▓▀     ▐███▓▒░░  ▐▒▐██▀▀▄█████▌███░▓▓▐█   ░▒▓██████████▄         ▄   
        ░ ▐   ░ ██▓▒▄   ▄▄▓▒▄▄▓▒░▀█████▄██▐▓▌█   ░░▒▓▓▓▓███████▓        ▀▓▀  
          ▐▌ ▄▓▄▀██░ ▀███▓█▀▓████▒░ ▀▀██▄█▌█▀ ▌█▀ ░▓▓▒████████▓▓▌  ░   ▌ ░   
          ▐█▌ ▀ ▐██▓▒░ ▀████▄ ▀▀█████▓▄▀███▐▐▌▐ ▄  ▐░▓██████▓███▓ ▄▓▄ ▐▌     
           ▓██▄ ▀▀██▓ ▄██▓███▓ ▐▄▄░▀▀▀█▌▀██▀█░█▌    ░▓█████████▓▒  ▀ ▐█▌     
           ▐▓█████▄▄▀░░  ▄████▓ ▀██▄▐█▄ ░▓██▄▓▓▀     ▓▓████████░▐ ▄▄██▓      
            ░▓▓▓████▌▒  ▄█▀▀▓██▓▄▄ ▀▀▀   ▒▓█▓▓▌ ░     ░▓▓████░ ▄▓▓███▓░      
             ▀░▓▓▓▓█ ▓░▀    ▀██████▓▒▒░░  ▓▓█▓▒▄        ▀▄██▓▒▐████▓▒░       
               ▀▀▒▀▄███▓▒░░░   ▀▀▄▀▀███▓▒░ ▓███▀▌   ▄▄▓██████▓░█▓▓▒▒▀        
                   ▀██████▓▒░░ ░  ▀▌▐▓███▀▀ ▓█▌▄█ █▓▓████████▓▓▄▀▀           
             ▄        ▀▀███▓▓▓▒░░░ ▀▄▐▓█▄█▀█▄██▄█ ▓████████▓▓▓▀  ▄           
            ▐  ▄▒▄ ▀    ▄ ▀▀▀█▓▓▓░░▄▄▀▀▓▓██▀▄███▌░█████▓▓▀▀       ▌          
            █▌  ▀ ▐     ▌   ▄  ▄▄█▓▓▓▒░   ▀▀▀▀▀▄▄▀▀▀▀    ▌▄░▄    ▐█          
   ▄        ▐█▄▄   ▀▄▄▄ ▀▄  ▄▓▓▀█▓█▀▀█▓▓▒░░▒▀▀▀▄ ▄▄▀ ▄▄▄▀  ▀  ▄▄██▌        ▄ 
  ▀░▀        ▀█████▄▄░▀█▀▄▓▓▒░▄▓▓▒░██████▓▀ ░░░░▓▄▀█▀▀▄▄▄▄███████▀        ▀░▀
    ▄▄▄  ▄▓▄    ▀▀▀███▀▄▀▒░▄█▀██▀▄████▓▓▀▄░▓▓▒▒▓▓█▓▄▀█████▀▀▀▀▀    ▄▓▄  ▄▄▄  
   █▀ ▀▓  ▀   ▄▄▄███▓▌▐█▀▄████░ █▄▄▓▀▀     ██▓▓██████▐█▀▓█████▄▄▄   ▀  ▓▀ ▀█▌
  ▐▌      ▄▄████▀▀▀▀█ ▀  ▄▀▀▌ ▄███▀         ████▓███▀▌▓███▀▀▀▀▀▀███▄▄      ▐█
   ▀█▄▄▄██▀▀▄▄▄▓▓█▀▀▄▄  ▐██▌ ▌▄▄█▀           ███▌░▓█▐█▐▀░▄▓▓██▓▓▄▄░▀▀██▄  ▄█ 
      ▀   █████▀▄▄█████▄ █▀  ▐██      ░     ▐▓▀▄▌▒█▄▌█▌▐████████████▓░ ▀▀▀▀  
        ██████░▐▓▓████░▀▀▐    █ ░   ░▄████▄░ ███ ▐▀▀▌▄█▐▒█████████████▓      
       ███████▐███▓▓▀▄▄██▄    ▌▐▓   ▐▓▀   ▀▌ ▐▄▄  ▀█▌ ▀▌░▓██████████████     
      ████▀░██████▓▌███████    █▀▄  ▐▌     ░  █▌  ░▐   ▄ ▀▀▓▓████████████    
     ▐██▒▌██████▒▓█▀▀▀▀▀████   █░ ▀▄ ▀▄ ▄▄░   ▐  ░░▌   █▐▒▓▄▄▀▀█████▓████▌   
     ██▒▀▄███▒░█▀ ▄▀░▀▀▓▄ ▀█▌ ▐█▒░ ▐          ░▒▓▓▀    ▐█▓▓█    ████▀████▌   
     ███████▓░█         ░▓▌ █ ▐█▒   ░        ▓▓█▀      ▐▌▓██     ████▄▐███   
     ██████▓░█▌          ░▐ ▐ ▐█▓░       ░ ░▒█▌         ▌██▓▌    ▐████▄▀█▌   
     ▐████▓░▓▀                ██▓░    ░░▒▌░░▓█          ███▓▌    ███████▄    
      ██▓██▒▌▐▌▐        ▄▀    ███▒░  ▄▓▀▀  ░▒█▌         ▀▐███▄▄▄█▀██████▓    
       ██▓█▀▄▓█ ▀░     ▐▄    ▐███▓▒░▓█      ░▓█▄       ▀▀▄▀██████▒▐█████     
        ▀▄▄▓▓▓▓█▄▄▀▀▄▄  ▀█▄▄▄██████▓█▌  ░▒░  ░▒▓█▄      ▐▐▌▒████░▄█████      
          ▀▀▀███████▄▄▄▄▀ ▀▀▓████████▌▀▓▓█▓░  ░▓▓██▄▄   ▄█ ▀▓███▐██▀▀▀       
               ▄▄▄▀▀▀         ▀▀▓▓████ ▐███▓▒░▄█████████▀   ▄▄▄▄             
            ▄█▀     ▀▓▄           ▀▓██▌ ████████▓▀▀▀    ▄▓▀    ▀▀█▄          
           ▐▓▌ ░▄█▀▓▄ █░           ▐█▀  ▐▓██▓▀         ░█ ▄▓▀█▄░ ▐▓▌         
            █░ ▐    ▐▓▐▌        ▄▄▀▀     ▀██▌          ▐▌▓▌   ▐▌ ░█          
             ▀▓▄█▀ ▄▓▄▀                    ▀▀▄▄         ▀▄▓▄ ▀█▄▄▀           
                ▄██▀▀              Game by                ▀▀██▄              
               ▐██▌░            Kenneth Liese              ░▐▓█▌             
                ▓██▄     ▄                           ▄     ▄▓██              
                 ▀▀███▄█▀                             ▀█▄███▀▀               
                 
                     ┏┓   ┓     •  ┓  ┏┓•    ┓  ┓  ┏┓      
                     ┣┫┏┓╋┣┓┏┓┏┓┓┏┓┃  ┃ ┓╋┏┓┏┫┏┓┃  ┗┓┏┓┏┓┏┓
                     ┛┗┗ ┗┛┗┗ ┛ ┗┗┻┗  ┗┛┗┗┗┻┗┻┗ ┗  ┗┛┗┻┗┫┗┻
                                                        ┛  
                 
                  ▄  ▀▄                                 ▄▀  ▄               
                 ▀▓▀  ▓▌         Art Credits           ▐▓  ▀▓▀              
                    ▄█▀    http://www.roysac.com        ▀█▄                 
               ▄▄▀▀▀       https://texteditor.com          ▀▀▀▄▄            
            ▄█▀   ▄        https://ascii-generator.site     ▄   ▀█          
            ▓▌░    ▀▀▄                                   ▄▀▀    ░▐▌         
             ▀▄▄    ░▐▓                                 ▓▌░    ▄▄▀          
                ▀▀  ▄█▀    - this is just my first       ▀█▄  ▀▀            
               ▄▄▄█▀▀       little projekt with js         ▀▀█▄▄▄           
            ▄██▀▀           for my Web-Dev course -           ▀▀██▄         
           ▐▓▌  ░                                             ░  ▐▓▌        
            ▀▄ ░░                                             ░░ ▄▀         
               ░▒                                             ▒░            
               ▒▓                                             ▓▒            
              ▓█▐             * RELEASE NOTES *             ▌█▓             
              ▓█▐                                           ▌█▓             
             ▌██▐  Welcome to the mysterious World of the   ▌██▐            
             ▌██▐         Aetherial Citadel Saga            ▌██▐            
             ▌██▐                                           ▌██▐            
             ▌██▐  Explore the Enigma around the flying     ▌██▐            
             ▌██▐  structures, defend yourself against      ▌██▐            
             ▌██▐  evil foes and unravel YOUR story.        ▌██▐            
             ▌██▐                                           ▌██▐            
             ▌██▐  While playing, have a lookout for        ▌██▐            
             ▌██▐  highlighted text, which may give you     ▌██▐            
             ▌██▐  a little notch on what to do next.       ▌██▐            
     ▄▄▀▀▀▄▄  ██▐  Typos won't bring you far ;)             ▌██  ▄▄▀▀▀▄▄    
    ▐▌     ▀█ ▓█▐                                           ▌█▓ █▀     ▐▌   
     ▀     ▒█▌▓█▐      This is just the DEMO-Version        ▌█▓▐█░     ▀    
          ▄█▀ ▒▓                                             ▓▒ ▀█▄         
       ▄▓█▀   ░▒    ▄                                   ▄    ▒░   ▀█▓▄      
      ▓█▀  ▄▀ ░░ ▄█▀                                     ▀█▄ ░░ ▀▄  ▀█▓     
     ▐██░ ▐▓   ░▐█▌         Try to stay alive..           ▐█▌░   ▓▌ ░██▌    
     ███▓▄ ▀█▄▄  ▀█▄                                     ▄█▀  ▄▄█▀ ▄▓███    
     ▐████▓▄▄ ▀▀▀▄▄ ▀▄                                 ▄▀ ▄▄▀▀▀ ▄▄▓████▌    
      ▓██▀▀▄░  ▄▄  ▀█▄    ▄▄                     ▄▄    ▄█▀  ▄▄  ░▄▀▀██▓     
       ▀ ▄▀ ▄▀▀   ░░▐█▌▄█▀                         ▀█▄▐█▌░░   ▀▀▄ ▀▄ ▀      
        █▓ ▓▌░   ░▄██▀▐█▌  * aScii by ___Z <DFS> *  ▐█▌▀██▄░   ░▐▓ ▓█       
       ▐██░▀█▄   ▀░▓██▄▀█▄                         ▄█▀▄██▓░▀   ▄█▀░██▌      
        ▀██▄▓░▀▀▄▄▄ ░▒▓▓▄▀█▄                     ▄█▀▄▓▓▒░ ▄▄▄▀▀░▓▄██▀       
          ▀█▄▀▓▒░░ ▀█▄░▒▓▓▐█▌                   ▐█▌▓▓▒░▄█▀ ░░▒▓▀▄█▀         
           ▐█▌▐█▓▒░░▐▓▌░▄▄▀▀                     ▀▀▄▄░▐▓▌░░▒▓█▌▐█▌          
            ▀▄▀▀▀ ▄▄█▀                                 ▀█▄▄ ▀▀▀▄▀                                                                                      
`);

const start = rls.question(`                               Enter START `)

const age = rls.question(`\n                Are you even old enough? (input your age) `);

if (isNaN(age) || age < 18) {
    console.log(chalk.redBright(`                       - Go ask your Mommy first -\n`));
    process.exit();
}

console.clear();
console.log(`\nWelcome to - Aetherial Citadel Saga - a small
text-based Adventure, programmed by Kenneth L.\n`);

// charackter selection ------------------------------------------------------------------

const characters = [
    {
        name: "Angelo",
        type: "Paladin",
        health: 120,
        skill: "Divine Punishment",
        skillDmg: 20,
    },
    {
        name: "Scarlet",
        type: "Blackmage",
        health: 80,
        skill: "Flare Star",
        skillDmg: 35,
    },
    {
        name: "Shadow",
        type: "Assassin",
        health: 100,
        skill: "Void Heart",
        skillDmg: 6,
    },
    
    function charInfo() {
        console.log(myChar);
    }
];

let myChar = {};
let accept;

do {   
    console.log(`Which will it be: ${chalk.green('Choose')} a Character,
                  ${chalk.green('Create')} a Character,
                  ${chalk.green('Randomize')}`);

    let check = false;
    let tempInput;

    while(!check){
        tempInput = rls.question().toLowerCase();

// choose a character ------------------------------------------------------------------------
        if (tempInput === "choose" || tempInput === "1") {
            console.log(
                `You can choose one of the following:`,
                chalk.green(`\n        ☆ ${characters[0].name}`), ` the ${characters[0].type}`,
                chalk.green(`\n        ☆ ${characters[1].name}`), ` the ${characters[1].type}`,
                chalk.green(`\n        ☆ ${characters[2].name}`), ` the ${characters[2].type}`
            );
            while(!check){
                tempInput = rls.question().toLowerCase();
                if (tempInput === "angelo" || tempInput === "1"){
                    myChar = characters[0];
                    console.log(chalk.gray(`                        Image not loading..`));
                    console.log(`
                        ${chalk.yellow(myChar.name)} is an honorable ${chalk.yellow(myChar.type)} with ${chalk.yellow(myChar.health)} healthpoints,
                        his ${chalk.yellow(myChar.skill)} strikes with ${chalk.yellow(myChar.skillDmg)} damage and 
                        has a chance to interrupt the enemys next move\n`);
                    check = true;
                } else if (tempInput === "scarlet" || tempInput === "2"){
                    myChar = characters[1];
                    console.log(`
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░▒██████████████████▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████████████████▓▓▓▓▓▓█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░███████████████▓▓▓▓▓▓▓▓▓▓█▓░▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░▓█████████████████▓▓▓▓▓▓▓▓▓███▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░█████████████████▓▓▓▓▓▓▓▓▓▓▓██▓▓░░▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░░██████████████████▓▓▓▓▓▓▓▓▓▓▓██▓▓░█▒░░░░░░░░░░░░░░░░░░░░░▒▓███▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░▒████████████████████▓▓▓▓▓▓▓▓▓▓█▓▓██▓▒░░░░░░░░░░░░░░░▒▒▓███████▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░▓█████████████████▓▓▓▓▒▒▒▒░░▒▒▒▒▒▓▓██▓░░░░░░░░░░▒▒▓███████████▓▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░░░▓███▓███████████▓█▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓██▓░░▒▒▒▓▓████████████████░▓
                        ░░░░░░░░░░░░░░░░░░░░░░░░█░████▓███████████▓▓▓█▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▓▓████████████████████████▓░▓
                        ░░░░░░░░░░░░░░░░░░░░░░▒▓███████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓███████████████████████░░▓
                        ░░░░░░░░░░░░░░░░░░▒▓█████████████████████████████▓▓▓▓▓▓▓▓▓██▓▓▓▓▓█████████████████████░░░▓
                        ░░░░░░░░░░░░░░░░░████▓░██████████████████████████████████▓▓▒▒▒▒▓▓▓▓██████████████████▒░░░▓
                        ░░░░░░░░░░░░░░░░▒████▒▒████▓████▓████████████████████▓▓▒▒▒▒▒▒▒▒▓▓▒▒▓▓███████████████░░░░░▓
                        ░░░░░░░░░░░░░░░░▒██████████▓████▓▓▓▓█████████████▓▓▓▒▒▒▒▒▒▒▒▒░░░░░░░▒▓████████████▓░░░░░░▓
                        ░░░░░░░░░░░░░░░░░▒████████████████▓▓█████████▓▓▒▒▒▓▒▒▒▒▒░░░░░░░░░░░░░░▓██████████▒░░░░░░░▓
                        ░░░░░░░░░░░░░░░░░░░▓█████████████████████▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░▓███████▓░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░▒▓██████████████████▓▓▓▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░█████▓░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░▒▓█████████████████▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▒█▓▒░░░░░░░░░░░░░▓
                        ░░░░░░░░░▒▓█████████████████▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░▒▓███████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░░░░░▒░░░░░░░░░░░░░░░░░░░▓
                        ░░░░▓██████████▓▒▓▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▓░░░░░░░░░░░░▓▓▒▒▓▓▓▒▒▒░░░░░░▒▒▒▒▒░░░░░░░░░░░░░░░░░░░▓
                        ░░▓█████████████▓▒░░░░░▒▒▒░░▒▓▒▒▓▒▒▒▒░░░░░░░░░░░░░░░░▒▒░░░░░░░░▒▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░▓
                        ░░▒▒▒▒▒▒▒▒▒▒▒░░▒▓▓▓▓▒▒▒░░░░░░░░▒▒▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▒█▓▓░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░▒▒▒▒░▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▒░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▒░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░▒░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▒░▒░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░▒░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓██▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▒░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░▒▒▒▒▒░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░▒▒▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░▒▓▒░░░░░░░░░░░░░░░░░▒▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░▒▓▓░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░▒▓▒░▓▓▒░░░░░░░░░░░░▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░▒▒░░▒▓▓░▒▓▓▓▓▓▓▓▓▒▓▓███▓▒▒▒░░▒▓▓░▒▓▓▓▓▓▓▒▒░░░░▒▓▓▓▒▓▒░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░░░░░░░░▒▒▒▒▒▓▓▒▓▓▓▓▒▓▒▓█████▓▓▒░░▓██▒▒▓▓▓▓██▓▓▓▓▓▓▓▒▓░▒▓▒░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░░░░▒▒▓██████████████████▓███████▓▒░▒████▓▓█████▓░░░▒░░▒░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░░▓████████████████████████████████▒░░██████████████▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░██████████████████████████████████▓▒░████████████████████▓▓░░░░░░░░░░░░░░░░░░░░░░░░░▓
                        ░░░░░███████████████████████████████████▓▒▒████████████████████████▓▒▒░░░░░░░░░░░░░░░░░░░▓
                        ░░░░▓██████████████████████████████████████▓███████████████████████████▓▒░░░░░░░░░░░░░░░░▓
                        ░░░░█████████████████████████████████████████████████████████████████████░░░░░░░░░░░░░░░░▓
                        ░░▒█████████████▓▓▓▓█████████████████████████████████████████████████████░░░░░░░░░░░░░░░░▓
                        ▒████████████▓▓▓▓▓▓▓▒▒▒▒▒▓▓█████████████████████████████████████████████▓▒░░░░░░░░░░░░░░░▓
                        ████████████▓▓▓▓▒▒▒▒░░░░░▒▒▒▒▓▓█████████████████████████▓▒▓█████████████▓▓▓▓▒░░░░░░░░░░░░▓
                        ███████████▓▓▓▓▓▒▒▒░░░░░░▒▒▒▒▒▒▒▓▓▓▓█████▓████████████████▒▓▓██████████▓▓▓▓▓▓▓▒░░░░░░░░░░▓
                        ████████████▓▓▓▓▓▒▒░░░▒▒▒▒▒▒▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████████▓▓▓▓██████▓▓▓▓▓▓▓▓▓█▓▒░░░░░░░░▓
                        `);
                    console.log(`
                        ${chalk.yellow(myChar.name)} is a bewitching ${chalk.yellow(myChar.type)} with ${chalk.yellow(myChar.health)} healthpoints, her ${chalk.yellow(myChar.skill)} explodes with ${chalk.yellow(myChar.skillDmg)} 
                        damage and has a rare chance to elimate enemys instantly. Born under the waning moon, 
                        her arcane mastery whispers of ancient secrets.\n`);
                    check = true;
                } else if(tempInput === "shadow" || tempInput === "3"){
                    myChar = characters[2];
                    console.log(chalk.gray(`                        Image not loading..`));
                    console.log(`
                        ${chalk.yellow(myChar.name)} is an elusive ${chalk.yellow(myChar.type)} with ${chalk.yellow(myChar.health)} healthpoints,
                        his ${chalk.yellow(myChar.skill)} hits up to 6 times with ${chalk.yellow(myChar.skillDmg)} damage each and 
                        has a chance to inflict poison\n`);
                    check = true;
                } else {
                    console.log(chalk.redBright(chalk.redBright("wrong input")));
                }
            }

// create a character ------------------------------------------------------------------------
        } else if (tempInput === "create" || tempInput === "2"){
            let create = {};
            create.name = defaultAndCasing(rls.question("What is your name: "), "John Wick");
            create.type = defaultAndCasing(rls.question("What is your profession: "), "Baba Yaga");
            create.health = defaultForNumber(rls.question("How much health do you have: "), 200);   
            create.skill = defaultAndCasing(rls.question("How is your skill called: "), "Headshot DoubleTap");
            create.skillDmg = defaultForNumber(rls.question("And how much damage does it: "), 9999);

            myChar = create;
            console.log(myChar);
            check = true;

// randomize a character ---------------------------------------------------------------------
        } else if ((tempInput === "randomize" || tempInput === "rando" || tempInput === "3")){
            const nameArr = ["Super Mario","Link","Master Chief","Lara Croft","Kratos","Geralt of Rivia","Solid Snake","Samus Aran","Cloud Strife","Chris Redfield","Aloy","Ellie","Joel","Sonic the Hedgehog","Nathan Drake","Bayonetta","Gordon Freeman","Jill Valentine","Ryu","Chun-Li"];
            const typeArr = ["Warrior","Mage","Rogue","Cleric","Paladin","Ranger","Bard","Druid","Monk","Sorcerer","Necromancer","Barbarian","Assassin","Shaman","Warlock","Hunter","Priest","Knight","Alchemist","Samurai"];
            const skillArr = ["Fireball","Lightning Strike","Sword Slash","Arrow Shot","Backstab","Whirlwind Attack","Ice Spike","Poison Dart","Meteor Shower","Shadow Strike","Dragon Breath","Blade Dance","Thunder Clap","Holy Smite","Bloodthirst","Earthquake","Death Grip","Wind Slash","Chain Lightning","Explosive Arrow"];
            
            function randomizeChar() {
                let rando = {}; 
                rando.name = nameArr[Math.floor(Math.random() * nameArr.length)];
                rando.type = typeArr[Math.floor(Math.random() * typeArr.length)];
                rando.health = Math.floor(Math.random() * 101) + 50;
                rando.skill = skillArr[Math.floor(Math.random() * skillArr.length)];
                rando.skillDmg = Math.floor(Math.random() * 51);

                return rando; 
            }
            myChar = randomizeChar();
            console.log(myChar);
            check = true;
        } else {
            console.log(chalk.redBright("Try again"));
        }
    }

// ready or not --------------------------------------------------------------------------
    
    while (true) {
        accept = rls.question(`Wanna play with ${myChar.name}? (${chalk.green("y")}/${chalk.green("n")}) `).toLowerCase();

        if (accept === 'y' || accept === 'n') {
            break;
        } else {
            console.log(chalk.redBright("Wrong input"));
        }
    }
    if (accept === "n"){
        console.clear();
        console.log(`Let's start over\n`);
    } 
} while ( accept !== "y")

console.log(`\nLet's start your journey with ${chalk.blueBright(myChar.name)}!`);

// gameplay ------------------------------------------------------------------------------

function gameOver() {
    console.clear();
    console.log(chalk.red(`
          .                                                      .
        .n                   .                 .                  n.
  .   .dP                  dP                   9b                 9b.    .
 4    qXb         .       dX                     Xb       .        dXp     t
dX.    9Xb      .dXb    __                         __    dXb.     dXP     .Xb
9XXb._       _.dXXXXb dXXXXbo.                 .odXXXXb dXXXXb._       _.dXXP
 9XXXXXXXXXXXXXXXXXXXVXXXXXXXXOo.           .oOXXXXXXXXVXXXXXXXXXXXXXXXXXXXP
  '9XXXXXXXXXXXXXXXXXXXXX'~   ~'OOO8b   d8OOO'~   ~'XXXXXXXXXXXXXXXXXXXXXP'
   '9XXXXXXXXXXXP' '9XX'          '98v8P'          'XXP' '9XXXXXXXXXXXP'
       ~~~~~~~       9X.          .db|db.          .XP       ~~~~~~~
                       )b.  .dbo.dP''v''9b.odb.  .dX(
                      ,dXXXXXXXXXXXb     dXXXXXXXXXXXb.
                     dXXXXXXXXXXXP'   .   '9XXXXXXXXXXXb
                    dXXXXXXXXXXXXb   d|b   dXXXXXXXXXXXXb
        ..YOU       9XXb'   'XXXXXb.dX|Xb.dXXXXX'   'dXXP      DIED..
                     ''      9XXXXXX(   )XXXXXXP      ''
                              XXXX X.'v'.X XXXX
                              XP^X''b   d''X^XX
                              X. 9  '   '  P )X
                              'b  '       '  d'
                               '             '`));
    console.log("             ",chalk.bgRed(" "),chalk.bgRed("  "),chalk.bold.bgRed.black(
    `               Game Over               `),chalk.bgRed("  "),chalk.bgRed(" \n"));
    tap = rls.question();
    process.exit();
}

let tap;

tap = rls.question();
console.clear();
tap = rls.question();
console.log(`. . . `);
tap = rls.question();
console.log(`. . .    . . .    . . .`);
tap = rls.question();
console.log(`. . .    . . .    . . .    . . .    . . hm?`);
tap = rls.question();
console.log(`Where am I ..?`);
tap = rls.question();
console.log(chalk.gray(`        You slowly regain consciousness, a dull ache throbbing in your skull.
        As your eyes flutter open, you find yourself in a dank, stone-walled cell.
        The air is heavy with the scent of mildew, and a persistent drip echoes 
        somewhere in the darkness. A small crack in the ceiling allows just enough
        light to filter through, casting faint, ghostly shadows on the rough walls.`));
tap = rls.question();
console.log(`Am I trapped? ..need to find a way out!`);
tap = rls.question();
console.log(chalk.gray(`        Taking a moment to steady yourself, you decide that ${chalk.green("look")}ing around
        is the best way to find a way out of this place. With the dim light as your guide,
        you slowly rise to your feet.\n`));
tap = rls.question();

// exploration ------------------------------------------------------------------------------

let looking = "";
let found = false;
while (!found){
    looking = rls.question(chalk.yellow(`What will you do? `)).toLowerCase();
    if (looking === "look"){
            console.log(chalk.gray(`\n        look at what?`));
            tap = rls.question();
    };
    if (looking.includes("look") && (looking.includes("wall") || looking.includes("around"))){
            console.log(chalk.gray(`\n        There are four walls to look at: ${chalk.green("left")}, ${chalk.green("right")} ${chalk.green("front")} and ${chalk.green("rear")}.`));
            tap = rls.question();
    }
    if (looking.includes("left")){
            console.log(chalk.gray(`\n        Nothing, ..just a wall.`));
            tap = rls.question();
    }
    if (looking.includes("right")){
            console.log(chalk.gray(`\n        You can see a ${chalk.green("hole")} right in the middle of the Wall.`));
            tap = rls.question();
    }
    if (looking.includes("front")){
            console.log(chalk.gray(`\n        The wall is overgrown with moss, but otherwise nothing to find.`));
            tap = rls.question();
    }
    if (looking.includes("rear") || looking.includes("behind")){
            console.log(chalk.gray(`\n        Something shimmers right back at you. Some kind of ${chalk.green("tablet?")}`));
            tap = rls.question();
    }
    if (looking.includes("look") && looking.includes("hole")){
            console.log(chalk.gray(`\n        It seems you would barely fit through.`));
            let enter = rls.question(chalk.yellow(`        Enter? (${chalk.green("y")}/${chalk.green("n")}) `));
            if (enter === "y"){
                    let sure = rls.question(chalk.yellow(`\n        Are you sure? (${chalk.green("y")}/${chalk.green("n")}) `));
                    if (sure === "y") {
                            console.log(chalk.gray(`\n        You squeeze into the narrow hole and crawl forward. Something growls inside, and it's not your stomach.
        Suddenly, you see two red eyes reflecting in the darkness ahead, and before you realize what's happening,
        ..it's all over for you.`));
                    tap = rls.question();
                            gameOver();
                    } else {
                            console.log((`\nYeah.. better not.\n`));
                    };
            } else {
                    console.log(chalk.gray(`\n        You decide against the idea.\n`));
            }
    }
    if (looking.includes("nothing")) gameOver();
    
    if(looking.includes("look") && looking.includes("tablet") || looking === "lol") found = true; 
}

console.log(chalk.gray(`\n        You approach the rear wall and notice a stone tablet embedded in it.
        Several symbols are arranged in a circle around an inscription.
        On closer inspection the symbols actually are numbers.`));
tap = rls.question();

// puzzle ------------------------------------------------------------------------------------

let press = "";
let solution = false;

while(!solution){
    console.clear(); // 26 18 60 56 97 76 = 333
    console.log(chalk.blueBright(`
            26 18 60 56 44
            67          28
            29          35
            97          76
            52 91 49 85 41`
    ));
    console.log(chalk.gray(`\n        The inscription reads: 
        "When the ${chalk.green("three")} moons reach their zenith and the ${chalk.green("three")} citadels
        break the horizon, the ${chalk.green("three")} gods will be reborn in the night sky."`));
    press = rls.question(chalk.yellow(`\nlooks like you can press the numbers. `)).toLowerCase();

    function solving(string) {
            return string.split(" ").map(element => Number(element) ).reduce((acc,cv) => acc + cv,0);
    }
    let result = solving(press);
    if (result === 333) solution = true;
}

console.log("\n. . .");
tap = rls.question();
console.log(chalk.gray(`        After a brief moment of silence, a mechanical sound emanates from somewhere,
        followed by the wall next to the tablet opening. You believe you have made the right choice.`));
tap = rls.question();
console.log(chalk.gray(`        You squeeze through the now exposed but narrow corridors until daylight
        briefly blinds you as you reach the exit. Pausing at the threshold, you take a moment to reflect.`));
tap = rls.question();
console.log("What happend, why can't I remember?");
tap = rls.question();
console.log("Who am I again..?");
tap = rls.question();
console.log(". . .");
tap = rls.question();
console.log(`I'm ${myChar.name}`);
tap = rls.question();
console.log(`${myChar.type} is my profession, right! ..at least that much I know.`);
tap = rls.question();
console.log(chalk.gray(`        You push yourself from the wall and look ahead.
        Before you stretches a sparse yet lush green forest, with a barely discernible path
        extending from the ruin you came from deeper into the woods.`));
tap = rls.question();
console.log("I need to press on, ..figure out where I am and why!");
tap = rls.question();
console.log(chalk.gray(`        As you continue forward, minutes turn into hours,
        with the sun nearing the horizon when suddenly you hear a noise in the bushes ahead of you.`));
tap = rls.question();

// battle ------------------------------------------------------------------------------------

console.clear();
console.log(`
    ░        ░░   ░░░  ░░░      ░░░░      ░░░  ░░░░  ░░   ░░░  ░░        ░░        ░░       ░░
    ▒  ▒▒▒▒▒▒▒▒    ▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒    ▒▒  ▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒
    ▓      ▓▓▓▓  ▓  ▓  ▓▓  ▓▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓  ▓▓  ▓  ▓  ▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓       ▓▓
    █  ████████  ██    ██  ████  ██  ████  ██  ████  ██  ██    █████  █████  ████████  ███  ██
    █        ██  ███   ███      ████      ████      ███  ███   █████  █████        ██  ████  █
`);

const enemyNames = ["Dragon", "Unicorn", "Phoenix", "Werewolf", "Griffin", "Mermaid", "Centaur", "Basilisk", "Sphinx", "Yeti",
    "Kelpie", "Chimera", "Minotaur", "Pegasus", "Fairy", "Goblin", "Ogre", "Satyr", "Hydra", "Cerberus","Grim Reaper",
    "Nightmare", "Shiny Fox", "Dark Sorcerer", "Hellhound", "Specter", "Gargoyle", "Wraith", "Demon Lord", "Eldritch Horror",
    "Vampire Lord", "Death Knight", "Shade", "Infernal Dragon", "Lich King", "Abomination", "Behemoth", "Orc Warlord",
    "Necromancer", "Chimera"];
const enemySkills = ["Toxic Cloud", "Chaos Bolt", "Frost Nova", "Hypnosis", "Bone Spear", "Blinding Light", "Lava Burst",
    "Cursed Flame", "Meteor Shower", "Venomous Fangs", "Shadow Bolt", "Thunderstorm", "Spectral Screech", "Mind Blast",
    "Poisonous Breath", "Sword Slash", "Dark Pulse", "Astral Beam", "Venomous Strike", "Psychic Wave","Bite", "Claw Slash",
    "Fireball", "Ice Beam", "Thunderbolt", "Poison Sting", "Shadow Strike", "Psychic Blast", "Earthquake", "Tornado",
    "Venomous Spit", "Dark Energy Blast", "Sonic Boom", "Mind Control", "Acid Spray", "Energy Drain", "Freezing Touch",
    "Death Ray", "Teleport Slam", "Soul Siphon"];
function randomizeEnemy() {
    let rando = {}; 
    rando.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    rando.health = Math.floor(Math.random() * 101);
    rando.skill = enemySkills[Math.floor(Math.random() * enemySkills.length)];
    rando.skillDmg = Math.floor(Math.random() * 51);

    return rando; 
}
function enemyEncounter() {
    return `        ${chalk.red(enemy.name)} ${chalk.gray("ambushes you!")}`
}

let defend = false;
let enemy = randomizeEnemy();

console.log(enemyEncounter());
tap = rls.question();

function battle() {
    console.log(chalk.gray(`        You take a deep breath and switch to your battle stance!`));
    tap = rls.question();
    while (enemy.health > 0 && myChar.health > 0){
            console.clear();
            console.log(`
    ⣿⣿⡇⠸⣿⣿⣿⣿⡄⠈⢿⣿⣿⡇⢸⣿⡀⣿⣿⡿⠸⡇⣸⣿⣿⠄⣿⣿                            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⡿⠷⠄⠿⠿⠿⠟⠓⠰⠘⠿⣿⣿⡈⣿⡇⢹⡟⠰⠦⠁⠈⠉⠋⠄⠻⢿                            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⣭⣤⡤⠌⡛⢿⣿⣿⣿⣿
    ⡑⠶⡏⠛⠐⠋⠓⠲⠶⣭⣤⣴⣦⣭⣥⣮⣾⣬⣴⡮⠝⠒⠂⠂⠘⠉⠿⠖                            ⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠛⣿⣿⣿⣿⣿⠏⠄⢀⣤⣀⠈⠄⠈⠊⢻⣿⣿⣿
    ⠉⠄⡀⠄⣀⣀⣀⣀⠈⢛⣿⣿⣿⣿⣿⣿⣿⣿⣟⠁⣀⣤⣤⣠⡀⠄⡀⠈                            ⣿⣿⣿⣿⣿⣿⣿⠟⠄⠄⠄⡡⢣⣽⣿⣿⠏⢀⠠⠐⢻⡿⢳⡄⠄⠄⢸⣿⣿⣿
    ⠠⣾⡀⣾⣿⣧⣼⣿⡿⢠⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣧⣼⣿⣿⢀⣿⡇                            ⣿⣿⣿⡿⠿⠋⢉⠄⠄⠄⢃⡙⣾⣿⣿⠏⠄⢷⣤⣤⣿⡇⠈⢇⠄⠄⣾⣿⣿⣿
    ⠄⠻⣷⡘⢿⣿⣿⡿⢣⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⢿⣿⣿⡿⢃⣾⠟⢁           🅥🅔🅡🅢🅤🅢           ⠛⠉⢁⠄⢠⡄⠈⢄⣰⡖⠒⢾⣿⣿⣿⠄⢠⠄⢨⣷⣬⣿⣶⡾⠂⢠⣿⣿⣿⣿
    ⢻⣶⣬⣿⣶⣬⣥⣶⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣷⣾⣾                            ⠄⠄⢸⡀⢸⡇⢀⡄⢻⡇⠄⢸⣿⣿⠟⠄⢸⠄⠃⠄⢸⣿⠏⠄⡆⢸⣿⣿⣿⣿
    ⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿                            ⠄⠄⢸⡀⢸⡇⢀⡄⢻⡇⠄⢸⣿⣿⠟⠄⢸⠄⠃⠄⢸⣿⠏⠄⡆⢸⣿⣿⣿⣿
    ⡐⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢠                            ⠄⡇⢸⠄⢸⣧⡌⠠⠜⣇⠄⢻⠄⠄⠄⠄⠐⣇⣀⡜⠁⠄⠴⢫⠄⣨⡛⠿⣿⣿
    ⣷⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢀⠆                            ⣴⡇⠘⠄⢸⣿⣇⡀⡇⢻⣄⡸⡆⠄⠄⠄⠄⠄⠁⠄⠄⠄⠄⠸⠄⠃⡄⠄⠄⠙
    ⣿⣷⡀⠄⠈⠛⢿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⠿⠋⠠⠂⢀⣾                            ⡆⠄⠄⠄⢠⡄⢠⡄⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠁⠄⠄⠄⠄⠸⠄⠃⡄⠄⠄⠙
            ${chalk.blueBright(`${myChar.name} ${myChar.health} HP`)}                                          ${chalk.red(`${enemy.name} ${enemy.health} HP`)}`);

            const action = rls.question(chalk.yellow(`\nWill you Attack or Defend? `)).toLowerCase();
            defend = false;

            if (action === "attack" || action === "1"){
                    console.log(chalk.gray(`\n        You use ${chalk.blueBright(myChar.skill)} to inflict ${chalk.blueBright(myChar.skillDmg)} damage to ${chalk.red(enemy.name)}`));
                    enemy.health -= myChar.skillDmg; 
                    tap = rls.question();
            } else if (action === "defend" || action === "2"){
                    console.log(chalk.gray(`\n        You are getting into a defensive stance, ready for impact!`));
                    tap = rls.question();
                    defend = true
            }
            if (enemy.health > 0) {
                    console.log(chalk.gray(`        ${chalk.red(enemy.name)} tries to hit you with ${chalk.red(enemy.skill)}`));
                     tap = rls.question();

                    let hitOrMiss = Math.random() >= 0.5;
                    if (hitOrMiss){
                            if (defend){
                                    console.log(chalk.gray(`        You ${chalk.blueBright("Block")} half of the damage.`));
                                    tap = rls.question();
                                    myChar.health -= enemy.skillDmg/2
            
                            } else {
                                    console.log(chalk.gray(`        You took ${chalk.red(enemy.skillDmg)} damage.`));
                                    tap = rls.question();
                                    myChar.health -= enemy.skillDmg
                            }
                    } else {
                            console.log(chalk.gray(`        But it misses.`));
                            tap = rls.question();
                    }
            }
            
    }
    if (enemy.health <= 0){
            console.log(chalk.gray(`        As your final blow lands, the ${chalk.red(enemy.name)} collapses in defeat.
                    You have survived the encounter and proceed forward.`));
    } else {
            console.log(chalk.gray(`        You faint...`));
            tap = rls.question();
            gameOver();
    }

}

battle();
tap = rls.question();
console.clear();
tap = rls.question();
console.log(chalk.gray(`        As you proceed, you come across a natural water source.
        The water is crystal clear and shimmers with a soothing blue hue.`));
tap = rls.question();
const drink = rls.question(chalk.yellow(`Will you try and drink from the well? (${chalk.green("y")}/${chalk.green("n")}) `)).toLowerCase();
if (drink === "y"){
    console.log(chalk.gray(`\n        You take a sip and feel remarkably refreshed, regaining ${chalk.blueBright("50")} health points.`));
    tap = rls.question();
    myChar.health += 50;
    console.log((`Yum! ..that felt good.`));
} else {
    console.log(chalk.gray(`\n        You don't trust it and decide to leave it be.`));
}
tap = rls.question();
console.log(chalk.gray(`        After a while in the forest, it looks like an end is in sight.
        However, it also seems as if the path ahead abruptly stops.`));
tap = rls.question();
console.log((`Is that a cliff!?`));
tap = rls.question();
console.log((`Don't tell me I'm on some kind of mountain..`));
tap = rls.question();
console.log(chalk.gray(`        As you stand at the edge of the cliff, you witness a shocking revelation.`));
tap = rls.question();
console.log((`. . .`));
tap = rls.question();
console.log((`. . . What the hell!?`));
tap = rls.question();
console.log(chalk.gray(`        You realize that beneath you is nothing but air..
        ..you are actually on a flying island. In the distance, you can see more floating landmasses,
        and on one of them, there appears to be something.. `));
tap = rls.question();
console.log(chalk.gray(`        resembling..`));
tap = rls.question();
console.log(chalk.gray(`        a huge ${chalk.blueBright("CITADEL")}!`));
tap = rls.question();
console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒▓▓▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▒▓▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▒▒░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▒▒▒▒▒▓▓▓▓▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒░░▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▓▓▓▓▓▓▓▓▒░░░░░░▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▓▓▓▓▓▓▓▓▒▒░░░░░▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒░▒▓▓▓▓▓▓▓▒▒░░░░░▒▒▒▒▒▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▒▒▓▓▓█▓▓▓▒░░░░░▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▒▒▒▒▓▓▓▒▒▒▓▒▒▒▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓█▓▓▓▒░░░░▓▒▒▒▒▒▒▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓█▓▓▓▒░▒░▒▓▓░░░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▒▓▓▓▓▓▓▓▒░░░▒▓▓░▒░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░░▒░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▒▓▒▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▒░▓▒░░▒▒▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▒░░▒▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓░▒▒▓▓▓▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▓▓▒▓▒▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒░░░▓▓▒░▒▓▓▒░░▒▒░▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░░▒▓▓▓▓▓▓▒▒▒▒▒░░▒▒▒▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▓▓▓▓▓▓▒▒▒░░░░░▒▒▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒▓▓▓▓▓▒▒▓▒▒▓▓▒▓▓▓▓▓██▓█▓▓░░▓█▓▓▓▓▓▒▓▒░▒░▒░▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓█▒░▒█▓▓▓▓▓▓█▒▒█▓▓▒▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒░▒█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▒▓▓█▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██▓████████████████████████████▓█▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████████████████████████████████████████████████▓████▓▓▓▓██▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓████████████████████████████████████████████▓█████████████▓▓▓▓██▓████▓▓▓▓█▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓█████████████████████████████████████████████████▓█████▓██▓▓█▓█████▓▓▓▓▓▓▓▓▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓███▓█████████████████████████▓████████▓████▓▓████▓▓█▓▓▓█▓▓███▓▓▓▓▓▓▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓██████████████████████████████████▓▓████▓▒▓▓▓▓█▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▒▒▓▓▓▓▓███████████████████████████████▓████▓▒▓█▓▒▓▓▓▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▓▓▓▓████████████████▓███████████▓▓███▓▒▓██▒▒▓▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓█████████████▓████▓▓████▓▓██▓▓▓▒▓█▓▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓██████████▓████▓████▒██▓▓▓▒▒▓▓▓▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓▓▓▓█████████████▓███▓▓██▓▓▒▒▓▒▒░░░░░░░░░░▒░░░░░▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▓▓▓███▓██████▓▓█▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
░░░░░░░░▒▓▓▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░▒▒▓▓▓█▓██▓█▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒░░░░▒▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░▒▒▒▒▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒░░░░░░░░░░░░░░░
░░░▒▓▒▒▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░▒░▒▒▒░░▒▒▒▒▒░░░░░░░
░░▒▓▓▒▓▓▓▓▓▓▓▓▓░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░
░░▒▓▒▒▓▓▓▓▓▓▓▓▓▒▒▓▒▒░░░░▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▓▒▒▒▒▓▒▒▒▒▒
▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░▒▓▓▓▓▒░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░▒▓▓▓░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▒▒░▒▒░░▒▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▓▒▒▒▓▓
▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░▒▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░▒▒▒▒▒░░░░░░░░▒▒▒▒▒▓▓░░░░░▒░░░▒▒░▒░▒▒▒░░░░░░▒▒▒▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▓▓▓
▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▓▓▓▓▓▓▓▓▒▒▒░░░▒▒░░░░░▒░▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▓▒░▒▒▒▒▒▒░░░░░▒░▒▒▒▒░▒▒▒▒▒▒▒▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒▒▒▒▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓
▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒░░▒▒▒░░░░▒▒▒▒▒▒▒▒▓▓▓▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▒▓▒▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▓▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓█████▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓██▓▒██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`);
tap = rls.question();
console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒▓▓▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█████
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▒▓▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▒▒░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▒▒▒▒▒▓▓▓▓▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒░░▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▓▓▓▓▓▓▓▓▒░░░░░░▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▓▓▓▓▓▓▓▓▒▒░░░░░▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒░▒▓▓▓▓▓▓▓▒▒░░░░░▒▒▒▒▒▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▒▒▓▓▓█▓▓▓▒░░░░░▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▒▒▒▒▓▓▓▒▒▒▓▒▒▒▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓█▓▓▓▒░░░░▓▒▒▒▒▒▒▒▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓█▓▓▓▒░▒░▒▓▓░░░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▒▓▓▓▓▓▓▓▒░░░▒▓▓░▒░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░░▒░▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▒▓▒▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▒░▓▒░░▒▒▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▒░░▒▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓░▒▒▓▓▓▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▓▓▒▓▒▓▓▓▓▓▓▓▓▓▓▓▒▓▓▒░░░▓▓▒░▒▓▓▒░░▒▒░▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░░▒▓▓▓▓▓▓▒▒▒▒▒░░▒▒▒▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▓▓▓▓▓▓▒▒▒░░░░░▒▒▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒▓▓▓▓▓▒▒▓▒▒▓▓▒▓▓▓▓▓██▓█▓▓░░▓█▓▓▓▓▓▒▓▒░▒░▒░▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓█▒░▒█▓▓▓▓▓▓█▒▒█▓▓▒▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒░▒█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▒▓▓█▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██▓████████████████████████████▓█▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████████████████████████████████████████████████▓████▓▓▓▓██▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓████████████████████████████████████████████▓█████████████▓▓▓▓██▓████▓▓▓▓█▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓█████████████████████████████████████████████████▓█████▓██▓▓█▓█████▓▓▓▓▓▓▓▓▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓███▓█████████████████████████▓████████▓████▓▓████▓▓█▓▓▓█▓▓███▓▓▓▓▓▓▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓██████████████████████████████████▓▓████▓▒▓▓▓▓█▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▒▒▓▓▓▓▓███████████████████████████████▓████▓▒▓█▓▒▓▓▓▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▓▓▓▓████████████████▓███████████▓▓███▓▒▓██▒▒▓▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒██▀░█▄ █░█▀▄  ░▄▀▄▒█▀  ░█▀▄▒██▀░█▄▒▄█░▄▀▄   ▒   ░▀█▀░█▄█▒▄▀▄░█▄ █ █▄▀░▄▀▀  ▒█▀░▄▀▄▒█▀▄  ▒█▀▄░█▒ ▒▄▀▄░▀▄▀░█░█▄ █ ▄▀▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒░█▄▄░█▒▀█▒█▄▀▒░░▀▄▀░█▀▒░▒█▄▀░█▄▄░█▒▀▒█░▀▄▀▒░░▀▀▒░ ▒█▒▒█▒█░█▀█░█▒▀█░█▒█▒▄██▒░░█▀░▀▄▀░█▀▄▒░░█▀▒▒█▄▄░█▀█░▒█▒░█░█▒▀█░▀▄█▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▓▓▓▓█████████████▓███▓▓██▓▓▒▒▓▒▒░░░░░░░░░░▒░░░░░▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▓▓▓███▓██████▓▓█▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
░░░░░░░░▒▓▓▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░▒▒▓▓▓█▓██▓█▓▓▓▓▓▓▓▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒░░░░▒▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░▒▒▒▒▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒░░░░░░░░░░░░░░░
░░░▒▓▒▒▓▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▒▒▒░░░░░░░░░░░░░░░░░░░░░░▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░▒░▒▒▒░░▒▒▒▒▒░░░░░░░
░░▒▓▓▒▓▓▓▓▓▓▓▓▓░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░
░░▒▓▒▒▓▓▓▓▓▓▓▓▓▒▒▓▒▒░░░░▒▒▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▓▒▒▒▒▓▒▒▒▒▒
▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒░░▒▓▓▓▓▒░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░▒▓▓▓░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▒▒░▒▒░░▒▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▓▒▒▒▓▓
▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▒░▒▓▓▓▓▓▓▒▒▒░░░░░░░░░░░░░░▒▒▒▒▒░░░░░░░░▒▒▒▒▒▓▓░░░░░▒░░░▒▒░▒░▒▒▒░░░░░░▒▒▒▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▒▒▓▓▓
▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▓▓▓▓▓▓▓▓▒▒▒░░░▒▒░░░░░▒░▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▓▒░▒▒▒▒▒▒░░░░░▒░▒▒▒▒░▒▒▒▒▒▒▒▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒▒▒▒▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓
▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▒░░▒▒▒░░░░▒▒▒▒▒▒▒▒▓▓▓▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▒▓▒▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▓▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓█████▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓██▓▒██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`);
tap = rls.question();
console.clear();
console.log(`
        ⣿⣿⣿⣿⣿⣿⡿⣛⣭⣭⣛⢿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣫⣭⣭⡻⣿⣿⣿⣿⣿
        ⣿⣿⣿⣿⡿⢫⣾⣿⠿⢿⣛⣓⣪⣭⣭⣭⣭⣭⣭⣕⣛⡿⢿⣿⣿⣎⢿⣿⣿⣿
        ⣿⣿⣿⡿⣱⢟⣫⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣮⣙⢿⡎⣿⣿⣿
        ⣿⣿⣿⢑⣵⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣷⣌⢸⣿⣿
        ⣿⣿⢣⣿⠟⠁⠄⠄⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠄⠄⠙⣿⣧⢻⣿
        ⣿⢧⣿⡏⠄⠄⠄⠄⣸⣿⣿⡟⣛⣛⣫⣬⣛⣛⢫⣿⣿⡇⠄⠄⠄⠄⣿⣿⡇⣿
        ⣿⢸⣿⣧⡀⠄⠄⣰⣿⣿⣿⣧⢻⣿⣿⣿⣿⣿⢣⣿⣿⣿⣄⡀⠄⣠⣿⣿⣿⢹
        ⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡜⣿⣿⣿⣿⡟⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸
        ⣿⡸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣭⣉⣭⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⣿
        ⣿⣧⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣼⣿`);
console.log(chalk.blue(`\n     - 𝕰𝖓𝖉 𝖔𝖋 𝕯𝖊𝖒𝖔 - 𝕿𝖍𝖆𝖓𝖐𝖘 𝖋𝖔𝖗 𝖕𝖑𝖆𝖞𝖎𝖓𝖌 -\n`));
tap = rls.question();