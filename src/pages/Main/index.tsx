import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Select, Button, Space } from '@arco-design/web-react'
import { IconPlus, IconUserAdd } from '@arco-design/web-react/icon'

import styles from './style.module.scss'
import { ReactComponent as IconFolder } from '@assets/imgs/folder.svg'
import { useStore } from '@libs/store'
import Documents from '@pages/Documents'
import DatasetNode from '@components/DatasetNode'
import * as modals from '@libs/modals'

const Main = observer(() => {
  const store = useStore()
  const { account, library } = useWeb3React<Web3Provider>()

  useEffect(() => {
    if (!account || !library) return
    store.connect(store.endpoint, account!, library.provider)
  }, [account, library, store])

  return (
    <>
      <div className={styles.top}>
        <Space size="large">
          <Select
            value={store.currentSpace}
            onChange={value => store.setCurrentSpace(value)}
            style={{ minWidth: '200px' }}
          >
            {store.spaces.map((item, i) => (
              <Select.Option value={item} key={i}>
                <div className={styles.option}>
                  <IconFolder className={styles.icon} /> {item}
                </div>
              </Select.Option>
            ))}
          </Select>
          <span>Datasets: {store.datasets.length}</span>
        </Space>
        <Button
          type="primary"
          href="https://www.glacier.io/referral/"
          target="_blank"
          icon={<IconUserAdd />}
        >Invite</Button>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <Button type="primary" long onClick={() => modals.createNamespace()}>
            Create a new Namespace
          </Button>
          <Button
            type="outline"
            long
            icon={<IconPlus />}
            onClick={() => {
              modals.createDataset()
            }}
          >
            Create Dataset
          </Button>
          <div>
            {store.datasets.map((item, i) => (
              <DatasetNode
                dataset={item}
                key={i}
                onMenuClick={action => {
                  if (action === 'createCollection') {
                    modals.createCollection(item)
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.main}>
          {store.tabs.length > 0 && <Documents />}
        </div>
      </div>
    </>
  )
})

export default Main
