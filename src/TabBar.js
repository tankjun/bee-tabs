import React from 'react';
import TabBarMixin from './TabBarMixin';
import createClass from 'create-react-class';

const TabBar = createClass({
  mixins: [TabBarMixin],
  render() {
    const tabs = this.getTabs();
    return this.getRootNode(tabs);
  },
});

export default TabBar;
