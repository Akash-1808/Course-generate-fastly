import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://test_owner:CWmMD5Ic4Yui@ep-calm-silence-a5lup1ei.us-east-2.aws.neon.tech/Ai-Course-Generator?sslmode=require");

export const db = drizzle( sql );


