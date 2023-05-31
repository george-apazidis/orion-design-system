import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';

export type TabSelectionEvent = { tabIndex: number };

export type Direction = 'right' | 'left';

/**
 * @slot default - default slot for the tab labels
 */
@Component({
  tag: 'orion-tabs',
  styleUrl: 'orion-tabs.css',
  shadow: true,
})
export class OrionTabs {
  @Element() el!: HTMLElement;

  /**
   * Default and current active tab index
   */
  @Prop({ reflect: true, mutable: true }) activeTab = 0;

  /**
   * Component will scroll to the starting active tab
   */
  @Prop() scrollToStartingActiveTab = false;

  /**
   * The minimum width for tabs
   */
  @Prop({ reflect: true }) minTabWidth = '104px';

  /**
   * Emits event when a tab header is clicked
   */
  @Event() orionTabSelected!: EventEmitter<TabSelectionEvent>;

  // how many <orion-tab> children are present
  @State() tabCount = 0;

  // how many <orion-tab-panel> children are present
  @State() panelCount = 0;

  // details about each tab's visibility and position
  @State() intersectionMap: Record<string, { isVisible: boolean; isLeft: boolean; isRight: boolean }> = {};

  // how many tabs are out of view to the left
  @State() tabsToTheLeft = 0;

  // how many tabs are out of view to the right
  @State() tabsToTheRight = 0;

  // position of the currently active tab
  @State() activeTabSide: 'left' | 'middle' | 'right' = 'middle';

  // tracking if keyboard focus has stayed within the tab list
  @State() focused = false;

  private tabsList!: HTMLElement;

  private tabButtons: HTMLButtonElement[] = [];

  private slotEl!: HTMLSlotElement;

  private observer!: IntersectionObserver;

  private isMouseDown = false;

  private startingMouseX = 0;

  private currentMouseX = 0;

  componentDidLoad() {
    this.parseChildren();
    this.orionTabSelected.emit({ tabIndex: this.activeTab });
  }

  componentDidUpdate() {
    // On the very first componentDidUpdate, the observer will be null
    // waiting until this step insures that the first render has happened and the slots are populated
    if (!this.observer) {
      if (this.scrollToStartingActiveTab) {
        this.scrollToActiveTab();
      }
      // wait until the scroll is done
      setTimeout(() => {
        this.setupIntersection();
      });
    }
  }

  @Watch('activeTab')
  onActiveTabChange() {
    this.computeActiveTabSide();
    this.orionTabSelected.emit({ tabIndex: this.activeTab });
  }

  private scrollToActiveTab = () => {
    const { x, width } = this.tabButtons[this.activeTab].getBoundingClientRect();
    this.tabsList.scrollLeft = x - width / 2;
  };

  private parseChildren = () => {
    if (!this.slotEl) return;
    let tabCount = 0;
    let panelCount = 0;
    this.slotEl.assignedElements().forEach(ele => {
      // assign each generic slot to a specific slot based on component type
      if (ele.tagName === 'ORION-TAB-PANEL') {
        ele.setAttribute('slot', `orion-tab-content-${panelCount}`);
        ele.setAttribute('for', this.el.id);
        ele.setAttribute('panel-index', panelCount.toString());
        panelCount += 1;
      } else if (ele.tagName === 'ORION-TAB') {
        ele.setAttribute('slot', `orion-tab-slot-${tabCount}`);
        tabCount += 1;
      } else {
        // console.warn('Non-slotted element in component');
      }
    });
    this.tabCount = tabCount;
    this.panelCount = panelCount;
  };

  private setupIntersection() {
    if (this.observer) this.observer.disconnect();
    this.intersectionMap = {};

    const options = {
      root: this.tabsList,
      rootMargin: '0px',
      threshold: [0.8, 0.2],
    };
    this.observer = new IntersectionObserver(this.intersectionCallback, options);

    const tabs = this.tabsList.querySelectorAll('.orion-tabs__list-item');
    tabs.forEach(element => {
      this.observer.observe(element);
    });
  }

