const default_meta = {
    title: "Letong's Artwork Demonstration",
    description: "Letong is demonstrating his art",
    cover: "https://wallpapers.com/images/featured/aesthetic-art-39mydncrinbm5fvq.jpg",
    author: "Letong Chen",
    keywords: ["art"],
    topic: "Art",
    date: new Date().toISOString(),
    publish: false,
    link: "https://letongchen.art"
}

/**
 * determine if an item is set to publish based on the "publish" file property
 *
 * @param {object} str
 * @return {boolean}
 */
function verify_publish(str){
    if (typeof str == 'boolean'){
        return str
    }
    if (typeof str === 'string') {
        return str.toLowerCase() === 'true';
    }
    return false;
}

/**
 * verify the keywords field and make sure it is a valid array
 *
 * @param field
 * @return {[string]|*}
 */
function verify_array(field){
    if (Array.isArray(field) && field.length > 0) {
        return field;
    }
    else{
        return default_meta.keywords;
    }
}

/**
 * verify the date field and make sure it is a valid date string
 *
 * @param date_str
 * @return {string}
 */
function verify_date(date_str){
    if (typeof date_str !== 'string') {
        return default_meta.date;
    }
    else{
        let date = new Date(date_str);
        if (isNaN(date.getTime())){
            return default_meta.date;
        }
        else{
            return date_str
        }
    }
}

/**
 * This function validate the item meta, it will make the meta complete and free of error
 *
 * @param meta
 * @return {{title: string, description: string, cover: string, author: string, keywords: [string], topic: string, date: string, publish: boolean, link: string}}
 */
function validate(meta = {}) {
    const result = { ...default_meta };
    for (const key in default_meta) {
        if (
            meta[key] !== undefined &&
            meta[key] !== null &&
            meta[key] !== ""
        ) {
            result[key] = meta[key];
        }
    }
    result.date = verify_date(result.date);
    result.keywords = verify_array(result.keywords);
    result.publish = verify_publish(result.publish);

    return result;
}

module.exports = {
    validate,
}