declare global {
  namespace NodeJS {
    interface ProcessEnv {
      QJW_URL: string;
      DOWNLOAD_PATH: string;
      TOMCAT_ACESS_PREFIX: string;
      LOG_LEVEL: string;
      LOG_DIR: string;
      CACHE_CAPACITY: string;
      CONCURRENCY_NUM: string;
      CRON: string;
      NEWS_COLUMN: string;
      NEWS_TAG: string;
      BUSINESS_STATUS: string;
      USER_ID: string;
      MYSQL_URL: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      NEWS_TABLE: string;
      RECORDS_TABLE: string;
      CURRENT_DB: string;
    }
  }
}

export {}
