/**
 * @filename publisher.js
 * @summary This library contains functions that will publisher markdown files
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

 const meta_generator = require('./meta-generator')
const html_generator = require('./html-generator')
const sanitizer =  require('./sanitizer');
const {content_type} = require("./config");

function publish(file_name, content_type) {
    let property = meta_generator.write_one(file_name, content_type);
    sanitizer.sanitize_site_info(content_type)
    if (content_type.allow_publish) {
        let html = html_generator.export_to_html(property.file_name, content_type);
        html_generator.render_html_from_template(html, property, content_type)
        sanitizer.sanitize_publish(content_type)
    }
}

function publish_all(content_type) {
    let site_info = meta_generator.write_all(content_type);
    if (content_type.allow_publish) {
        const items = site_info.items;
        for (let item of items) {
            let html = html_generator.export_to_html(item.file_name, content_type);
            html_generator.render_html_from_template(html, item, content_type)
        }
        sanitizer.sanitize_publish(content_type)
    }
}

module.exports = {
    publish,
    publish_all,
}

publish_all(content_type.blog);

