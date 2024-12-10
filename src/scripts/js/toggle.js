"use strict";
/*#################################################################################
   ####     ####    ##  ##    ####    ######   #####    #####      ####
 ###   #   ## ##    ##  ##   ## ##    ##       ##  ##   ##  ##      ##
 ##        ## ##    ### ##   ## ##    ##       ##  ##   ##  ##      ##
  ######   ######  #### ##   ######  ######   ######   ######      ##
      ##  ##   ##  ## ###   ##   ##  ##       ##       ####        ##
 ##  ##   ##   ##  ##  ##   ##   ##  ##       ##       ## ##    #  ##
  ####    ##   ##  ##  ##   ##   ##  #####    ##       ##  ###  ####

  * Copyright 2024 SanaePRJ. All Rights Reserved.
#################################################################################*/
/**
 * Immediately invoked function expression (IIFE) that adds custom CSS styles to the document.
 * This function creates and appends a style element to the document's head, defining hover effects
 * for elements with classes 'toggle-up' and 'toggle-down'.
 *
 * @remarks
 * The added styles create a visual indicator (^ for up, v for down) when hovering over
 * elements with the respective classes.
 *
 * @returns {void}
 */
(() => {
    const style = document.createElement("style");
    style.textContent = `
        .toggle-up:hover::after {
            font-family: sans-serif;
            color: gray;
            content: " ^";
        }
        .toggle-down:hover::after {
            font-family: sans-serif;
            color: gray;
            content: " v";
        }
    `;
    document.head.appendChild(style);
})();
const hideClass = "toggle-down";
const revealClass = "toggle-up";
// 渡されたエレメントに対し表示/非表示を切り替えるトグルを設定する関数
function initToggleSection(titleElement, targetElement, initHide = true) {
    // 初期状態に応じて、タイトルとコンテンツを表示/非表示にする
    if (!titleElement.classList.contains(hideClass) && !titleElement.classList.contains(revealClass)) {
        titleElement.classList.add(initHide ? revealClass : hideClass);
        targetElement.style.display = initHide ? "block" : "none";
    }
    // タイトルをクリックすると、コンテンツを表示/非表示に切り替える
    titleElement.addEventListener("click", () => {
        const isBlock = targetElement.style.display === "block";
        targetElement.style.display = isBlock ? "none" : "block";
        titleElement.classList.toggle(hideClass, isBlock);
        titleElement.classList.toggle(revealClass, !isBlock);
    });
}
/**
 * Initializes a toggle section by querying for title and target elements and setting up the toggle functionality.
 * Queryで指定しトグルを設定する関数
 *
 * @param titleQuery - A CSS selector string to query for the title element.
 * @param targetQuery - A CSS selector string to query for the target element (content to be toggled).
 * @param initHide - Optional boolean parameter to set the initial visibility state of the target element.
 *                   If true (default), the target element is initially hidden. If false, it's initially visible.
 *
 * @returns void
 *
 * @remarks
 * This function uses document.querySelector to find the title and target elements based on the provided queries.
 * If both elements are found, it calls initToggleSection to set up the toggle functionality.
 */
function initToggleSectionByQuery(titleQuery, targetQuery, initHide = true) {
    const titleElement = document.querySelectorAll(titleQuery);
    const targetElement = document.querySelectorAll(targetQuery);
    if (titleElement && targetElement && titleElement.length == targetElement.length) {
        for (let i = 0; i < titleElement.length; i++)
            initToggleSection(titleElement[i], targetElement[i], initHide);
    }
}
/**
 * Initializes toggle functionality for all sections within the main element of the document.
 * This function searches for all div elements that are direct children of the main element,
 * and sets up toggle behavior for each section's title (h2) and its following content.
 * main直下のdiv要素のh2をタイトルとして直下の要素をコンテンツとしてトグルを設定する関数
 *
 * @param initHide - A boolean flag determining the initial visibility state of the sections.
 *                   If true (default), sections are initially hidden.
 *                   If false, sections are initially visible.
 *
 * @returns void
 *
 * @remarks
 * This function assumes a specific DOM structure where each section is a div directly under
 * the main element, with an h2 element as the title and the next sibling element as the
 * toggleable content. It uses the initToggleSection function to set up the toggle behavior.
 */
function initToggleSectionsAll(initHide = true) {
    const sectionElements = document.querySelectorAll("main > div");
    sectionElements.forEach(section => {
        const titleElement = section.querySelector("h2");
        const targetElement = titleElement.nextElementSibling;
        if (titleElement && targetElement) {
            initToggleSection(titleElement, targetElement, initHide);
        }
    });
}
/**
 * Initializes toggle functionality for sections based on the provided title and content class names.
 *
 * This function finds elements with the specified title class, then searches for the nearest
 * sibling element with the specified content class. It sets up a toggle mechanism to show/hide
 * the content element when the title element is clicked.
 *
 * @param {string} titleClass - The class name for the title elements to be used as toggles. Default is "toggle-title".
 * @param {string} targetClass - The class name for the content elements to be toggled. Default is "toggle-content".
 * @param {boolean} initHide - A boolean indicating whether the content should be hidden initially. Default is true.
 *
 * @example
 * // Initializes toggle sections for elements with "toggle-title" as the title class
 * // and "toggle-content" as the content class, hiding the content initially.
 * initToggleSectionsByClass("toggle-title", "toggle-content", true);
 *
 * @throws {Error} Will throw an error if no elements with the specified content class are found.
 *
 * @returns {void}
 */
function initToggleSectionsByClass(titleClass = "toggle-title", targetClass = "toggle-content", initHide = true) {
    const titleElements = document.querySelectorAll(`.${titleClass}`);
    titleElements.forEach(titleElement => {
        let nextElement = titleElement.nextElementSibling;
        while (nextElement && !nextElement.classList.contains(targetClass)) {
            nextElement = nextElement.nextElementSibling;
        }
        if (nextElement) {
            initToggleSection(titleElement, nextElement, initHide);
        }
        else {
            console.warn(`No element found with class "${targetClass}" within`, titleElement);
        }
    });
}
