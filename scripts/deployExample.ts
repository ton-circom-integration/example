import { toNano } from 'ton-core';
import { Example } from '../wrappers/Example';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const example = provider.open(Example.createFromConfig({}, await compile('Example')));

    await example.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(example.address);

    // run methods on `example`
}
