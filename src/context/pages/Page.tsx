import React from 'react';

// single page
interface Props {
  id: string;
  component: React.ReactNode;
  default?: boolean;
}
function Page(props: Props) {
  return <>{props.component}</>;
}

export default Page;
