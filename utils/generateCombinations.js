function generateCombinations(inputArray, combinationLength) {
    const items = {};
    const prefixes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    inputArray.forEach((count, index) => {
        const prefix = prefixes[index];
        items[prefix] = Array.from({ length: count }, (_, j) => `${prefix}${j + 1}`);
    });

    const result = [];
    function backtrack(start, currentCombination) {
        if (currentCombination.length === combinationLength) {
            result.push([...currentCombination]);
            return;
        }

        for (let i = start; i < Object.keys(items).length; i++) {
            const prefix = Object.keys(items)[i];
            for (const item of items[prefix]) {
                currentCombination.push(item);
                backtrack(i + 1, currentCombination);
                currentCombination.pop();
            }
        }
    }

    backtrack(0, []);
    return result;
}

module.exports = generateCombinations;
