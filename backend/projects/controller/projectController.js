const Project = require('../models/project');
const { validationResult } = require('express-validator');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new project (authentication required)
exports.createProject = [authenticate, async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure request body
  const { title, description, category } = req.body;

  try {
    // Create new project
    const project = new Project({
      title,
      description,
      category,
      createdBy: req.user.userId, // Use authenticated user ID
    });

    // Save project to database
    await project.save();

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}];

// Get all projects 
exports.getAllProjects = async (req, res) => {
  try {
    // Fetch all projects
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get project by ID 
exports.getProjectById = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Fetch project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update project by ID 
exports.updateProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, category } = req.body;

  try {
    // Find project by ID and update
    let project = await Project.findByIdAndUpdate(projectId, { title, description, category }, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete project by ID 
exports.deleteProjectById = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Find project by ID and delete
    let project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};