import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardIndex = () => {
  const nav = useNavigate();

  useEffect(() => {
    nav('notarize');
  }, []);

  return null;
};
