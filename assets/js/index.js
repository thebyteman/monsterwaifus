/* on hover functionality for follow and patreon CTA */
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


/* code to populate merch from etsy */
const Http = new XMLHttpRequest();
const url = 'http://thebyteman.com/api/monsterwaifusmerch';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    /* 4 depicts that the http request is fully complete and all data is present */
    if (Http.readyState == 4) {
        let merch = JSON.parse(Http.responseText)
        buildMerchCard(merch);
    }
}
/* copy pasta function to get a random number in a range */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
/* called in the Http request, and passed the products json object to create our merch cards */
let buildMerchCard = (merch) => {
    /* max is used for determining if we need truncate the procuts list or not */
    let max = merch.title.length;
    /* default random numbers for if we have less than 3 products, if more, then this array gets over written */
    let randNumbers = [0, 1, 2];
    /* set iterate to the number of products, if it's > 3 then it'll get set to 3 below */
    let iterate = max;
    /* loop to determine which 3 random products gets listed if the amount of products is > 3 */
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
    /* get the node for the parent container to put all the merch cards into */
    let merchCardContainer = document.getElementById("merch-card-container");

    /* loop to build each merch card */
    for (let i = 0; i < iterate; i++) {
        let merchCard = document.createElement('div');

        let image = document.createElement('img');

        let link = document.createElement('a');

        let title = document.createElement('h2');
        let titleText = document.createTextNode(merch.title[randNumbers[i]]);

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