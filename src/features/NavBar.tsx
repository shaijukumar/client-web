import React, { useContext } from 'react'
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../app/store/rootStore';


const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/' >
          <img src="/assets/logo1.png" alt="logo" style={{ marginRight: 10 }} />
              AppShare
            </Menu.Item>

        <Menu.Item name='Pages' as={NavLink} to='/PageItemList' />

        {/* <Menu.Item>
          <Button as={NavLink} to='/PageItemEdit' positive content='Create Page' />
        </Menu.Item> */}

        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}

      </Container>

    </Menu>
  )
}

export default observer(NavBar);