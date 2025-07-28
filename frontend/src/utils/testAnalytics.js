// Test Analytics Utility
// Use this in the browser console to verify analytics are working

import analyticsService from '../services/analyticsService';

export const testAnalytics = {
  
  // Test if Firebase is properly initialized
  async checkFirebaseConnection() {
    console.log('🔍 Testing Firebase connection...');
    try {
      const testData = await analyticsService.getUserDashboardData('test@example.com');
      console.log('✅ Firebase connection successful');
      console.log('📊 Default dashboard data:', testData);
      return true;
    } catch (error) {
      console.error('❌ Firebase connection failed:', error);
      return false;
    }
  },

  // Test user activity tracking
  async testUserActivity(userEmail = 'test@example.com') {
    console.log('🧪 Testing user activity tracking...');
    try {
      const activityId = await analyticsService.trackUserActivity(
        userEmail,
        'chat',
        { test: true, message: 'Test activity' }
      );
      
      if (activityId) {
        console.log('✅ Activity tracking successful:', activityId);
        return true;
      } else {
        console.warn('⚠️ Activity tracking returned null');
        return false;
      }
    } catch (error) {
      console.error('❌ Activity tracking failed:', error);
      return false;
    }
  },

  // Test quiz result tracking
  async testQuizTracking(userEmail = 'test@example.com') {
    console.log('📝 Testing quiz result tracking...');
    try {
      const quizId = await analyticsService.trackQuizResult(userEmail, {
        score: 8,
        percentage: 80,
        totalQuestions: 10,
        category: 'test',
        difficulty: 'beginner'
      });

      if (quizId) {
        console.log('✅ Quiz tracking successful:', quizId);
        return true;
      } else {
        console.warn('⚠️ Quiz tracking returned null');
        return false;
      }
    } catch (error) {
      console.error('❌ Quiz tracking failed:', error);
      return false;
    }
  },

  // Test admin analytics
  async testAdminAnalytics() {
    console.log('👨‍💼 Testing admin analytics...');
    try {
      const analytics = await analyticsService.getAdminAnalytics();
      console.log('✅ Admin analytics retrieved:', analytics);
      return true;
    } catch (error) {
      console.error('❌ Admin analytics failed:', error);
      return false;
    }
  },

  // Run all tests
  async runAllTests(userEmail = 'test@example.com') {
    console.log('🚀 Running complete analytics test suite...');
    console.log('================================');
    
    const results = {
      firebaseConnection: await this.checkFirebaseConnection(),
      userActivity: await this.testUserActivity(userEmail),
      quizTracking: await this.testQuizTracking(userEmail),
      adminAnalytics: await this.testAdminAnalytics()
    };

    console.log('================================');
    console.log('📊 Test Results Summary:');
    console.log('Firebase Connection:', results.firebaseConnection ? '✅' : '❌');
    console.log('User Activity:', results.userActivity ? '✅' : '❌');
    console.log('Quiz Tracking:', results.quizTracking ? '✅' : '❌');
    console.log('Admin Analytics:', results.adminAnalytics ? '✅' : '❌');

    const allPassed = Object.values(results).every(result => result);
    
    if (allPassed) {
      console.log('🎉 All analytics tests passed! Your system is ready.');
    } else {
      console.log('⚠️ Some tests failed. Check Firebase configuration.');
    }

    return results;
  },

  // Check environment configuration
  checkEnvironment() {
    console.log('🔍 Checking environment configuration...');
    
    const requiredVars = [
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_AUTH_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_STORAGE_BUCKET',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
      'REACT_APP_FIREBASE_APP_ID'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length === 0) {
      console.log('✅ All required environment variables are set');
      return true;
    } else {
      console.error('❌ Missing environment variables:', missingVars);
      console.log('💡 Add these to your frontend/.env file');
      return false;
    }
  }
};

// Make it globally available for console testing
if (typeof window !== 'undefined') {
  window.testAnalytics = testAnalytics;
}

export default testAnalytics; 