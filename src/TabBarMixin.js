import React from 'react';
import classnames from 'classnames';

const tabBarExtraContentStyle = {
  float: 'right',
};

export default {
  getDefaultProps() {
    return {
      styles: {},
    };
  },
  onTabClick(key) {
    this.props.onTabClick(key);
  },
  getTabs() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const clsPrefix = props.clsPrefix;

    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const key = child.key;
      let cls = activeKey === key ? `${clsPrefix}-tab-active` : '';
      cls += ` ${clsPrefix}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${clsPrefix}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }
      rst.push(<div
        role="tab"
        aria-disabled={child.props.disabled ? 'true' : 'false'}
        aria-selected={activeKey === key ? 'true' : 'false'}
        {...events}
        className={cls}
        key={key}
        {...ref}
      >
        {child.props.tab}
      </div>);
    });

    return rst;
  },
  getRootNode(contents) {
    const { clsPrefix, onKeyDown, className, extraContent, style } = this.props;
    const cls = classnames({
      [`${clsPrefix}-bar`]: 1,
      [className]: !!className,
    });
    return (
      <div
        role="tablist"
        className={cls}
        tabIndex="0"
        ref="root"
        onKeyDown={onKeyDown}
        style={style}
      >
        {extraContent ?
          (<div
            style={tabBarExtraContentStyle}
            key="extra"
          >
            {extraContent}
          </div>) : null}
        {contents}
      </div>);
  },
};
