#!/administrator/bin/env node
const readline = require('node:readline');
const {stdin: input, stdout: output} = require('node:process');
const fs = require('fs');
const args = process.argv.slice(2).map(n => n);

let question = 'Орел или решко, орел[0] решко[1], чтобы закончить нажмите Enter: ';
let pathName = 'gameLog.txt'

if(args.length === 0){
    createFile(pathName);
}else {
    pathName = args[0];
    createFile(args[0]);
}

function createFile(){
    fs.open(pathName, 'w', (err) => {
        if(err) throw err;
        console.log('File created');
    });
}

function fileWriter(data){
    fs.appendFile(pathName, data, (err) => {
        if(err) throw err;
    });
}

function gameLogAnalyzer(path){
    let fileContent = fs.readFileSync(path, 'utf8');
    const win = fileContent.split('win').length - 1;
    const lose = fileContent.split('lose').length - 1;
    const all = win + lose;
    console.log('win: ' + win + ' lose: ' + lose + ' all: ' + all + ' процент побед: ' + Math.trunc(win/all * 100) + '%');
}

let timeout = setTimeout(function tick(){

    const number = Math.floor(Math.random() * 2);
    const rl = readline.createInterface({ input, output });
    rl.question(question, (answer) => {
        rl.close();
        if(answer !== '')
        {
            console.log('Number: ' + number)
            if(Number(answer) === number){
                console.log('Вы угадали');
                fileWriter('win ');
            }else {
                console.log('Вы не угадали');
                fileWriter('lose ');
            }

            timeout = setTimeout(tick, 100);
        }else{
            gameLogAnalyzer(pathName);
        }
    });
}, 100);

