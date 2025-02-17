import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("Your_Api_key");

export const db = drizzle( sql );


