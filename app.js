const api_key = `1d0e11d2c9094d3180b41c6177ecc767`
const url = `https://newsapi.org/v2/everything?q=`

window.addEventListener('load', fectNews('india'))

async function fectNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${api_key}`)
    let data = await res.json()
    console.log(data);
    bindData(data.articles)
}

function bindData(articles) {
    let cardContainer = document.querySelector(".row")
    let newsTamplate = document.getElementById("news-card-template")
    cardContainer.innerHTML = "";
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsTamplate.content.cloneNode(true);
        filData(cardClone, article)
        cardContainer.append(cardClone)
    });

}

function filData(cardClone, article) {
    const newsImg = cardClone.querySelector(".news-img")
    const newsTitle = cardClone.querySelector(".card-title")
    const newsSource = cardClone.querySelector(".new-source")
    const newsText = cardClone.querySelector(".card-text")
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsText.innerHTML = article.description
    const date = new Date(article.publishedAt).toLocaleString("en-us", { timeZone: "Asia/Dhaka" })
    newsSource.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener('click', e=>{
        window.open(article.url,'_blank')
    })
}