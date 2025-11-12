const scrollDownBtn = document.getElementById('scroll-down-btn');
const carouselItems = document.getElementById('carousel-items')
const recentBlogs = document.getElementById('recent-blogs');
let scrollTimeout;

scrollDownBtn.addEventListener("click", () => {
    document.getElementById("section-2").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    scrollDownBtn.classList.add("hidden");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollDownBtn.classList.remove("hidden");
    }, 10000);
});

async function loadAnn(){
    let d = await getJSON(entries.published.ann);
    let items = d.items;
    carouselItems.innerHTML += ""
    items.forEach(i => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = i.title ? `<p>${i.title}</p><img src="${i.cover}" alt="">` : `<img src="${i.cover}" alt="">`
        card.addEventListener("click", () => showPopup(i));
        carouselItems.appendChild(card);
    });
}

async function loadBlog() {
    let d = await getJSON(entries.published.blog);
    let items = d.items;
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    items.splice(5, items.length);
    recentBlogs.innerHTML = "";
    items.forEach((i, index) => {
        recentBlogs.innerHTML += `
            <a href="${i.link}">
                <p>${i.title}</p>
                <p>${formatDate(i.date)}</p>
                <p>${i.description}</p>
            </a>
            ${index < items.length - 1 ? "<hr>" : ""}
        `;
    });
}

loadAnn().then(() => {carouselStart()});
loadBlog().then(() => {});