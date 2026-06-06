import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import sql from 'mssql';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const dbConfig = {
  server: process.env.DB_SERVER || 'svr-sql-ctezo.southcentralus.cloudapp.azure.com',
  user: process.env.DB_USER || 'usr_DesaWebDevUMG',
  password: process.env.DB_PASSWORD || '!ngGuast@360',
  database: process.env.DB_NAME || 'db_DesaWebDevUMG',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/mensajes', async (_req, res) => {
  try {
    const connection = await getPool();
    const result = await connection.request().query(`
      SELECT
        Id_Mensaje,
        Cod_Sala,
        Login_Emisor,
        Contenido,
        Fecha_Envio
      FROM [dbo].[Chat_Mensaje]
      ORDER BY Fecha_Envio ASC
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al consultar mensajes:', error);
    res.status(500).json({
      message: 'No se pudo consultar la base de datos',
      detail: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Serie III escuchando en http://localhost:${PORT}`);
});
