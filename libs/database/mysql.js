module.exports = {
    development: {
        username: 'development',
        password: 'development',
        database: "development",
        options: {
            host: '127.0.0.1',
            port: 3306,
            maxConcurrentQueries: 100,
            omitNull: true,
            engine: 'InnoDB',
            logging: console.log,
            timestamps: true,
            dialect: 'mysql',
            native: false,
            omitNull: false,
            pool: {
                maxConnections: 100,
                maxIdleTime: 30
            },
            syncOnAssociation: true,
            language: 'es',
            define: {
                freezeTableName: true,
                underscored: false,
                syncOnAssociation: true,
                engine: 'InnoDB',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        }
    }, test: {
        username: 'testing',
        password: 'testing',
        database: 'testing',
        options: {
            host: '127.0.0.1',
            port: 3306,
            maxConcurrentQueries: 100,
            omitNull: true,
            engine: 'InnoDB',
            logging: console.log,
            timestamps: true,
            dialect: 'mysql',
            native: false,
            omitNull: false,
            pool: {
                maxConnections: 100,
                maxIdleTime: 30
            },
            syncOnAssociation: true,
            language: 'es',
            define: {
                freezeTableName: true,
                underscored: false,
                syncOnAssociation: true,
                engine: 'InnoDB',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        }
    }, production: {
        username: 'production',
        password: 'production',
        database: 'production',
        options: {
            host: '127.0.0.1',
            port: 3306,
            maxConcurrentQueries: 100,
            omitNull: true,
            engine: 'InnoDB',
            logging: console.log,
            timestamps: true,
            dialect: 'mysql',
            native: false,
            omitNull: false,
            pool: {
                maxConnections: 100,
                maxIdleTime: 30
            },
            syncOnAssociation: true,
            language: 'es',
            define: {
                freezeTableName: true,
                underscored: false,
                syncOnAssociation: true,
                engine: 'InnoDB',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        }
    }
};