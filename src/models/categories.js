import db from './db.js';

const getAllCategories = async () => {
    const result = await db.query("SELECT * FROM category ORDER BY name;");
    return result.rows;
};

export { getAllCategories };
