const { generateAndStoreCombinations } = require('../services/combinationService');


class CombinationController {
    async generateCombination(req, res) {
        const { items: inputItems, length: combinationLength } = req.body;

        if (!Array.isArray(inputItems) || typeof combinationLength !== 'number' || combinationLength <= 0) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        try {
            const combinations = await generateAndStoreCombinations(inputItems, combinationLength);
            res.json({ id: Date.now(), combination: combinations });
        } catch (error) {
            console.error('Error generating combinations:', error);
            res.status(500).json({ error: 'Error generating combinations' });
        }
    }
}

module.exports = new CombinationController();