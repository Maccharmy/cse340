import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';


const router = express.Router();


// Home page
router.get(
    '/',
    showHomePage
);


// Organization routes
router.get(
    '/organizations',
    showOrganizationsPage
);

router.get(
    '/organization/:id',
    showOrganizationDetailsPage
);

router.get(
    '/new-organization',
    showNewOrganizationForm
);


// Handle new organization form submission
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);


// Display edit organization form
router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);


// Handle edit organization form submission
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);


// Service project routes
router.get(
    '/projects',
    showProjectsPage
);

router.get(
    '/project/:id',
    showProjectDetailsPage
);

router.get(
    '/new-project',
    showNewProjectForm
);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);


// Edit service project routes
router.get(
    '/edit-project/:id',
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    processEditProjectForm
);


// Category routes
router.get(
    '/categories',
    showCategoriesPage
);

router.get(
    '/category/:id',
    showCategoryDetailsPage
);


// Assign categories to a project
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);


// Error-handling test route
router.get(
    '/test-error',
    testErrorPage
);


export default router;