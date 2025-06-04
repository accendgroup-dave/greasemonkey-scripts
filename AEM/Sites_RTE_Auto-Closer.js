// ==UserScript==
// @name         AEM Sites: RTE Auto-closer
// @description  Suppress that awful "Please exit Source-edit mode before saving the changes" message
// @namespace    accendgroup
// @author       Dave Hughes <dave@accendgroup.com>
// @version      1.0.3
// @match        http*://*/editor.html/*
// @icon         data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20width%3D%2218%22%3E%3Cdefs%3E%3Cstyle%3E%20%20%20%20%20%20.fill%20%7B%20%20%20%20%20%20%20%20fill%3A%20%23464646%3B%20%20%20%20%20%20%7D%20%20%20%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3ES%20FileCode%2018%20N%3C%2Ftitle%3E%3Crect%20id%3D%22Canvas%22%20fill%3D%22%23ff13dc%22%20opacity%3D%220%22%20width%3D%2218%22%20height%3D%2218%22%20%2F%3E%3Cpolygon%20class%3D%22fill%22%20points%3D%2210%201%2010%206%2015%206%2010%201%22%20%2F%3E%3Cpath%20class%3D%22fill%22%20d%3D%22M9.5%2C7A.5.5%2C0%2C0%2C1%2C9%2C6.5V1H3.5a.5.5%2C0%2C0%2C0-.5.5v15a.5.5%2C0%2C0%2C0%2C.5.5h11a.5.5%2C0%2C0%2C0%2C.5-.5V7ZM7.2835%2C14.6125a.1285.1285%2C0%2C0%2C1-.1045.204H5.807a.12851.12851%2C0%2C0%2C1-.103-.05l-1.7305-2.309L5.704%2C10.15a.128.128%2C0%2C0%2C1%2C.103-.05H7.179a.1285.1285%2C0%2C0%2C1%2C.1045.2035L5.531%2C12.4585Zm1.3835.9225-.9335-.0005a.257.257%2C0%2C0%2C1-.2475-.326l1.8725-6.706a.25749.25749%2C0%2C0%2C1%2C.25-.188H10.54a.257.257%2C0%2C0%2C1%2C.2475.326L8.914%2C15.347A.257.257%2C0%2C0%2C1%2C8.667%2C15.535Zm3.6285-.77a.13.13%2C0%2C0%2C1-.103.05H10.821a.1285.1285%2C0%2C0%2C1-.1045-.204l1.7525-2.155-1.7525-2.155a.1285.1285%2C0%2C0%2C1%2C.1045-.2035h1.372a.1295.1295%2C0%2C0%2C1%2C.103.05l1.7305%2C2.3075Z%22%20%2F%3E%3C%2Fsvg%3E
// @grant        none
// ==/UserScript==

/* globals $*/
(function() {
    'use strict';

    const css = (color) => `font-size: 3em; color: ${color}`;
    console.log('%cAEM Sites: %cRTE Auto-closer %cENABLED', css('red'), css('blue'), css('green'));

    const dialogCloseBtnSelector = 'button.cq-dialog-submit';
    const rteToggleSelector = 'button[icon=fileCode].is-selected';
    const rteSelector = '[data-cq-richtext-editable]';

    let attachRteCloseHandler = (event) =>
        $(dialogCloseBtnSelector).click(async (event) => {
            let enabledRtes = $(rteToggleSelector);

            /* if there are any open RTEs, preventDefault */
            enabledRtes.length && event.preventDefault();

            /* close the RTEs by clicking their source buttons */
            $(rteSelector).blur();
            enabledRtes.click();

            /* wait 100ms then submit the dialog again */
            await new Promise(r => setTimeout(r, 100));
            $(dialogCloseBtnSelector).click();
        });

    /* in case a dialog is already open */
    attachRteCloseHandler();

    /* attach to all new dialogs */
    $(document).on('dialog-ready', attachRteCloseHandler);
})();
