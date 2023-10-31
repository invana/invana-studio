import React from 'react';
import { Container, Header, Content } from 'rsuite';
import DefaultLayoutSidebar from '../sidebar/sidebar';


const DefaultLayout = ({ children, header }: { children: any, header?: any }) => {
  const [expand, setExpand] = React.useState(false);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <DefaultLayoutSidebar expand={expand} />
        <Container>
          <Header>
            {header}
          </Header>
          <Content>{children}</Content>
        </Container>
      </Container>
    </div>
  );
};


export default DefaultLayout;