module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true,
        "jest": true,
        "browser": true
    },
    "rules": {
        "import/no-named-as-default": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "object-curly-spacing": ["error", "always", { "arraysInObjects": false, "objectsInObjects": false }],
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
    }
};
