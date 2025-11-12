const itemsContainer = document.getElementById('items');
const pagesContainer = document.getElementById('pages');
const form = document.getElementById('search-bar');
const searchResult = document.getElementById('search-result');
const searchInput = document.getElementById('search')

let total = null;
let limit = null
let items = []
let items_permanent = []
let currentPage = 1

async function getData(url){
    let d = await getJSON(url);
    items = d.items;
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    items_permanent = d["items"]
    items_permanent.sort((a, b) => new Date(b.date) - new Date(a.date));
    total = items.length || d["total"]
    limit = d["limit_per_page"]
    let html = "";
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        html += `<button onclick="load(${i})">${i}</button>`;
    }
    pagesContainer.innerHTML = html;
    load(1)
}

function load(page){
    itemsContainer.innerHTML = "";
    let startIndex = (page-1) * limit
    let endIndex = Math.min(startIndex + limit, items.length);
    for (let i = startIndex; i < endIndex; i++) {
        let p = items[i]
        let s = p["keywords"].map(k => `#${k}`).join(' ');
        itemsContainer.innerHTML += `
        <a class="grid-item" href="${p['link']}">
            <p class="item-title">${p['title']}</p>
            <p class="item-keywords"><span class="topic">${p['topic']}</span>&nbsp;&nbsp;${s}</p>
            <p class="item-description">${p['description']}</p>
            <p class="item-date">${formatDate(p['date'])}</p>
        </a><hr>`
    }
    let buttons = document.querySelectorAll('#pages button');
    buttons.forEach(btn => btn.style.border = "1px solid transparent");
    buttons[page - 1].style.border = "1px solid var(--dark)";
    let pagesSimple = document.getElementById("pages-simple");
    pagesSimple.innerHTML = `${page}/${Math.ceil(total / limit)}`
    currentPage = page;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}

function prevPage() {
    if (currentPage > 1) load(currentPage - 1);
}

function nextPage() {
    if (currentPage < Math.ceil(total / limit)) load(currentPage + 1);
}

function search(query) {
    const words = query.trim().toLowerCase().split(/\s+/); // split by spaces
    const output = [];
    items_permanent.forEach(blog => {
        const title = blog["title"].toLowerCase();
        const description = blog["description"].toLowerCase();
        const keywords = blog["keywords"].map(k => k.toLowerCase());
        const matches = words.some(word =>
            title.includes(word) ||
            description.includes(word) ||
            keywords.some(k => k.includes(word))
        );
        if (matches) {
            output.push(blog);
        }
    });
    return output;
}


function append(blogs){
    searchResult.innerHTML = "";
    for (let b of blogs){
        searchResult.innerHTML += `
            <a class="search-result-item" href="${b["link"]}">
                <p class="search-result-item-title">${b["title"]}</p>
                <p class="search-result-item-description">${b["description"]}</p>
            </a>`
    }
}

function toggleSearchResult(val){
    searchResult.style.display = val ? "flex" : "none";
}

function handleSearch() {
    let q = searchInput.value;
    const r = search(q);
    if (q.trim().length > 0 && r.length > 0) {
        append(r);
        toggleSearchResult(true);
    } else {
        toggleSearchResult(false);
    }
}

searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('click', handleSearch);
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let r = search(searchInput.value);
    if (r.length > 0) {
        items = r;
        total = items.length
        let html = "";
        for (let i = 1; i <= Math.ceil(total / limit); i++) {
            html += `<button onclick="load(${i})">${i}</button>`;
        }
        pagesContainer.innerHTML = html;
        load(1)
        toggleSearchResult(false);
    }
    else{
        toggleSearchResult(false);
    }
});

document.body.addEventListener('click', function (event) {
    const target = event.target;
    const excludeElements = [
        searchInput
    ];
    if (searchResult.contains(target) || excludeElements.some(el => el && el.contains(target))) {
        return;
    }
    searchResult.style.display = 'none';
});

