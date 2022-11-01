import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { property, observe, customElement } from "@polymer/decorators";

import { __decorate } from "cl-polymer-element-helpers/cl-helpers.js";

import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";

import { clKeyboardAccessibilityHelper } from "cl-polymer-element-helpers/cl-keyboard-accessibility-helper.js";

import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/iron-icon/iron-icon.js";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerIconButtonTemplate;
let clPolymerIconButtonTemplateDefault;
let clPolymerIconButtonBase = mixinBehaviors([], PolymerElement);
class clPolymerIconButton extends clPolymerIconButtonBase {
    constructor() {
        super();
        this.compact = false;
        this.tooltipPosition = "bottom";
        this.noTooltip = false;
        this.inverted = false;
        this.overlay = false;
        this.squareRipple = false;
        this.disabled = false;
        this.tabindex = 0;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("focus", this.focusChanged.bind(this));
        this.addEventListener("blur", this.focusChanged.bind(this));
        this.addEventListener("mouseenter", this.onMouseEnterOrFocusIn.bind(this));
        this.addEventListener("focusin", this.onMouseEnterOrFocusIn.bind(this));
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("focus", this.focusChanged.bind(this));
        this.removeEventListener("blur", this.focusChanged.bind(this));
        this.removeEventListener("mouseenter", this.onMouseEnterOrFocusIn.bind(this));
        this.removeEventListener("focusin", this.onMouseEnterOrFocusIn.bind(this));
    }

    focusChanged ( event ) {
        this.ripple && (this.ripple.holdDown = this.keyboardNavigation.isEnabled() && ("focus" === event.type || "focusin" === event.type))
    }
    
    onMouseEnterOrFocusIn ( event ) {
        this.ripple || (this.ripple = this.createRipple(),
        dom(this.root).appendChild(this.ripple),
        this.focusChanged(event))
    }
    
    onTooltipLabelChange() {
        if ( !this.hasAttribute("aria-label") || this.keepAriaLabelSynced)
            this.keepAriaLabelSynced = true,
            this.setAttribute("aria-label", this.tooltipLabel)
    }
    
    onDisabledChanged() {
        this.ripple && (this.ripple.noink = this.disabled)
    }
    
    createRipple() {
        let ripple = document.createElement("paper-ripple");
        this.squareRipple || (ripple.center = true,
        ripple.classList.add("circle"));
        ripple.noink = this.disabled;
        return ripple
    }
    
  	static get template() {
    	if ( void 0 === clPolymerIconButtonTemplate || null === clPolymerIconButtonTemplate) {
            
            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    position: relative;
                } 

                :host:focus {
                    outline: none;
                } 

                :host[disabled] {
                    cursor: auto;
                } 

                iron-icon.remove-defaults {
                    height: 100%;
                    width: 100%;
                    color: inherit;
                } 

                paper-ripple.:host {
                    opacity: 0.6;
                } 

                :host {
                    width: var(--icon-standard-length);
                    height: var(--icon-standard-length);
                    padding: var(--icon-standard-padding);
                } 

                :host[compact] {
                    width: var(--icon-compact-length);
                    height: var(--icon-compact-length);
                    padding: var(--icon-compact-padding);
                } 

                :host {
                    --color-regular: var(--icon-color);
                    --color-focus: var(--icon-focused-color);
                    --color-disabled: var(--icon-disabled-color);
                } 

                :host[inverted] {
                    --color-regular: var(--smm-secondary-text-color-inverse);
                    --color-focus: var(--smm-primary-text-color-inverse);
                    --color-disabled: var(--smm-text-disabled-inverse);
                } 

                :host[overlay] {
                    --color-regular: var(--smm-static-overlay-text-secondary);
                    --color-focus: var(--smm-static-overlay-text-primary);
                    --color-disabled: var(--smm-static-overlay-text-disabled);
                } 

                :host {
                    color: var(--cl-polymer-icon-button-color,var(--color-regular));
                } 

                :host:hover,
                :host[keyboard-focus],
                paper-ripple{
                    color: var(--cl-polymer-icon-button-focus-color,var(--color-focus));
                } 

                :host[disabled] {
                    color: var(--cl-polymer-icon-button-disabled-color,var(--color-disabled));
                }

                .tootip-label {
                    white-space: nowrap;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.011em;
                    line-height: 20px;
                }
            </style>
            <iron-icon class="remove-defaults" icon="[[icon]]"></iron-icon>
            <template is="dom-if" restamp="" if="[[!noTooltip]]">
                <paper-tooltip offset="6" position="[[tooltipPosition]]">
                    <div class="tootip-label">[[tooltipLabel]]</div>
                </paper-tooltip>
            </template>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemplate;
            if (void 0 == clPolymerIconButtonTemplateDefault || null == clPolymerIconButtonTemplateDefault) {
                defaultTemplate = clDefaultTemplate();
                clPolymerIconButtonTemplateDefault = defaultTemplate
            }
            defaultTemplate = clPolymerIconButtonTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemplate.content.cloneNode(true), template.content.firstChild);

            return clPolymerIconButtonTemplate = template;
        }

        return clPolymerIconButtonTemplate;
  	}
}

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerIconButton.prototype, 
    "icon", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerIconButton.prototype, 
    "tooltipLabel", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerIconButton.prototype, 
    "compact", 
    void 0
);

__decorate(
    [
        property({ type: Number })
    ], 
    clPolymerIconButton.prototype, 
    "tooltipPosition", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerIconButton.prototype, 
    "noTooltip", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerIconButton.prototype, 
    "inverted", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerIconButton.prototype, 
    "overlay", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerIconButton.prototype, 
    "squareRipple", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerIconButton.prototype, 
    "disabled", 
    void 0
);

__decorate(
    [
        property({ type: Number, reflectToAttribute: true })
    ], 
    clPolymerIconButton.prototype, 
    "tabindex", 
    void 0
);

__decorate(
    [
        property({ type: Function }),
        observe("tooltipLabel")
    ], 
    clPolymerIconButton.prototype, 
    "onTooltipLabelChange", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("disabled")
    ], 
    clPolymerIconButton.prototype, 
    "onDisabledChanged", 
    null
);

__decorate(
    [
        property({ type: clKeyboardAccessibilityHelper })
    ], 
    clPolymerIconButton.prototype, 
    "keyboardNavigation", 
    void 0
);

clPolymerIconButton = __decorate([
    customElement("cl-polymer-icon-button")
], clPolymerIconButton);

export { clPolymerIconButton };