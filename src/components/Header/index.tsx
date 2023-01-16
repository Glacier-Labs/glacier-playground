import { useWeb3React } from '@web3-react/core'

import styles from './style.module.scss'
import * as util from '@libs/util'
import { Space, Button } from '@arco-design/web-react'

export default function Header() {
  const { account } = useWeb3React()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src="/favicon.svg" alt="" />
        <span>Glacier Playground</span>
      </div>
      <Space size="medium">
        {!!account && <span>{util.shortAccount(account)}</span>}
        <Button
          href="https://testnet.scan.glacier.io/"
          type="primary"
          shape="round"
          target="_blank"
        >
          Glacier Scan
        </Button>
      </Space>
    </header>
  )
}
