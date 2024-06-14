// routes/proposalRoutes.js
const express = require('express');
const router = express.Router();
const proposalController = require('../controller/proposalController');
const authMiddleware = require('../middleware/authMiddleware');


// Submit a proposal for a project
router.post('/', proposalController.submitProposal);

// Get all proposals
router.get('/', proposalController.getAllProposals);

// Get proposal by ID
router.get('/:proposalId', proposalController.getProposalById);

// Update proposal by ID
router.put('/:proposalId', proposalController.updateProposalById);

// Delete proposal by ID
router.delete('/:proposalId', proposalController.deleteProposalById);

module.exports = router;
