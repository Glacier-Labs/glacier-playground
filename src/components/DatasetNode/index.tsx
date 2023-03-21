import classnames from 'classnames'
import { observer } from 'mobx-react'
import {
  IconRight,
  IconLoading,
  IconPlus,
  IconEye
} from '@arco-design/web-react/icon'

import styles from './style.module.scss'
import { ReactComponent as IconDatabase } from '@assets/imgs/database.svg'
import { ReactComponent as IconTable } from '@assets/imgs/table.svg'
import { useStore } from '@libs/store'
import { useMemo } from 'react'
import { Button, Empty, Tooltip } from '@arco-design/web-react'
import * as modals from '@libs/modals'

interface Props {
  dataset: string
  onMenuClick: (action: 'createCollection') => void
}

const DatasetNode = observer(({ dataset, onMenuClick }: Props) => {
  const store = useStore()

  const node = useMemo(() => {
    return store.tree[store.currentSpace][dataset]
  }, [dataset, store.currentSpace, store.tree])

  const rootIcon = () => {
    if (node.loading) return <IconLoading className={styles.icon} />
    return (
      <IconRight
        className={classnames(styles.icon, {
          [styles.expanded]: node.expanded
        })}
      />
    )
  }

  return (
    <div className={styles.wrap}>
      <div
        className={classnames(styles.row, styles.head)}
        onClick={() => store.toggleExpand(dataset)}
      >
        {rootIcon()}
        <IconDatabase className={classnames(styles.icon, styles.storage)} />
        <span className={styles.text}>{dataset}</span>
        <Tooltip content="Create Collection" position="bottom">
          <Button
            size="mini"
            icon={<IconPlus />}
            type="primary"
            onClick={e => {
              e.stopPropagation()
              onMenuClick('createCollection')
            }}
          />
        </Tooltip>
      </div>
      <div
        className={classnames(styles.children, {
          [styles.expanded]: node.expanded
        })}
      >
        {node.collections.length === 0 && <Empty />}
        {node.collections.map((item, i) => (
          <div
            className={classnames(styles.row, {
              [styles.active]:
                store.activeTabInfo &&
                store.activeTabInfo.namespace === store.currentSpace &&
                store.activeTabInfo.dataset === dataset &&
                store.activeTabInfo.collection === item
            })}
            key={i}
          >
            <IconTable className={classnames(styles.icon, styles.collection)} />
            <span
              className={styles.text}
              onClick={() => {
                store.openTab({
                  namespace: store.currentSpace,
                  dataset,
                  collection: item
                })
              }}
            >
              {item.collection}
            </span>
            <Tooltip content="View Schema" position="bottom">
              <Button
                size="mini"
                icon={<IconEye />}
                type="primary"
                onClick={e => {
                  e.stopPropagation()
                  modals.viewSchema(item.schema)
                }}
              />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
})

export default DatasetNode
