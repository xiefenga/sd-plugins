import React, { Component } from 'react';
import { Upload as AntdUpload } from 'antd';
import utils from '@/utils';
import PropTypes from 'prop-types';

const { getCookie } = utils;

class Dragger extends Component {
  static propTypes = {
    children: PropTypes.any
  };
  render() {
    const headers = {};
    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    return (
      <AntdUpload {...this.props} headers={headers}>
        {this.props.children}
      </AntdUpload>
    );
  }
}

export default Dragger;