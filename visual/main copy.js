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

// when I click on the getText Button
// when I click on getText, it should allow user to upload their phrase to the website and display on the website.
// $('#getText').click(function(){
//  getText();
// })

// checks the blockchain for the current number every 2 seconds
// so that the page can be updated automatically if the number
// is changed.
// setInterval(function(){
listDestroyedItems();
// }, 5000)

// FUNCTIONS

// CHANGING THE BLOCKCHAIN


// READING FROM THE BLOCKCHAIN

function destroyedPhrase() {
  // grab the user input from the input text box
  const textToSet = $('#textInput').val();

  // pass the converted text to number in the contract
  contractWithSigner.destroyedPhrase(textToSet);
}


// function displayNames() {

//   // get the array of phrases from the contract
//   let names = getNames;

//   names.forEach(name => {
//     let newName = 
//     `<div class="images__card">
//     <img src="//picsum.photos/id/201/200" alt="#">
//     <h2>Beans</h2>
//     <p>${name}</p>
//   </div>`

//   $('.images__container').append(newName);
//   })
// }
async function listDestroyedItems() {

  // $('.destroyed').empty();
  const phraseList = await contract.getNames();


  console.log(phraseList);

  const listLength = phraseList.length;

  console.log(listLength)

  // contract.on("nameSetEvent",message,newName) => {
  //   const newName = 
  //       `<div class="images__card">
  //       <img src="//picsum.photos/id/201/200" alt="#">
  //       <h2>Beans</h2>
  //       <p>${names}</p>
  //     </div>`

  // $('.images__container').append(newName);
  // };


  // for(let i = 0; i < listLength; i++) {

  //   const names = phraseList[i];


  //   const newName = 
  //       `<div class="images__card">
  //       <img src="//picsum.photos/id/201/200" alt="#">
  //       <h1>xxxxxxxxxxxxxxxxxx</h1>
  //       <h2>Cocoon</h2>
  //       <p>${names}</p>
  //     </div>`

  // $('.images__container').append(newName);
  // }

  // }
  // console.log("test")



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
