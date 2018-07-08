module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        "no-use-before-define": ["error", { "variables": false }],
        "react/no-array-index-key": ["warn"],
        "react/jsx-closing-bracket-location": ["error", {
            "nonEmpty": "after-props" || false,
            "selfClosing": "after-props" || false
        }],
        "jsx-a11y/label-has-for": [2, {
            "components": ["Label"],
            "required": {
                "every": []
            },
            "allowChildren": false
        }]
    },
};