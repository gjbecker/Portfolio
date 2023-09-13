module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '5.0.14',
            skipMD5: true
        },
        autostart: false
    }
};