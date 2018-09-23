module.exports = {
    extends: [
        "plugin:vue/essential"
    ],
    rules: {
        'vue/no-parsing-error': [2, {
            "invalid-first-character-of-tag-name": false
        }]
    }
}