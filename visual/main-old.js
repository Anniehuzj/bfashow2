// MetaMask is our 'provider' in this case
const provider = new ethers.providers.Web3Provider(window.ethereum);

// You (whoever is signed into MetaMask) is the 'signer'
const signer = provider.getSigner();

// the 'contract' object allows us to call functions from our smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// the 'contractWithSigner' object allows us to call smart contract functions that
// require us to send a transaction (like changing a number on the blockchain)
const contractWithSigner = contract.connect(signer);

async function init() {
  await provider.send("eth_requestAccounts", []);
}

init();

// EVENT LISTENERS

// when I click on the setText button...
$('#submit').click(function () {
  destroyedPhrase();
})


listDestroyedItems();


function destroyedPhrase() {
  // grab the user input from the input text box
  const textToSet = $('#textInput').val();

  // pass the converted text to number in the contract
  contractWithSigner.destroyedPhrase(textToSet);
}


async function listDestroyedItems() {

  // $('.destroyed').empty();
  const phraseList = await contract.getNames();


  console.log(phraseList);

  const listLength = phraseList.length;

//   names.forEach(name => {
//     let newName = 
//     `<div class="images__card">
//     <img src="//picsum.photos/id/201/200" alt="#">
//     <h2>Beans</h2>
//     <p>${name}</p>
//   </div>`

//   $('.images__container').append(newName);
//   })  console.log(listLength)


  contract.on("nameSetEvent", (message, newName) => {
    console.log(newName);
    const nameNode =
      `<div class="images__card">
  <img src="//picsum.photos/id/201/200" alt="#">
  <h1>xxxxxxxxxxxxxxxxxx</h1>
  <h2>Cacoon</h2>
  <p>${newName}</p>
</div>`

    console.log(nameNode);
    $('.images__container').append(nameNode);

  })

}
