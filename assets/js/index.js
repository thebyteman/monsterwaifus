let followImg = document.getElementById("follow-img")
let patreonImg = document.getElementById("patreon-img")

followImg.onmouseover = () => {
    followImg.setAttribute("src", "/assets/images/follow-show.png")
};

followImg.onmouseout = () => {
    followImg.setAttribute("src", "/assets/images/follow-hide.png")
};

patreonImg.onmouseover = () => {
    patreonImg.setAttribute("src", "/assets/images/patreon-show.png")
};

patreonImg.onmouseout = () => {
    patreonImg.setAttribute("src", "/assets/images/patreon-hide.png")
};

const Http = new XMLHttpRequest();
const url = 'http://thebyteman.com/api/monsterwaifusmerch';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    if (Http.readyState == 4) {
        let merch = JSON.parse(Http.responseText)
        buildMerchCard(merch);
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let buildMerchCard = (merch) => {

    let max = merch.title.length;
    let randNumbers = [0, 1, 2];
    let iterate = max;
    if(max > 3) {
        iterate = 3;
        for (let i = 0; i < 3; i++) {
            let randNum = getRandomInt(0, max);
            while (randNum === randNumbers[0] || randNum === randNumbers[1]) {
                randNum = getRandomInt(0, max);
            }
            randNumbers[i] = randNum;
        }
    }

    let merchCardContainer = document.getElementById("merch-card-container");

    for (let i = 0; i < iterate; i++) {
        let merchCard = document.createElement('div');
        let title = document.createElement('h2');
        let titleText = document.createTextNode(merch.title[randNumbers[i]]);
        let image = document.createElement('img');
        let link = document.createElement('a');
        let price = document.createElement('p');
        let priceText = document.createTextNode("$ " + merch.price[randNumbers[i]]);

        link.setAttribute('href', merch.link[randNumbers[i]]);

        title.appendChild(titleText);
        title.classList.add('merch-title');

        price.appendChild(priceText);
        price.classList.add('merch-price');

        image.setAttribute('src', merch.image[randNumbers[i]]);
        image.classList.add('merch-img');

        link.appendChild(image);
        link.appendChild(title);
        link.appendChild(price);

        merchCard.classList.add('merch-card');
        merchCard.appendChild(link);
        merchCardContainer.appendChild(merchCard);
    }
}