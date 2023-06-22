import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, TupleItem } from 'ton-core';

export type ExampleConfig = {};

export function exampleConfigToCell(config: ExampleConfig): Cell {
    return beginCell().endCell();
}

export class Example implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Example(address);
    }

    static createFromConfig(config: ExampleConfig, code: Cell, workchain = 0) {
        const data = exampleConfigToCell(config);
        const init = { code, data };
        return new Example(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getVerify(provider: ContractProvider, args: TupleItem[]) {
        const res = await provider.get('verify', args)
        return {
            result: res.stack.readBoolean(),
            gasUsed: res.gasUsed ?? undefined,
        }
    }
}
