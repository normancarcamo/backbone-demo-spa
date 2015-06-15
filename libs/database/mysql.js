module.exports = {
    development: {
        username: '',
        password: '',
        database: "",
        options: {
            host: '',
            port: 0000,
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
        username: '',
        password: '',
        database: '',
        options: {
            host: '',
            port: 0000,
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
        username: '',
        password: '',
        database: '',
        options: {
            host: '',
            port: 0000,
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
