const entries = {
    published:{
        ann: "assets/site/ann.json",
        gallery: "assets/site/gallery.json",
        blog: "assets/site/blog.json",
        essay: "assets/site/essay.json",
    },
    default: {
        ann: "assets/site/default/_default_ann.json",
        gallery: "assets/site/default/_default_gallery.json",
        blog: "assets/site/default/_default_blog.json",
        essay: "assets/site/default/_default_essay.json"
    }
}

async function getJSON(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" : "th";
    return formatted.replace(/\d+/, `${day}${suffix}`);
}
