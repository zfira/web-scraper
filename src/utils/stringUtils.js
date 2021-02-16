const URL = require("url").URL;

class StringUtils {
    validateUrl = url => {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    };
}

module.exports = {StringUtils}

