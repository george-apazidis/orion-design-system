import { Component, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

import classnames from 'classnames';

@Component({
  tag: 'orion-stepper',
  styleUrl: 'orion-stepper.css',
  shadow: true,
})
export class OrionStepper {
  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * Shows error state
   */
  @Prop() error = false;

  /**
   * Hide the current tally
   */
  @Prop() hideTally = false;

  /**
   * The current value
   */
  @Prop({ reflect: true, mutable: true }) value = 0;

  /**
   * Step size to increment/decrement
   */
  @Prop() step = 1;

  /**
   * Min value that the stepper can be decremented to
   */
  @Prop() min = 0;

  /**
   * Max value that the stepper can be incremented to
   */
  @Prop() max = 100;

  @Listen('keydown')
  private handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Home') {
      ev.preventDefault();
      this.value = this.min;
    }
    if (ev.key === 'End') {
      ev.preventDefault();
      this.value = this.max;
    }
  }

  /**
   * CustomEvent `detail` will be the new value
   */
  @Event() valueChanged!: EventEmitter<{ value: number }>;

  private onInputChangeValue(event: Event) {
    this.value = parseInt((event.target as HTMLInputElement).value);
    this.valueChanged.emit({ value: this.value });
  }

  subtract() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.valueChanged.emit({ value: this.value });
    }
  }

  add() {
    if (this.value < this.max) {
      this.value += this.step;
      this.valueChanged.emit({ value: this.value });
    }
  }

  isAddDisabled() {
    return this.value >= this.max;
  }

  isSubstractDisabled() {
    return this.value <= this.min;
  }

  isError() {
    return this.value < this.min || this.value > this.max;
  }

  getCSSClass() {
    return classnames({
      'orion-stepper--hide-tally': this.hideTally, // this class is applied when the hideTally prop is true
      'orion-stepper--error': (this.error || this.isError()) && !this.disabled, // this class is applied if the error prop is true and the disabled prop is false
    });
  }

  render() {
    return (
      <div class={`orion-stepper ${this.getCSSClass()}`}>
        <button
          class="orion-stepper__button orion-stepper__button-left"
          disabled={this.disabled || this.isSubstractDisabled()}
          onClick={this.subtract.bind(this)}
          aria-label="subtract"
        >
          <div class="svg-container__mobile">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <path
                d="M1,13 L23,13 C23.5522847,13 24,12.5522847 24,12 C24,11.4477153 23.5522847,11 23,11 L1,11 C0.44771525,11 -6.76353751e-17,11.4477153 0,12 C6.76353751e-17,12.5522847 0.44771525,13 1,13 Z"
                id="path-1"
              ></path>
            </svg>
          </div>
          <div class="svg-container__desktop">
            <svg width="16px" height="16px" viewBox="0 0 16 16">
              <path
                d="M0.5,8.5 L15.5,8.5 C15.7761424,8.5 16,8.27614237 16,8 C16,7.72385763 15.7761424,7.5 15.5,7.5 L0.5,7.5 C0.223857625,7.5 -3.38176876e-17,7.72385763 0,8 C3.38176876e-17,8.27614237 0.223857625,8.5 0.5,8.5 Z"
                id="path-1"
              ></path>
            </svg>
          </div>
        </button>
        <input
          onKeyDown={this.handleKeyDown.bind(this)}
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          id="stepper"
          step={this.step}
          min={this.min}
          max={this.max}
          value={this.value}
          disabled={this.disabled}
          onInput={this.onInputChangeValue.bind(this)}
          role="spinbutton"
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          aria-valuenow={this.value}
        />
        <button class="orion-stepper__button orion-stepper__button-right" disabled={this.disabled || this.isAddDisabled()} onClick={this.add.bind(this)} aria-label="add">
          <div class="svg-container__mobile">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <path
                d="M13,11 L23,11 C23.5522847,11 24,11.4477153 24,12 C24,12.5522847 23.5522847,13 23,13 L13,13 L13,23 C13,23.5522847 12.5522847,24 12,24 C11.4477153,24 11,23.5522847 11,23 L11,13 L1,13 C0.44771525,13 -3.01980663e-14,12.5522847 -3.01980663e-14,12 C-3.01980663e-14,11.4477153 0.44771525,11 1,11 L11,11 L11,1 C11,0.44771525 11.4477153,0 12,0 C12.5522847,0 13,0.44771525 13,1 L13,11 Z"
                id="path-1"
              ></path>
            </svg>
          </div>
          <div class="svg-container__desktop">
            <svg width="16px" height="16px" viewBox="0 0 16 16">
              <path
                d="M8.66666667,7.33333333 L15.3333333,7.33333333 C15.7015232,7.33333333 16,7.63181017 16,8 C16,8.36818983 15.7015232,8.66666667 15.3333333,8.66666667 L8.66666667,8.66666667 L8.66666667,15.3333333 C8.66666667,15.7015232 8.36818983,16 8,16 C7.63181017,16 7.33333333,15.7015232 7.33333333,15.3333333 L7.33333333,8.66666667 L0.666666667,8.66666667 C0.298476833,8.66666667 -1.95399252e-14,8.36818983 -1.95399252e-14,8 C-1.95399252e-14,7.63181017 0.298476833,7.33333333 0.666666667,7.33333333 L7.33333333,7.33333333 L7.33333333,0.666666667 C7.33333333,0.298476833 7.63181017,0 8,0 C8.36818983,0 8.66666667,0.298476833 8.66666667,0.666666667 L8.66666667,7.33333333 Z"
                id="path-1"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    );
  }
}
