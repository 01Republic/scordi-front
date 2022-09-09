import React from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useCurrentUser } from '^hooks/useCurrentUser';

export const UserEditPageRoute: PageRoute = {
  pathname: '/users/edit',
  path: () => UserEditPageRoute.pathname,
}

const UserEditPage = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <>UserEditPage</>
  );
};

export default UserEditPage;
