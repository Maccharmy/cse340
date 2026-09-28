import {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    createCategory,
    updateCategory,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectDetails
} from '../models/projects.js';

import {
    body,
    validationResult
} from 'express-validator';


// Category validation
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];


// Display the main categories page
const showCategoriesPage = async (req, res) => {

    const categories =
        await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
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


// Display the new category form
const showNewCategoryForm = (req, res) => {

    const title = 'Add New Category';

    res.render('new-category', {
        title
    });
};


// Process the new category form
const processNewCategoryForm = async (req, res) => {

    const results = validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {

        await createCategory(name);

        req.flash(
            'success',
            'New category created successfully!'
        );

        res.redirect('/categories');

    } catch (error) {

        console.error(
            'Error creating category:',
            error
        );

        req.flash(
            'error',
            'There was an error creating the category.'
        );

        res.redirect('/new-category');
    }
};


// Display the edit category form
const showEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const category =
        await getCategoryDetails(categoryId);

    if (!category) {

        req.flash(
            'error',
            'Category not found.'
        );

        return res.redirect('/categories');
    }

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        category
    });
};


// Process the edit category form
const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id;

    const results = validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    try {

        await updateCategory(
            categoryId,
            name
        );

        req.flash(
            'success',
            'Category updated successfully!'
        );

        res.redirect(`/category/${categoryId}`);

    } catch (error) {

        console.error(
            'Error updating category:',
            error
        );

        req.flash(
            'error',
            'There was an error updating the category.'
        );

        res.redirect(`/edit-category/${categoryId}`);
    }
};


// Display the assign categories form for a project
const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails =
        await getProjectDetails(projectId);

    const categories =
        await getAllCategories();

    const assignedCategories =
        await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};


// Process the assign categories form
const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds =
        req.body.categoryIds || [];

    const categoryIdsArray =
        Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash(
        'success',
        'Categories updated successfully.'
    );

    res.redirect(`/project/${projectId}`);
};


// Export the controllers
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
};
