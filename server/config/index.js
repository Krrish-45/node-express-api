const init = function() {
  if (typeof process.env.NODE_ENV === 'undefined') require('dotenv').config();

  return {
    SERVER_CONFIG: {
      name: process.env.SERVER_NAME,
      env: process.env.SERVER_ENV || 'DEV',
    },
    MONGO_DB_CONFIG: { 
      db_uri: process.env.DB_URI,
      db_userName:process.env.DB_USER_NAME,
      db_password:process.env.DB_PASSWORD,
      db_host:process.env.DB_HOST_LIST,
      db_port:process.env.DB_PORT_LIST,
      db_name:process.env.DB_NAME
    },
    SMS_CONFIG: {
      smsAPI: process.env.SMS_API,
      smsUserName: process.env.SMS_USER_NAME,
      smsPassword: process.env.SMS_GATEWAY_PASSWORD,
      smsSenderId: process.env.SMS_SENDER_ID,
      smsBalance:process.env.SMS_CHECK_BALANCE,
      smsSchedule:process.env.SMS_SCHEDULE,
      SMS_URL: process.env.SMS_URL
  },
    EMAIL_CONFIG: {
      emailUserName: process.env.ELASTIC_EMAIL_USER,
      emailPassword: process.env.ELASTIC_EMAIL_PASS,
      emailID: process.env.ELASTIC_EMAIL_ID,
      emailStatus:process.env.ELASTIC_EMAIL_STATUS,
    },

    LOGGER_CONFIG: { path: process.env.APP_LOG_PATH, level: process.env.APP_LOG_LEVEL },
    JWT_CONFIG: {
      authSecret: process.env.JWT_AUTHTOKEN,
      userExpire: process.env.JWT_AUTHTOKEN_EXPIRY_DAYS_USER,
      captainExpire: process.env.JWT_AUTHTOKEN_EXPIRY_DAYS_CAPTAIN,
    },

    AZURE_CONFIG: {
      cdnImagePath: process.env.BLOBPATH,
      blobsrv_userKey: process.env.BLOBSRV_USERKEY,
      blobsrv_userName: process.env.BLOBSRV_USERNAME,
      booksAndPaper: process.env.BOOKANDPAPERPATH,
    },
  }; //parseDataBase(),
};

/**
 *@description
 This function will fetch the mongodb configurations based on the node environment.
 @returns object
 @author Anbu
 */
const parseDataBase = function() {
  if (!process.env[process.env.NODE_ENV + '_DB_URI']) {
    return {
      db_uri: '', //TODO Generate db uri based on config
    };
  } else {
    return {
      db_uri: process.env[process.env.NODE_ENV + '_DB_URI'],
    };
  }
};

/**
 *
 * @param {*} str
 * @description
 * This method will help to convert string value into boolean type
 * @returns boolean
 *
 */
const _parseBoolean = str => (str && str.toLowerCase() === 'true' ? true : false);

module.exports = init();
