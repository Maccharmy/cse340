import db from '../db.js';

const getAllProjects = async () => {
  const query = `
    SELECT s.service_id, s.title, s.description, s.location, s.date, o.name AS organization_name
    FROM services s
    JOIN organizations o ON s.organization_id = o.organization_id
    ORDER BY s.date;
  `;
  const result = await db.query(query);
  return result.rows;
};

// ✅ ES Module export
export { getAllProjects };
