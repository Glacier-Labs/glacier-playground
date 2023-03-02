import { useWeb3React } from '@web3-react/core'

import styles from './style.module.scss'
import * as util from '@libs/util'
import { Space, Button, Dropdown, Menu } from '@arco-design/web-react'
import { IconDown } from '@arco-design/web-react/icon'

export default function Header() {
  const { account } = useWeb3React()

  const logout = () => {
    localStorage.setItem('logout', '1')
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/favicon.svg" alt="" />
        <span>Glacier Playground</span>
      </div>
      <Space size="medium">
        {!!account && (
          <Dropdown
            position="br"
            droplist={
              <Menu>
                <Menu.Item key="Logout" onClick={logout}>
                  Disconnect
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text">
              {util.shortAccount(account)}
              <IconDown />
            </Button>
          </Dropdown>
        )}
        <Button
          href="https://testnet.scan.glacier.io/"
          type="default"
          target="_blank"
        >
          Glacier Scan
        </Button>
      </Space>
    </header>
  )
}
