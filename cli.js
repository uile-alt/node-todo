const program = require('commander');
const api = require('./index')
var arguments = process.argv;


//命令行选项
program
    .option('-z, --zzz', 'output extra debugging')
//子命令
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const test = args.slice(1)[0]
        if (typeof (test) == "undefined") {
            throw 'missing argument'
        }
        const words = args.slice(1)[0].join(' ')
        api.add(words).then(() => { console.log('添加成功') }, () => { console.log('添加失败') })
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => { console.log('清除完毕') }, () => { console.log('清除失败') })
    })
program
    .command('showAll', { isDefault: true })
    .description('show all tasks')
    .action(() => {
        api.showAll()
    })
program.parse(process.argv);