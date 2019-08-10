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