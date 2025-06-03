// ==UserScript==
// @name         AEM Sites: RTE Auto-closer
// @description  Suppress that awful "Please exit Source-edit mode before saving the changes" message
// @namespace    accendgroup
// @author       Dave Hughes <dave@accendgroup.com>
// @version      1.0.1
// @match        http*://*/editor.html/*
// @icon         https://cdn.iconscout.com/icon/premium/png-256-thumb/rte-file-11548104-9409932.png?f=webp&w=256
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
