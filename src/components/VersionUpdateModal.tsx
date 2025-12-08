import React from 'react';
import { Modal, Button } from 'antd';

interface VersionUpdateModalProps {
  visible: boolean;
  newVersion: string;
  currentVersion: string;
  onRefresh: () => void;
  onCancel: () => void;
}

export const VersionUpdateModal: React.FC<VersionUpdateModalProps> = ({
  visible,
  newVersion,
  currentVersion,
  onRefresh,
  onCancel
}) => {
  return (
    <Modal
      title="🔔 发现新版本"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="later" onClick={onCancel}>
          稍后
        </Button>,
        <Button key="refresh" type="primary" onClick={onRefresh}>
          立即刷新
        </Button>
      ]}
      centered
      closable={false}
      maskClosable={false}
    >
      <div style={{ padding: '20px 0' }}>
        <p>检测到新版本发布，请刷新页面获取最新内容。</p>
        <div style={{ marginTop: 16 }}>
          <p><strong>当前版本:</strong> v{currentVersion}</p>
          <p><strong>最新版本:</strong> v{newVersion}</p>
        </div>
        <p style={{ marginTop: 16, color: '#666' }}>
          <small>温馨提示：刷新前请确保已保存所有工作</small>
        </p>
      </div>
    </Modal>
  );
};