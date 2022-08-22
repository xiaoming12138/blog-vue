const shell = require("shelljs");  // 执行文件操作
const argv = require('yargs').argv; // yargs 处理参数
const inquirer = require('inquirer');
const commit = argv._ // 参数数组

// 执行git提交命令
let ee = shell.exec(`git branch`)
let branchName = ee.stdout.split('* ')[1].split('\n')[0]

console.log('当前分支为：',branchName)

const mergeBranchName = [
    {
      type: 'input',
      name: 'mergeBranchName',
      message: "请输入你想要合并的分支",
    },
  ];
  const mergeDir = [
    {
      type: 'input',
      name: 'mergeDir',
      message: "请输入你想要合并的目录或者文件，ex: ./build || ./src/main.js",
    },
  ];
  const mergeCommit = [
    {
      type: 'input',
      name: 'mergeDir',
      message: "请输入你想要合并的commit信息",
    },
  ];
  
  inquirer.prompt(mergeBranchName).then((res) => {
    console.log(`Hi ${res.mergeBranchName}!`);
    shell.exec(`git checkout ${res.mergeBranchName}_new`)
    shell.exec(`git pull`)
    shell.exec(`git checkout ${branchName}`)
    shell.exec(`git pull`)

    inquirer.prompt(mergeDir).then((res) => {
        
        shell.exec(`git checkout ${res.mergeDir}`)
        shell.exec(`git add .`)
        inquirer.prompt(mergeCommit).then((res) => {
            shell.exec(`git commit -m ${res.mergeCommit}`)
            console('合并完成，是否需要自动push到远程')
          });
    
      });

  });


// shell.exec(`git checkout ${commit[0]}`)
// shell.exec(`git pull`)
// shell.exec(`git checkout ${commit[1]}`)

// shell.exec(`git pull`)
// shell.exec(`git checkout ${commit[0]}`)

