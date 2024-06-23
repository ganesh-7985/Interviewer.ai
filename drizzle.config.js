/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://neondb_owner:lbPLcpkC6n3m@ep-jolly-truth-a5oejlg3.us-east-2.aws.neon.tech/interviewer.ai?sslmode=require",
    }
  };
  