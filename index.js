const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const connectionString = 'postgres://cbwtwwxe:NH|q9z8PQ-sdxwySp2es40JspfV8NnQp@satao.db.elephantsql.com/cbwtwwxe';
// password authentication is getting failed

// "postgres:// cbwtwwxe:NH|q9z8PQ-sdxwySp2es40JspfV8NnQp@satao.db.elephantsql.com/cbwtwwxe"
const pool = new Pool({
  connectionString: connectionString,
});
app.use(express.json());


app.get('/data/:industry', async (req, res) => {
  try {
    const industry = req.params.industry;
    const page = req.query.page || 1;
    const limit = 20; 

    const offset = (page - 1) * limit;
    console.log(offset, industry, page, limit)
    const query = {
      text: 'SELECT * FROM company WHERE industry = $1 LIMIT $2 OFFSET $3',
      values: [industry, limit, offset],
    };

    const result = await pool.query(query);
    console.log(result,"====>>")
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
