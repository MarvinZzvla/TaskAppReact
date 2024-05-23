import { createPool } from "mysql2/promise";
export const pool = createPool({
  host: "sql5.freesqldatabase.com",
  port: 3306,
  user: "sql5708549",
  password: "hT6JqzK51L",
  database: "sql5708549",
});
