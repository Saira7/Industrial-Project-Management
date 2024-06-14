// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const authMiddleware = require('../middleware/authMiddleware');


// Create a new project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:projectId', projectController.getProjectById);

// Update project by ID
router.put('/:projectId', projectController.updateProjectById);

// Delete project by ID
router.delete('/:projectId', projectController.deleteProjectById);

module.exports = router;
