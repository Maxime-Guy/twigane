// Admin utility functions

const ADMIN_EMAIL = 'guymaximebakunzi@gmail.com';

export const isAdmin = (user) => {
  return user?.email === ADMIN_EMAIL;
};

export const getAdminEmail = () => {
  return ADMIN_EMAIL;
};

export const shouldShowLearnerFeatures = (user) => {
  return !isAdmin(user);
};

export const shouldShowAdminFeatures = (user) => {
  return isAdmin(user);
};

export const getDefaultRedirectPath = (user) => {
  return isAdmin(user) ? '/admin' : '/dashboard';
};

export const getWelcomeMessage = (user) => {
  if (isAdmin(user)) {
    return 'Welcome, Administrator';
  }
  return `Welcome, ${user?.displayName || user?.email?.split('@')[0] || 'Learner'}`;
}; 