import { Selector } from 'testcafe';
const aSearchStrings = ["Bront", "Rave"];

fixture`Getting Started`
    .page`http://localhost:4004/vue/index.html`;

test('Check if title is Capire Books', async t => {

    //t is test controller object. https://devexpress.github.io/testcafe/documentation/reference/test-api/testcontroller/

    const sHeaderTitle = await Selector('#app').child('h1').innerText;
    await t.expect(sHeaderTitle).eql('Capire Books');
});


aSearchStrings.forEach(data => {
    test(`Should return correct results when Searched for '${data}' i`, async t => {
        await t
            .typeText(`input[type="text"]`, data)

        await t.expect(Selector('#app #books tbody tr').innerText).contains(data, `${data} search didn't return correct results`, { timeout: 500 });

        const tableRows = await Selector('#app #books tbody tr');
        const count = await tableRows.count;

        for (var i = 0; i < count; i++){
            await t.expect(tableRows.nth(i).innerText).contains(data,`${i} row has ${data}`);
        }

    });
});

