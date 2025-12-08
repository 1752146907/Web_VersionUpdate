import React, { useState } from 'react';
import { useVersionCheck } from './hooks/useVersionCheck';
import { VersionUpdateModal } from './components/VersionUpdateModal';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';


function App() {
  const { showUpdate, newVersion, handleRefresh, currentVersion } = useVersionCheck();
  const [modalVisible, setModalVisible] = useState(false);

  // 当检测到更新时显示弹窗
  React.useEffect(() => {
    if (showUpdate) {
      setModalVisible(true);
    }
  }, [showUpdate]);

  const handleModalCancel = () => {
    setModalVisible(false);
  };

   
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> 
      <div
          className="App-link"
           onClick={() => {
        handleRefresh()
      }}>检测</div>
      </header>
      <header style={{ padding: 20 }}>
        <h1>React 版本更新检测示例</h1>
        <p>当前版本: v{currentVersion}</p>
        <p>新版本发布时会自动提示更新</p>
      </header>


      <VersionUpdateModal
        visible={modalVisible}
        newVersion={newVersion}
        currentVersion={currentVersion}
        onRefresh={handleRefresh}
        onCancel={handleModalCancel}
      />
    </div>
  );
}

export default App;
