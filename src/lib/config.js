const path = require('path');
const root = path.resolve(__dirname, '..', '..');

const content_type = {
    ann:{
        name: 'ann',
        content_folder: path.join(root, "contents", "ann"),
        publish_folder: path.join(root, "docs", "ann"),
        site_info_file: path.join(root, "docs", "assets", "site", "ann.json"),
        allow_publish: false,
    },
    gallery:{
        name: 'gallery',
        content_folder: path.join(root, "contents", "gallery"),
        publish_folder: path.join(root, "docs", "gallery"),
        site_info_file: path.join(root, "docs", "assets", "site", "gallery.json"),
        allow_publish: true,
    },
    blog: {
        name: 'blog',
        content_folder: path.join(root, "contents", "blog"),
        publish_folder: path.join(root, "docs", "blog"),
        site_info_file: path.join(root, "docs", "assets", "site", "blog.json"),
        allow_publish: true,
    },
    essay: {
        name: 'blog',
        content_folder: path.join(root, "contents", "essay"),
        publish_folder: path.join(root, "docs", "essay"),
        site_info_file: path.join(root, "docs", "assets", "site", "essay.json"),
        allow_publish: true,
    }
}

const publish_template_file = path.join(root, "src", "templates", "_default.ejs")

const publish_list = ["blog", "essay", "gallery"];

const page_limit = 10;

const base_url = "https://letongchen.art"

module.exports = {
    content_type,
    publish_template_file,
    publish_list,
    page_limit,
    base_url,
}