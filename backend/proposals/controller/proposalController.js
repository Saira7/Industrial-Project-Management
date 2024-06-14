// controllers/proposalController.js
const Proposal = require('../models/proposal');
const { validationResult } = require('express-validator');

// Submit a proposal for a project (public)
exports.submitProposal = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure request body
  const { projectId, description } = req.body;

  try {
    // Create new proposal
    const proposal = new Proposal({
      project: projectId,
       student: req.user.id, 
      description
    });

    // Save proposal to database
    await proposal.save();

    res.status(201).json({ message: 'Proposal submitted successfully', proposal });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all proposals (public)
exports.getAllProposals = async (req, res) => {
  try {
    // Fetch all proposals
    const proposals = await Proposal.find();

    res.json(proposals);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get proposal by ID (public)
exports.getProposalById = async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    // Fetch proposal by ID
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.json(proposal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update proposal by ID (public)
exports.updateProposalById = async (req, res) => {
  const proposalId = req.params.proposalId;
  const { description } = req.body;

  try {
    // Find proposal by ID and update
    let proposal = await Proposal.findByIdAndUpdate(proposalId, { description }, { new: true });

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.json(proposal);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete proposal by ID (public)
exports.deleteProposalById = async (req, res) => {
  const proposalId = req.params.proposalId;

  try {
    // Find proposal by ID and delete
    let proposal = await Proposal.findByIdAndDelete(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