  private intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    const { width: parentWidth, left: parentLeft } = this.el.getBoundingClientRect();
    let newIntersectionMap = { ...this.intersectionMap };
    entries.forEach(entry => {
      const { boundingClientRect, target, isIntersecting } = entry;
      const middlePosition = (boundingClientRect.x as number) + boundingClientRect.width / 2 - parentLeft;
      const isLeft = middlePosition < 0;
      const isRight = middlePosition > parentWidth;
      newIntersectionMap = { ...newIntersectionMap, [(target as Element).id]: { isVisible: isIntersecting as boolean, isLeft, isRight } };
    });
    this.intersectionMap = newIntersectionMap;
  };

  @Watch('intersectionMap')
  computeOffscreenButtonCounts() {
    let rightCount = 0;
    let leftCount = 0;
    Object.values(this.intersectionMap).forEach(({ isVisible, isLeft, isRight }) => {
      if (isVisible) return;
      if (isLeft) leftCount += 1;
      else if (isRight) rightCount += 1;
    });
    this.tabsToTheLeft = leftCount;
    this.tabsToTheRight = rightCount;
    this.computeActiveTabSide();
  }

  private getTabId = (index = this.activeTab) => `${this.el.id}-tab-${index}`;

  private computeActiveTabSide() {
    const activeId = this.getTabId();
    if (!this.intersectionMap[activeId]) return;

    const { isVisible, isLeft, isRight } = this.intersectionMap[activeId];
    if (isVisible) this.activeTabSide = 'middle';
    else if (isLeft) this.activeTabSide = 'left';
    else if (isRight) this.activeTabSide = 'right';
  }

  private onSideBtnClick = (direction: Direction) => {
    if (direction === 'left' && this.tabsToTheLeft === 1) {
      this.tabsList.scrollLeft = 0;
    } else if (direction === 'right' && this.tabsToTheRight === 1) {
      this.tabsList.scrollLeft = this.tabsList.scrollWidth as number;
    } else if (this.tabButtons.length > 0) {
      const buttonWidth = this.tabButtons[0].getBoundingClientRect().width;
      this.tabsList.scrollLeft += (direction === 'right' ? 1 : -1) * buttonWidth;
    }
  };

  onMouseDown = (e: MouseEvent) => {
    this.startingMouseX = e.x as number;
    this.currentMouseX = e.x as number;
    this.isMouseDown = true;
  };

  onMouseMove = (e: MouseEvent) => {
    if (this.isMouseDown) {
      this.tabsList.classList.add('orion-tabs__list--held');
      const scrollDiff = this.currentMouseX - e.x;
      if (this.tabsList) this.tabsList.scrollLeft += scrollDiff;
      this.currentMouseX = e.x as number;
    }
  };

  private resetMouse = () => {
    this.tabsList.classList.remove('orion-tabs__list--held');
    this.isMouseDown = false;
  };

  onMouseUp = (e: MouseEvent) => {
    if (e.x === this.startingMouseX) {
      this.resetMouse();
    } else {
      setTimeout(() => {
        this.resetMouse();
      });
    }
  };

  onMouseLeave = () => {
    this.resetMouse();
  };

  private onTabSelected = (tabIndex: number) => {
    if (this.isMouseDown) return;
    this.activeTab = tabIndex;
  };

  /**
   * When the list has gained focus
   * If the focus is coming in from another element, update our intersection observers
   */
  private onListFocusIn = () => {
    if (this.focused) return;
    this.focused = true;
    this.setupIntersection();
  };

  /**
   * When list has lost focus
   * Make sure that focus has left the list, and not just gone from one button to another
   */
  private onListFocusOut = (e: FocusEvent) => {
    const focusMovedTo = e.relatedTarget as Element;
    if (!focusMovedTo) {
      this.focused = false;
      return;
    }
    const currentListItem = focusMovedTo.parentElement as HTMLElement;
    const isFocusedContained = Array.from(this.tabsList.childNodes).includes(currentListItem);
    this.focused = isFocusedContained;
  };

  private onButtonKeyDown = (e: KeyboardEvent, tabIndex: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (tabIndex < this.tabButtons.length - 1) {
        this.tabButtons[tabIndex + 1].focus();
      } else {
        this.tabButtons[0].focus();
        this.setupIntersection();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (tabIndex > 0) {
        this.tabButtons[tabIndex - 1].focus();
      } else {
        this.tabButtons[this.tabButtons.length - 1].focus();
        this.setupIntersection();
      }
    }
  };

  private getNavButtonClasses(direction: Direction) {
    const isVisible = direction === 'left' ? this.tabsToTheLeft > 0 : this.tabsToTheRight > 0;
    return `
      orion-tabs__nav-button
      orion-tabs__nav-button--${direction}
      orion-tabs__nav-button--${isVisible ? 'visible' : 'hidden'}
      ${this.activeTabSide === direction ? 'orion-tabs__nav-button--offscreen-selection' : ''}
    `;
  }

  private getTabItemClasses(isActive: boolean) {
    return `
      orion-tabs__list-item
      orion-tabs__list-item--${isActive ? 'active' : 'inactive'}
    `;
  }

  render() {
    const inlineCSS: Record<string, string> = {
      minWidth: this.minTabWidth,
    };

    return (
      <Host>
        <nav class="orion-tabs">
          <slot
            ref={el => {
              this.slotEl = el as HTMLSlotElement;
            }}
          ></slot>
          <button onClick={() => this.onSideBtnClick('left')} class={this.getNavButtonClasses('left')} tabIndex={-1}>
            <i class="orion-icon orion-icon-chevron_left"></i>
            {Math.max(1, this.tabsToTheLeft)}
          </button>
          <button onClick={() => this.onSideBtnClick('right')} class={this.getNavButtonClasses('right')} tabIndex={-1}>
            {Math.max(1, this.tabsToTheRight)}
            <i class="orion-icon orion-icon-chevron_right"></i>
          </button>
          <ul
            class="orion-tabs__list"
            ref={el => {
              this.tabsList = el as HTMLElement;
            }}
            role="tablist"
            tabIndex={-1}
            onFocusout={this.onListFocusOut}
            onFocusin={this.onListFocusIn}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onMouseLeave={this.onMouseLeave}
          >
            {[...Array(this.tabCount)].map((_, tabIndex) => {
              const isActive = this.activeTab === tabIndex;
              return (
                <li id={this.getTabId(tabIndex)} class={this.getTabItemClasses(isActive)} style={inlineCSS}>
                  <button
                    onKeyDown={e => this.onButtonKeyDown(e, tabIndex)}
                    tabIndex={isActive ? 0 : -1}
                    role="tab"
                    aria-selected={isActive.toString()}
                    class="orion-tabs__list-button"
                    onClick={() => this.onTabSelected(tabIndex)}
                    ref={el => {
                      this.tabButtons[tabIndex] = el as HTMLButtonElement;
                    }}
                  >
                    <slot name={`orion-tab-slot-${tabIndex}`}></slot>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        {[...Array(this.panelCount)].map((_, tabIndex) => {
          return <slot name={`orion-tab-content-${tabIndex}`}></slot>;
        })}
      </Host>
    );
  }
}
