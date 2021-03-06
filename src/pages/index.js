import React from 'react';
import { withPrefix } from 'gatsby-link';

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args);

    // Skip build, Browsers only
    if (typeof window !== 'undefined') {

        const langKey = 'en'
        const homeUrl = withPrefix(`/${langKey}/`);

        // I don`t think this is the best solution
        // I would like to use Gatsby Redirects like: 
        // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
        // But Gatsby Redirects are static, they need to be specified at build time,
        // This redirect is dynamic, It needs to know the user browser language.
        // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4
         window.___history.replace(homeUrl);
    }
  }

  render() {
    return (<div />);
  }
}

export default RedirectIndex;