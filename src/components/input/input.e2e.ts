import { newE2EPage } from '@stencil/core/testing';
describe(`Input`, () => {

    it(`Propagates wcsChange event when a key stroke occurs on the native input`, async () => {
        // Given
        const page = await newE2EPage({
            html: `
                    <wcs-input />
                `
        });
        const select = await page.find('wcs-input');
        const input_wrapper = await page.find('wcs-input >>> input');
        const changeSpy = await select.spyOnEvent('wcsChange');

        // When
        await input_wrapper.press('A');
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(changeSpy).toHaveReceivedEventDetail({ value: 'A' });
    });

    it(`Propagates wcsInput event when a key stroke occurs on the native input`, async () => {
        // Given
        const page = await newE2EPage({
            html: `
                    <wcs-input />
                `
        });
        const select = await page.find('wcs-input');
        const input_wrapper = await page.find('wcs-input >>> input');
        const changeSpy = await select.spyOnEvent('wcsInput');

        // When
        await input_wrapper.press('A');
        await page.waitForChanges();

        // Then
        expect(changeSpy).toHaveReceivedEventTimes(1);
        console.dir(changeSpy.firstEvent); // TODO: fix the test (Quantum behaviour for now...)
        expect(changeSpy).toHaveReceivedEventDetail({ data: 'A' });
    });
});
