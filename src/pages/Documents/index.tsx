import { observer } from 'mobx-react'

import styles from './style.module.scss'
import Document from '@pages/Document'
import { useStore } from '@libs/store'

const Documents = observer(() => {
  const store = useStore()

  return (
    <div className={styles.wrap}>
      {store.tabs.map((tab, i) => (
        <Document
          index={i}
          visible={store.activeTab === i}
          key={`${tab.namespace}/${tab.dataset}/${tab.collection.collection}`}
          ref={(ref: any) => (tab.ref = ref)}
        />
      ))}
    </div>
  )
})

export default Documents
