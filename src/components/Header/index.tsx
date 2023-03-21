import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import styles from './style.module.scss'
import UdLogo from '@assets/imgs/ud_logo.svg'
import * as util from '@libs/util'
import * as service from '@libs/service'
import { Space, Button, Dropdown, Menu } from '@arco-design/web-react'
import { IconDown } from '@arco-design/web-react/icon'

export default function Header() {
  const { account } = useWeb3React()
  const [ready, setReady] = useState(false)
  const [domain, setDomain] = useState('')

  const logout = () => {
    localStorage.setItem('logout', '1')
    window.location.reload()
  }

  useEffect(() => {
    if (!account) return
    service
      .domains([account])
      .then(data => {
        if (data.data.length) {
          setDomain(data.data[0].meta.domain)
          setReady(true)
        } else {
          setDomain('')
        }
      })
      .finally(() => {
        setReady(true)
      })
  }, [account])

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="https://www.glacier.io/" target="_blank" rel="noreferrer">
        <img src="/favicon.svg" alt="" />
        <span>Glacier Playground</span>
      </a>
      <Space size="medium">
        {ready && !!account && (
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
              <div className={styles.account}>
                {!!domain ? (
                  <a
                    className={styles.domain}
                    href={`https://ud.me/${domain}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={UdLogo} alt="" />
                    <span>{domain}</span>
                  </a>
                ) : (
                  util.shortAccount(account)
                )}
                <IconDown />
              </div>
            </Button>
          </Dropdown>
        )}
        <Button
          href="https://testnet.scan.glacier.io/"
          type="outline"
          target="_blank"
        >
          Glacier Scan
        </Button>
      </Space>
    </header>
  )
}
