import { Component, Host, h, Prop } from '@stencil/core';

export type OrionSizeOptions = 'small' | 'medium' | 'large';
@Component({
  tag: 'orion-progress-meter',
  styleUrl: 'orion-progress-meter.css',
  shadow: true,
})
export class OrionProgressMeter {
  /**
   * The current value
   */
  @Prop({ reflect: true, mutable: true }) value = 0;

  /**
   * The maximum possible value
   */
  @Prop() max = 100;

  /**
   * The target value
   */
  @Prop() target = 0;

  /**
   * The percent of target value where progress meter color will change from error to warn (decimal value between 0 and 1)
   */
  @Prop() percentOfTarget = 0.8;

  /**
   * Shows progress meter in circle format
   */
  @Prop() isCircle = false;

  /**
   * Display value in center of circle
   */
  @Prop() showValue = false;

  /**
   * The circle size
   */
  @Prop() size: OrionSizeOptions = 'small';

  /**
   * Amount of segments to divide progress meter into
   */
  @Prop() segments = 1;

  oddSegments: boolean = this.segments % 2 === 1;

  getCSSStyle() {
    let colorVar = '--orion-progress-meter__color-progress';
    if (this.target !== 0) {
      if (this.value >= this.target) {
        colorVar = '--orion-progress-meter__color-success';
      } else if (this.value >= this.target * this.percentOfTarget) {
        colorVar = '--orion-progress-meter__color-warn';
      } else {
        colorVar = '--orion-progress-meter__color-error';
      }
    }

    const percent = (this.value / this.max) * 100;
    const remainder = 100 - percent;

    if (this.isCircle) {
      return { background: `conic-gradient(var(${colorVar}) ${percent}%, 0, var(--orion-progress-meter__color-progess-background) ${remainder}%)` };
    }
    return { background: `linear-gradient(to right, var(${colorVar}) ${percent}%, 0, var(--orion-progress-meter__color-progess-background) ${remainder}%)` };
  }

  getSegmentCSSStyle() {
    return {
      outline: `1px solid var(--orion-progress-meter__color-circle-label)`,
    };
  }

  getCircleSegmentCSSStyle() {
    if (this.oddSegments) {
      return {
        background: `linear-gradient(
        to right,
        transparent 0%,
        transparent 50%,
        var(--orion-progress-meter__color-circle-label) 50%,
        var(--orion-progress-meter__color-circle-label) 100%
        )`,
      };
    }

    return { backgroundColor: `var(--orion-progress-meter__color-circle-label)` };
  }

  render() {
    const component = (
      <div>
        {this.isCircle ? (
          <div class={`orion-progress-meter--circle ${this.size ? `orion-progress-meter--${this.size}` : ''}`} style={this.getCSSStyle()}>
            {this.segments > 1
              ? Array(this.segments)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      class="orion-progress-meter__segment--circle"
                      style={{ transform: `rotate(${(i * 360) / this.segments - 90}deg`, ...this.getCircleSegmentCSSStyle() }}
                    ></div>
                  ))
              : ''}
            <span class="orion-progress-meter--circle__overlay" style={{ backgroundColor: `var(--orion-progress-meter__color-circle-label)` }}>
              {this.showValue ? <span class="orion-progress-meter--circle__value">{this.value}</span> : ''}
            </span>
          </div>
        ) : (
          <div class="orion-progress-meter" style={this.getCSSStyle()}>
            {this.segments > 1
              ? Array(this.segments)
                  .fill(0)
                  .map((_, i) => <div class="orion-progress-meter__segment" style={{ right: `${(i * 100) / this.segments}%`, ...this.getSegmentCSSStyle() }}></div>)
              : ''}
          </div>
        )}
      </div>
    );

    return <Host>{component}</Host>;
  }
}
