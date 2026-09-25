// Import the organizations model function
import { getAllOrganizations } from '../models/organizations.js';

// Define the organizations page controller
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

// Export the controller
export { showOrganizationsPage };