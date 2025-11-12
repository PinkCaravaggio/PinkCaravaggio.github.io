/**
 * @filename sanitize.js
 * @summary This library contains functions sanitize the project folder, which includes
 *          getting rid of redundant files in the doc folder (also the publishing folder)
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

const path = require('path');
const fs = require("fs");
const meta_generator = require("./meta-generator");

/**
 * provide with content type and meta, this function will compare all the content's
 * titles against the corresponding meta json (using title as reference) to see if there are any redundant data,
 * meaning that this function will remove any metadata that no longer has a corresponding markdown file due to:
 * - 1. A change of content title
 * - 2. A markdown file is deleted or no longer exist
 *
 * In a way this functions as a sync feature
 *
 * @param content_type
 * @return {{items: *[], total: number, limit_per_page: number}|*}
 */
function sanitize_site_info(content_type){
    const files = fs.readdirSync(content_type.content_folder).filter(f => f.endsWith('.md'));
    let site_info = meta_generator.get_site_info_file(content_type);
    let items = site_info.items;
    let updated_items = []
    for (let i of items){
        if (files.includes(i.file_name)){
            updated_items.push(i);
        }
    }
    site_info.items = updated_items;
    site_info.total = updated_items.length;
    fs.writeFileSync(content_type.site_info_file, JSON.stringify(site_info, null, 2), 'utf-8');
}

/**
 * provide with content type and meta this function will compare all the content's meta information
 * against the corresponding publishes to see if there are any redundant publish
 *
 * @param content_type
 */
function sanitize_publish(content_type){
    if (content_type.allow_publish) {
        const site_info = meta_generator.get_site_info_file(content_type);
        const dir = site_info.items.map(item => item.link.replace(`/${content_type.name}/`, ''));
        const publish = fs.readdirSync(content_type.publish_folder, {withFileTypes: true});
        for (let p of publish) {
            if (p.isDirectory()) {
                if (!dir.includes(p.name)) {
                    fs.rmSync(path.join(p.parentPath, p.name), {recursive: true, force: true});
                }
            }
        }
    }
}


module.exports = {
    sanitize_site_info,
    sanitize_publish
};