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
      name: 'mergeCommit',
      message: "请输入你想要合并的commit信息",
    },
  ];
  
  inquirer.prompt(mergeBranchName).then((mergeBranchNameRes) => {
    // console.log(`${mergeBranchNameRes.mergeBranchName}!`);
    shell.exec(`git checkout ${mergeBranchNameRes.mergeBranchName}`)
    shell.exec(`git pull`)
    shell.exec(`git checkout ${branchName}`)
    shell.exec(`git pull`)

    inquirer.prompt(mergeDir).then((mergeDirRes) => {
        
        shell.exec(`git checkout ${mergeBranchNameRes.mergeBranchName} ${mergeDirRes.mergeDir}`)
        shell.exec(`git add .`)
        console.log(`git checkout ${mergeBranchNameRes.mergeBranchName} ${mergeDirRes.mergeDir}`)
        inquirer.prompt(mergeCommit).then((mergeCommitRes) => {
            shell.exec(`git commit -m ${mergeCommitRes.mergeCommit}`)
            console('合并完成，暂时需要手动push到远程')
          });
    
      });

  });


// shell.exec(`git checkout ${commit[0]}`)
// shell.exec(`git pull`)
// shell.exec(`git checkout ${commit[1]}`)

// shell.exec(`git pull`)
// shell.exec(`git checkout ${commit[0]}`)

