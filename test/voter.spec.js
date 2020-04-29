let Voter = artifacts.require('./Voter.sol');

contract('Voter', (accounts) => {
    let voter,
        firstAccount;

    beforeEach(async () => {
        firstAccount = accounts[0]
        voter = await Voter.new();
        await setOptions(firstAccount, ['coffee', 'tea'])
    });

    it('has no votes by default', async () => {
        let votes = await voter.getVotes.call();

        expect(toNumbers(votes)).to.deep.equal([0, 0]);
    })

    it('can vote with a string option', async () => {
        await voter.vote('coffee', {from: firstAccount})

        let votes = await voter.getVotes.call();
        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    })

    it('can vote with an unsigned inter option', async () => {
        await voter.voteInt(1, {from: firstAccount})

        let votes = await voter.getVotes.call();
        expect(toNumbers(votes)).to.deep.equal([0, 1]);
    })

    const ERROR_MSG = 'Returned error: VM Exception while processing transaction: revert user has voted previously -- Reason given: user has voted previously.';

    it('cannot vote twice from the same contract', async () => {
        try {
            await voter.voteInt(0, {from: firstAccount});
            await voter.voteInt(0, {from: firstAccount});
            expect.fail()
        } catch(error) {
            expect(error.message).to.equal(ERROR_MSG)
        }
    })

    async function setOptions(account, options) {
        for (pos in options) {
            await voter.addOption(options[pos], {from: account});
        }
        await voter.startVoting({from: account, gas: 600000})
    }

    function toNumbers(bigNumbers) {
        return bigNumbers.map((bigNumber) => {
            return bigNumber.toNumber();
        })
    }
})