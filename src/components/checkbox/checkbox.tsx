import { Component, Prop, Event, Element, EventEmitter } from '@stencil/core';
import { CheckboxChangeEventDetail } from './checkbox-interface';


@Component({
    tag: 'wcs-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true
})
export class Checkbox {
    private checkboxId = `wcs-checkbox-${checkboxIds++}`;

    @Element() el: HTMLElement;

    @Prop() name = this.checkboxId;

    @Prop() value: any;

    /**
     * If `true`, the checkbox is selected.
     */
    @Prop({ mutable: true }) checked = false;

    /**
     * Emitted when the checked property has changed.
     */
    @Event() wcsChange!: EventEmitter<CheckboxChangeEventDetail>;

    handleChange(event) {
        this.checked = event.path[0].checked;
        this.wcsChange.emit({
            checked: this.checked,
            value: this.value
        });
    }

    render() {
        return (
            <label htmlFor={this.name} class="container">
                <input onChange={(evt) => this.handleChange(evt)} checked={this.checked} class="wcs-checkbox" type="checkbox" name={this.name} id={this.name}></input>
                <span class="checkmark"></span>
                <span class="text">
                    <slot />
                </span>
            </label>
        );
    }
}

let checkboxIds = 0;
