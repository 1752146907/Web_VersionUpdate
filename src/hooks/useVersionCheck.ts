import { useState, useEffect, useRef } from 'react';

const VERSION_CHECK_INTERVAL = 1 * 60 * 1000; // 1分钟检查一次
const VERSION_FILE = '/versionData.json?v=' + Date.now(); // 加时间戳避免缓存

export const useVersionCheck = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [newVersion, setNewVersion] = useState('');
  const currentVersionRef = useRef('');

  useEffect(() => {
    // 首次加载时获取当前版本
    fetchVersion().then(data => {
      if (data?.version) {
        currentVersionRef.current = data.version;
        console.log('当前版本:', currentVersionRef.current);
      }
    });

    // 定时检查版本更新
    const intervalId = setInterval(checkVersionUpdate, VERSION_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const fetchVersion = async (): Promise<{ version: string } | null> => {
    try {
      const response = await fetch(VERSION_FILE, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('获取版本信息失败:', error);
      return null;
    }
  };

  const checkVersionUpdate = async () => {
    try {
      const data = await fetchVersion();
      if (!data || !data.version) return;

      console.log('检查版本更新:', {
        当前版本: currentVersionRef.current,
        最新版本: data.version
      });

      if (data.version !== currentVersionRef.current) {
        setNewVersion(data.version);
        setShowUpdate(true);
      }
    } catch (error) {
      console.error('版本检查失败:', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    showUpdate,
    newVersion,
    handleRefresh,
    currentVersion: currentVersionRef.current
  };
};