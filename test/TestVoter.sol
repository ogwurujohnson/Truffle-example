pragma solidity >=0.4.0 <0.7.0;

import "truffle/Assert.sol";
import "../contracts/Voter.sol";


contract TestVoter {
    function testVoteForOptionUsingNumericIndex() public {
        Voter voter = new Voter();
        voter.addOption("one");
        voter.addOption("two");

        voter.startVoting();

        voter.voteInt(0);
        uint[] memory votes = voter.getVotes();
        uint[] memory expected = new uint[](2);

        expected[0] = 1;
        expected[1] = 0;
        Assert.equal(votes, expected, "First option should be voted for");
    }
}