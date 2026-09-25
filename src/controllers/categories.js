import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId
} from '../models/categories.js';


// Display the main categories page
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};


// Display the details for a specific category
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category =
        await getCategoryDetails(categoryId);

    const projects =
        await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', {
        title,
        category,
        projects
    });
};


// Export the controllers
export {
    showCategoriesPage,
    showCategoryDetailsPage
};