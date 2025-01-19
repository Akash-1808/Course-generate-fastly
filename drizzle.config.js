/**@type {import("drizzle-kit").Config} */

export default  {
    
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  dbCredentials:{
    url:"postgresql://test_owner:CWmMD5Ic4Yui@ep-calm-silence-a5lup1ei.us-east-2.aws.neon.tech/Ai-Course-Generator?sslmode=require ",
  },
  studio:{
    port:4980
  }
};
