export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.APPPORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USERNAME,
    db_port: process.env.DB_PORT,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
  }
}
