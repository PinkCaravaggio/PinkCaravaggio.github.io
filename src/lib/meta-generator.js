/**
 * @filename meta-generator.js
 * @summary This library contains functions that will generate meta information for markdown contents,
 *          the meta information will be extracted from the markdown file properties
 * @version 1.0
 * @author  Linyun Liu, https://linyunliu.com
 * @updated 2025-11-01
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const slugify = require('slugify');
const { publish_list, page_limit} = require('./config');
const { validate } = require('./item');

/**
 * provide the file name, the file properties, this function will
 * generate a slugified link for the publishing path if the provided content_type
 * id of blog or essay
 *
 * @param file_name
 * @param properties
 * @param content_type
 * @return {*}
 */
function append_link(file_name, properties, content_type){
    let name = content_type.name;
    if (content_type.allow_publish){
        properties.link = `/${name}/${slugify(file_name).toLowerCase().replace(/\.md$/, '')}`
    }

    return properties;
}

/**
 * provide the file name of the markdown file and the content type,
 * the function will find the markdown file in the project and
 * extract its file properties.
 *
 * **Note**: the "link" file property will be overridden if the provided content type is `content_type.blog`
 *
 * @param {string} file_name    - markdown file name
 * @param {object} content_type - content type of the markdown file
 * @return {{file_name, title, description, cover, author, keywords, date, publish, link: string|any}}
 */
function get_file_properties(file_name, content_type){
    const md = fs.readFileSync(path.join(content_type.content_folder, file_name), 'utf-8');
    let properties = matter(md).data
    properties = validate(properties)
    properties.file_name = file_name // ! IMPORTANT: append this file name as an id

    return append_link(file_name, properties, content_type)
}

/**
 * provide the content type, this function will find all markdown file of that content type and
 * extract their file properties as json, combine them and write it to a meta json file
 *
 * **Note**: This will overwrite the original meta json file
 *
 * @param {object} content_type - content type of the markdown file
 * @return {{items: *[], total: number, limit_per_page: number}|*}
 */
function write_all(content_type){
    const files = fs.readdirSync(path.join(content_type.content_folder)).filter(f => f.endsWith('.md'));
    let items = []
    for (let file_name of files){
        let item = get_file_properties(file_name, content_type);
        if (item.publish){
            items.push(item)
        }
    }
    const site_info = {
        items: items,
        total: items.length,
        limit_per_page: page_limit,
    };
    fs.writeFileSync(content_type.site_info_file, JSON.stringify(site_info, null, 2), 'utf-8');

    return site_info;
}

/**
 * provide file name and content type, this function will only add the meta of that one file
 * to the meta json file. If the meta file does not exist, a new one will be created
 *
 * **Note**: If the markdown has an existing meta item, that item will be overwritten
 * instead of adding a new one
 *
 * @param {string} file_name    - markdown file name
 * @param {object} content_type - content type of the markdown file
 * @return {{title, description, cover, author, keywords, date, active, link: (string|*), file_name}}
 */
function write_one(file_name, content_type){
    let item = get_file_properties(file_name, content_type);
    let site_info = get_site_info_file(content_type);
    const index = site_info.items.findIndex(i => i.file_name === file_name);
    if (item.publish) {
        if (index !== -1) {
            site_info.items[index] = item;
        } else {
            site_info.items.push(item);
            site_info.total += 1;
        }
    } else {
        if (index !== -1) {
            site_info.items.splice(index, 1);
            site_info.total -= 1;
        }
    }
    fs.writeFileSync(content_type.site_info_file, JSON.stringify(site_info, null, 2), 'utf-8');

    return item
}

/**
 * provide a content type, this function will look for the corresponding meta file,
 * if the file does not exist, a minimal meta file json will be returned
 *
 * @param {object} content_type - content type of the markdown file
 * @return {{items: *[], total: number, limit_per_page: number}|any}
 */
function get_site_info_file(content_type){
    if (fs.existsSync(content_type.site_info_file)) {
        return JSON.parse(fs.readFileSync(content_type.site_info_file, 'utf-8'));
    }
    else {
        return {
            items: [],
            total: 0,
            limit_per_page: page_limit
        };
    }
}


module.exports = {
    write_all,
    write_one,
    get_site_info_file
}