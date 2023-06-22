import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, Dictionary, beginCell, toNano } from 'ton-core';
import { Example } from '../wrappers/Example';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Example', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Example');
    });

    let blockchain: Blockchain;
    let example: SandboxContract<Example>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        example = blockchain.openContract(Example.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await example.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: example.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and example are ready to use
    });

    it('should verify correct proof', async () => {
        const res = await example.getVerify([
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b7aab8e11ea3bb6ac8f46fbe2a7f4c08d240d9e5df463dcc82c069617e91a0d93e60c71a86a84e2939791c91f3d7b90d', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b41a02bfac541656280100bf9bb6e4c72d59c6b239ca30bb8c38206ac2316e2a7f394d654763ae25a2c32ee1aa24b70b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('a24972d2bf37627e7a0b4ec296ef53e84c4417c5a0c45217a2717e07ad9928bc8bbc2b890629ae9331ade77121938f3e', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('805a9bfd2fd332618ed567c69178d0752eb8ec966ce257b9559245b51550ba46003796799941eb93d1542f0360d4194b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('ac4ab093b27a26c82534028981d774351f90e188dddb6db25d5cada2e20861d3de2c9ccff739b99f0c28f5984b6edf1f', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('972a7041797cff72c24594d9b1fc74e96c85d5bafc0fe0453ca626776b68488f0d51c975e4db574ae9c10687c1d57a27', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b51f484e771713690cd5616a6410f12f9fa903b84df731463a2f46b0040ad1fb3a7957cc9add5f79112978726140f4a4', 'hex')).endCell() },
            { type: 'int', value: 1658353297856893210819666545516494914336300628488733805505314978368519941698n },
            { type: 'int', value: 12045051556160558802837955449984380669081157779078391975507844082035866557074n },
            { type: 'int', value: 17544596135520496731167215523805210455320105166382607114617926713466056355368n },
            { type: 'int', value: 32221950462345295057861417807090315053189756269482030115482334163791092821505n },
            { type: 'int', value: 11883107352566605421514971296725214410375332662305599702662210231765309598987n },
            { type: 'int', value: 35325712060022784082344103314208628380851068153143251592689018040198792954745n },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('8eaef062f0577a60ecd58e7df93cf4921cfcb53eb01b7112f167a907276aa2b939532bf9471079ea778ba0c5d5baac2c', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('94222f97fe0af814e8f689ff78c4933bdd7acedb1a888c451d556ab2cb3d880afb2edec1c528dbee2159b0ce5640a2f2', 'hex')).endCell() },
            { type: 'cell', cell: ((vs: bigint[]): Cell => {
                const d = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256));

                for (let i = 0; i < vs.length; i++) {
                    d.set(i, vs[i]);
                }

                const b = beginCell();
                d.storeDirect(b);

                return b.endCell();
            })([0n]) }
        ]);

        expect(res.result).toBe(true);

        console.log('gas used', res.gasUsed);
    });

    it('should not verify correct proof with wrong inputs', async () => {
        const res = await example.getVerify([
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b7aab8e11ea3bb6ac8f46fbe2a7f4c08d240d9e5df463dcc82c069617e91a0d93e60c71a86a84e2939791c91f3d7b90d', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b41a02bfac541656280100bf9bb6e4c72d59c6b239ca30bb8c38206ac2316e2a7f394d654763ae25a2c32ee1aa24b70b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('a24972d2bf37627e7a0b4ec296ef53e84c4417c5a0c45217a2717e07ad9928bc8bbc2b890629ae9331ade77121938f3e', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('805a9bfd2fd332618ed567c69178d0752eb8ec966ce257b9559245b51550ba46003796799941eb93d1542f0360d4194b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('ac4ab093b27a26c82534028981d774351f90e188dddb6db25d5cada2e20861d3de2c9ccff739b99f0c28f5984b6edf1f', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('972a7041797cff72c24594d9b1fc74e96c85d5bafc0fe0453ca626776b68488f0d51c975e4db574ae9c10687c1d57a27', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b51f484e771713690cd5616a6410f12f9fa903b84df731463a2f46b0040ad1fb3a7957cc9add5f79112978726140f4a4', 'hex')).endCell() },
            { type: 'int', value: 1658353297856893210819666545516494914336300628488733805505314978368519941698n },
            { type: 'int', value: 12045051556160558802837955449984380669081157779078391975507844082035866557074n },
            { type: 'int', value: 17544596135520496731167215523805210455320105166382607114617926713466056355368n },
            { type: 'int', value: 32221950462345295057861417807090315053189756269482030115482334163791092821505n },
            { type: 'int', value: 11883107352566605421514971296725214410375332662305599702662210231765309598987n },
            { type: 'int', value: 35325712060022784082344103314208628380851068153143251592689018040198792954745n },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('8eaef062f0577a60ecd58e7df93cf4921cfcb53eb01b7112f167a907276aa2b939532bf9471079ea778ba0c5d5baac2c', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('94222f97fe0af814e8f689ff78c4933bdd7acedb1a888c451d556ab2cb3d880afb2edec1c528dbee2159b0ce5640a2f2', 'hex')).endCell() },
            { type: 'cell', cell: ((vs: bigint[]): Cell => {
                const d = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256));

                for (let i = 0; i < vs.length; i++) {
                    d.set(i, vs[i]);
                }

                const b = beginCell();
                d.storeDirect(b);

                return b.endCell();
            })([1n]) } // the public input was changed
        ]);

        expect(res.result).toBe(false);

        console.log('gas used', res.gasUsed);
    });

    it('should not verify incorrect proof', async () => {
        const res = await example.getVerify([
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b7aab8e11ea3bb6ac8f46fbe2a7f4c08d240d9e5df463dcc82c069617e91a0d93e60c71a86a84e2939791c91f3d7b90d', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b41a02bfac541656280100bf9bb6e4c72d59c6b239ca30bb8c38206ac2316e2a7f394d654763ae25a2c32ee1aa24b70b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('a24972d2bf37627e7a0b4ec296ef53e84c4417c5a0c45217a2717e07ad9928bc8bbc2b890629ae9331ade77121938f3e', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('805a9bfd2fd332618ed567c69178d0752eb8ec966ce257b9559245b51550ba46003796799941eb93d1542f0360d4194b', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('ac4ab093b27a26c82534028981d774351f90e188dddb6db25d5cada2e20861d3de2c9ccff739b99f0c28f5984b6edf1f', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('972a7041797cff72c24594d9b1fc74e96c85d5bafc0fe0453ca626776b68488f0d51c975e4db574ae9c10687c1d57a27', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('b51f484e771713690cd5616a6410f12f9fa903b84df731463a2f46b0040ad1fb3a7957cc9add5f79112978726140f4a4', 'hex')).endCell() },
            { type: 'int', value: 1658353297856893210819666545516494914336300628488733805505314978368519941699n }, // this int was changed
            { type: 'int', value: 12045051556160558802837955449984380669081157779078391975507844082035866557074n },
            { type: 'int', value: 17544596135520496731167215523805210455320105166382607114617926713466056355368n },
            { type: 'int', value: 32221950462345295057861417807090315053189756269482030115482334163791092821505n },
            { type: 'int', value: 11883107352566605421514971296725214410375332662305599702662210231765309598987n },
            { type: 'int', value: 35325712060022784082344103314208628380851068153143251592689018040198792954745n },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('8eaef062f0577a60ecd58e7df93cf4921cfcb53eb01b7112f167a907276aa2b939532bf9471079ea778ba0c5d5baac2c', 'hex')).endCell() },
            { type: 'slice', cell: beginCell().storeBuffer(Buffer.from('94222f97fe0af814e8f689ff78c4933bdd7acedb1a888c451d556ab2cb3d880afb2edec1c528dbee2159b0ce5640a2f2', 'hex')).endCell() },
            { type: 'cell', cell: ((vs: bigint[]): Cell => {
                const d = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256));

                for (let i = 0; i < vs.length; i++) {
                    d.set(i, vs[i]);
                }

                const b = beginCell();
                d.storeDirect(b);

                return b.endCell();
            })([0n]) }
        ]);

        expect(res.result).toBe(false);

        console.log('gas used', res.gasUsed);
    });
});
