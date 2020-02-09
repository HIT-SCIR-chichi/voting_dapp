var web3 = new Web3(new Web3.providers.HttpProvider('http://108.61.126.96:8080'));
var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var contractAddr = '0xaB455171684A3EAb19B33801B67943a3eC19AD38';
var contractInstance = new web3.eth.Contract(abi,contractAddr);
var candidates = {'Alice':'candidate-1','Bob':'candidate-2','Cary':'candidate-3'};
var account;
web3.eth.getAccounts().then(function(accounts){
    account = accounts[0];
});

function voteForCandidate(){
    let candidateName = $("#candidate").val();
    let candidateNameHex =  web3.utils.asciiToHex(candidateName);
    contractInstance.methods.voteForCandidate(candidateNameHex).send({from:account}).then(function(receipt){
        $("#msg").html("已投给: "+ candidateName + "<br>交易哈希: " + receipt.transactionHash + "<br>投票人地址: " + account);
        contractInstance.methods.totalVotesFor(candidateNameHex).call(function(err,res){
            $('#'+candidates[candidateName]).html(res.toString());
        });
    });
}

$(document).ready(function(){
    var candidateList = Object.keys(candidates);
    for (let i = 0; i < candidateList.length; i++){
        let name = candidateList[i];
        let nameHex = web3.utils.asciiToHex(name);
        let count = contractInstance.methods.totalVotesFor(nameHex).call(function(err,res){
            $("#"+candidates[name]).html(res.toString());
        });
    }
})
