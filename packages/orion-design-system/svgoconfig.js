module.exports = {
    plugins: [
        {
            name: 'removeElementsByAttr',
            params: {
                id: ['Rectangle']
            },
        },
        {
            name: 'preset-default',
            params: {
                overrides: {
                    convertShapeToPath: false, 
                },
            },
        },
    ],
  };