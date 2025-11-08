document.querySelector('.container-button span').onclick = () => {
    let input = document.querySelector('.card input');
    let button = document.querySelector('.card button');
    let card = document.querySelector('.card');
    card.style.display = 'block';
    button.addEventListener("click",()=>{
        let YourName = input.value;
        if(YourName ==null || YourName ==""){
            document.querySelector('.name span').innerHTML = "unknown";
        }else {
            document.querySelector('.name span').innerHTML = YourName;
        }
        card.style.display = 'none';
        document.querySelector('.container-button').remove();
        document.getElementById('loop').play();
    });
};


let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-block');
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click',()=>{
        flipe(block);
    });
});


function flipe(selectblock){
    selectblock.classList.add('is-flipped');

    let allflipedblock = blocks.filter(flippedblock => flippedblock.classList.contains('is-flipped'));

    if (allflipedblock.length === 2) {
        stopClicked();
        checkMatchBlock(allflipedblock[0],allflipedblock[1]);
    }

}

function checkMatchBlock(firstblock,secondblock){
    if(firstblock.dataset.technology === secondblock.dataset.technology){
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');
        firstblock.classList.add('has-match');
        secondblock.classList.add('has-match');
        document.getElementById('success').play();
    }else{
        let tries = document.querySelector('.tries span');
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(()=>{
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');
    },duration);
    document.getElementById('failed').play();
    }

}

function stopClicked() {
    blocksContainer.classList.add('no-click');

    setTimeout(()=>{
        blocksContainer.classList.remove('no-click');
    },duration);
}

function shuffle(arr) {
    let current = arr.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return arr;
}