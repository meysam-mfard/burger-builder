import React from 'react';

const layout = ( props ) => (
  <>
    <div>Toolbar, Sidedrawer, Bachdrop</div>
    <main>
        {props.children}
    </main>
  </>
);

export default layout;