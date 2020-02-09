## 写在前面
- [博客地址：https://blog.csdn.net/qq_43481201/article/details/104235425](https://blog.csdn.net/qq_43481201/article/details/104235425)
- [项目地址：https://gitee.com/jiaowochichi/voting](https://gitee.com/jiaowochichi/voting)
- [参考网站：https://www.bilibili.com/video/av75649294?p=62](https://www.bilibili.com/video/av75649294?p=62)
- 邮箱地址：<2584363094@qq.com>
## 运行前
1. 安装node和npm
2. 下载文件及模块
```bash
git clone https://gitee.com/jiaowochichi/voting.git
cd voting
npm install # 安装依赖
```
3. 运行ganache-cli
```bash
./node_modules/.bin/ganache-cli --host 108.61.126.9 --port 8080
```
- 需保证ganache-cli在整个服务器运行过程中一直运行
- host参数替换为你的服务器网址，port参数替换为你需要监听的端口
## 运行
1. 编译合约
```javascript
# 重新开启一个bash，并进入到voting中，输入node，在node控制台中操作
var Web3 = require('web3');
var solc = require('solc');
var web3 = new Web3(new Web3.providers.HttpProvider('http://108.61.126.96:8080')); # 这里的网址和上面ganache-cli的网址一致
var compiledCode = solc.compile(fs.readFileSync('Voting.sol').toString());
```
2. 部署合约
```javascript
var Voting = compiledCode.contracts[':Voting'];
var abi = JSON.parse(Voting.interface);
var byteCode = Voting.bytecode;
var candidates =['Alice','Bob','Cary'];
var candidatesHex = new Array(candidates.length);
for (let i = 0; i < candidates.length; i++){candidatesHex[i] = web3.utils.asciiToHex(candidates[i]);}
var account;
web3.eth.getAccounts().then(function(res){account=res[0]});
var VotingContract = new web3.eth.Contract(abi);
var contractInstance = VotingContract.deploy({data:bytecode,arguments:[candidatesHex]}).send({from:account,gas:4700000});
```
3. 修改index.js
- 修改第1行中的网址为你的ganache-cli监听网址
- 修改合约部署地址为你的实际部署地址：可以在ganache-cli中找到对应的contractAddr
4. 修改server.js
- 修改最终监听的端口号为一个不同于ganache-cli监听端口号的非熟知端口号，比如8888
- 修改最后一行中的网址为你的服务器网址（和ganache-cli的网址一致）
5. 运行服务器
```bash
node server.js # 保证该进程一直存在，才可以使得网站被正常访问
```
## 注意
```bash
./node_modules/.bin/ganache-cli --host 108.61.126.9 --port 8080# 要保证一直运行
node server.js # 要保证一直运行
```
