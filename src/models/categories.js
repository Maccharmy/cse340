import db from './db.js';


// Get all categories
const getAllCategories = async () => {

    const result = await db.query(
        "SELECT * FROM category ORDER BY name;"
    );

    return result.rows;
};


// Get details for a specific category
const getCategoryDetails = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};


// Get all categories for a specific project
const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


// Get all projects for a specific category
const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.date
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const queryParams = [categoryId];

    const result = await db.query(query, queryParams);

    return result.rows;
};


// Assign a category to a project
const assignCategoryToProject = async (categoryId, projectId) => {

    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};


// Update all category assignments for a project
const updateCategoryAssignments = async (projectId, categoryIds) => {

    // Remove existing category assignments
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);


    // Add the new category assignments
    for (const categoryId of categoryIds) {

        await assignCategoryToProject(
            categoryId,
            projectId
        );
    }
};


// Export all category model functions
export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments
};