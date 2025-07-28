import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  increment,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../firebase/config';

class AnalyticsService {
  constructor() {
    this.initialized = !!db;
    if (!this.initialized) {
      console.warn('Firestore not initialized. Analytics will be limited.');
    }
  }

  // Helper function to remove undefined values
  filterUndefinedValues(obj) {
    if (!obj || typeof obj !== 'object') {
      return {};
    }
    
    const filtered = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'object' && !Array.isArray(value)) {
          const nestedFiltered = this.filterUndefinedValues(value);
          if (Object.keys(nestedFiltered).length > 0) {
            filtered[key] = nestedFiltered;
          }
        } else {
          filtered[key] = value;
        }
      }
    }
    return filtered;
  }

  // User Activity Tracking
  async trackUserActivity(userEmail, activityType, details = {}) {
    if (!this.initialized || !userEmail) return null;

    try {
      // Filter out undefined values from details
      const filteredDetails = this.filterUndefinedValues(details);
      
      const activity = {
        userEmail,
        type: activityType,
        details: filteredDetails,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
      };

      console.log('📝 Tracking activity with filtered data:', JSON.stringify(activity, null, 2));

      // Add to activities collection
      const activityRef = await addDoc(collection(db, 'activities'), activity);
      
      // Update user stats
      await this.updateUserStats(userEmail, activityType);
      
      // Update daily active users
      await this.updateDailyActiveUsers(userEmail);

      return activityRef.id;
    } catch (error) {
      console.error('❌ Error tracking user activity:', error);
      console.error('❌ Activity type:', activityType, 'User:', userEmail);
      console.error('❌ Details:', details);
      return null;
    }
  }

  // Update User Statistics
  async updateUserStats(userEmail, activityType) {
    console.log('📊 Updating user stats - Activity:', activityType, 'User:', userEmail);
    if (!this.initialized) return;

    try {
      const userStatsRef = doc(db, 'userStats', userEmail);
      const userStatsDoc = await getDoc(userStatsRef);

      // Map activity types to correct field names
      const fieldNameMap = {
        'chat': 'chatCount',
        'translation': 'translationCount', 
        'quiz': 'quizAttempts',
        'pronunciation': 'pronunciationCount'
      };

      const fieldName = fieldNameMap[activityType] || `${activityType}Count`;

      const updateData = {
        lastActive: serverTimestamp(),
        totalActivities: increment(1),
        [fieldName]: increment(1)
      };

      if (userStatsDoc.exists()) {
        await updateDoc(userStatsRef, updateData);
        console.log('✅ Updated existing user stats - Field:', fieldName, 'incremented');
      } else {
        await setDoc(userStatsRef, {
          userEmail,
          createdAt: serverTimestamp(),
          ...updateData,
          chatCount: activityType === 'chat' ? 1 : 0,
          translationCount: activityType === 'translation' ? 1 : 0,
          quizAttempts: activityType === 'quiz' ? 1 : 0,
          pronunciationCount: activityType === 'pronunciation' ? 1 : 0,
        });
        console.log('✅ Created new user stats document with activity:', activityType);
      }
    } catch (error) {
      console.error('❌ Error updating user stats:', error);
    }
  }

  // Track Quiz Results
  async trackQuizResult(userEmail, quizData) {
    if (!this.initialized || !userEmail) return null;

    try {
      // Filter out undefined values and provide defaults
      const filteredQuizData = this.filterUndefinedValues(quizData);
      
      const quizResult = {
        userEmail,
        score: filteredQuizData.score || 0,
        percentage: filteredQuizData.percentage || 0,
        totalQuestions: filteredQuizData.totalQuestions || 0,
        category: filteredQuizData.category || 'mixed',
        difficulty: filteredQuizData.difficulty || 'mixed',
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0]
      };

      console.log('📝 Tracking quiz result with filtered data:', JSON.stringify(quizResult, null, 2));

      // Add quiz result
      const quizRef = await addDoc(collection(db, 'quizResults'), quizResult);

      // Update user quiz stats
      const userStatsRef = doc(db, 'userStats', userEmail);
      await updateDoc(userStatsRef, {
        totalQuizScore: increment(quizData.percentage),
        quizAttempts: increment(1),
        lastQuizScore: quizData.percentage,
        bestQuizScore: quizData.percentage > 80 ? quizData.percentage : increment(0)
      });

      return quizRef.id;
    } catch (error) {
      console.error('❌ Error tracking quiz result:', error);
      console.error('❌ User:', userEmail);
      console.error('❌ Quiz data:', quizData);
      return null;
    }
  }

  // Update Daily Active Users
  async updateDailyActiveUsers(userEmail) {
    if (!this.initialized) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const dailyStatsRef = doc(db, 'dailyStats', today);
      
      await updateDoc(dailyStatsRef, {
        activeUsers: arrayUnion(userEmail),
        date: today,
        lastUpdated: serverTimestamp()
      }).catch(async () => {
        // Document doesn't exist, create it
        await setDoc(dailyStatsRef, {
          activeUsers: [userEmail],
          date: today,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
      });
    } catch (error) {
      console.error('Error updating daily active users:', error);
    }
  }

  // Get User Dashboard Data
  async getUserDashboardData(userEmail) {
    console.log('🔍 Analytics Service - Getting dashboard data for:', userEmail);
    console.log('🔍 Analytics Service - Initialized:', this.initialized);
    
    if (!this.initialized || !userEmail) {
      console.log('⚠️ Analytics Service - Not initialized or no email, returning default data');
      return this.getDefaultDashboardData();
    }

    try {
      // Get user stats
      console.log('📊 Analytics Service - Fetching user stats from Firestore...');
      const userStatsRef = doc(db, 'userStats', userEmail);
      const userStatsSnap = await getDoc(userStatsRef);
      
      if (!userStatsSnap.exists()) {
        console.log('⚠️ Analytics Service - No user stats found, returning default data');
        return this.getDefaultDashboardData();
      }

      console.log('✅ Analytics Service - User stats found:', userStatsSnap.data());

      const userStats = userStatsSnap.data();

      // Get recent activities (simplified query to avoid index requirement)
      console.log('📊 Fetching activities for user...');
      const activitiesQuery = query(
        collection(db, 'activities'),
        where('userEmail', '==', userEmail),
        limit(20) // Get more and sort in JavaScript
      );
      
      let recentActivities = [];
      try {
        const activitiesSnap = await getDocs(activitiesQuery);
        recentActivities = activitiesSnap.docs
          .map(doc => doc.data())
          .sort((a, b) => {
            // Sort by timestamp in JavaScript instead of Firestore
            const timeA = a.timestamp?.toDate?.() || new Date(a.timestamp) || new Date();
            const timeB = b.timestamp?.toDate?.() || new Date(b.timestamp) || new Date();
            return timeB - timeA;
          })
          .slice(0, 10); // Take top 10
        console.log('✅ Activities fetched:', recentActivities.length);
      } catch (activitiesError) {
        console.warn('⚠️ Activities query failed, continuing without activities:', activitiesError);
        recentActivities = [];
      }

      // Get recent quiz scores (simplified query)
      console.log('📊 Fetching quiz results for user...');
      const quizQuery = query(
        collection(db, 'quizResults'),
        where('userEmail', '==', userEmail),
        limit(20) // Get more and sort in JavaScript
      );
      
      let quizScores = [];
      try {
        const quizSnap = await getDocs(quizQuery);
        quizScores = quizSnap.docs
          .map(doc => ({
            score: doc.data().percentage,
            date: doc.data().date,
            timestamp: doc.data().timestamp
          }))
          .sort((a, b) => {
            // Sort by timestamp in JavaScript
            const timeA = a.timestamp?.toDate?.() || new Date(a.timestamp) || new Date();
            const timeB = b.timestamp?.toDate?.() || new Date(b.timestamp) || new Date();
            return timeB - timeA;
          })
          .slice(0, 10); // Take top 10
        console.log('✅ Quiz results fetched:', quizScores.length);
      } catch (quizError) {
        console.warn('⚠️ Quiz query failed, continuing without quiz history:', quizError);
        quizScores = [];
      }

      // Calculate achievements
      const achievements = this.calculateAchievements(userStats);

      // Generate recommendations
      const recommendations = this.generateRecommendations(userStats);

      const quizAttempts = (userStats.quizAttempts || userStats.quizCount) || 0;
      const dashboardData = {
        overview: {
          total_interactions: userStats.totalActivities || 0,
          quiz_attempts: quizAttempts,
          avg_quiz_score: quizAttempts > 0 ? 
            Math.round((userStats.totalQuizScore || 0) / quizAttempts) : 0,
          learning_streak: this.calculateLearningStreak(recentActivities)
        },
        progress: {
          chat_interactions: userStats.chatCount || 0,
          translations_made: userStats.translationCount || 0,
          pronunciation_practice: userStats.pronunciationCount || 0,
          quiz_scores: quizScores
        },
        achievements,
        recommendations,
        recent_activities: recentActivities.slice(0, 5)
      };

      console.log('🎯 Analytics Service - Returning dashboard data:', JSON.stringify(dashboardData, null, 2));
      return dashboardData;

    } catch (error) {
      console.error('Error getting user dashboard data:', error);
      return this.getDefaultDashboardData();
    }
  }

  // Get Admin Analytics
  async getAdminAnalytics() {
    if (!this.initialized) return this.getDefaultAdminData();

    try {
      // Get total users count
      const userStatsSnap = await getDocs(collection(db, 'userStats'));
      const totalUsers = userStatsSnap.size;

      // Get today's active users
      const today = new Date().toISOString().split('T')[0];
      const dailyStatsRef = doc(db, 'dailyStats', today);
      const dailyStatsSnap = await getDoc(dailyStatsRef);
      const todayActiveUsers = dailyStatsSnap.exists() ? 
        (dailyStatsSnap.data().activeUsers || []).length : 0;

      // Calculate totals from user stats
      let totalInteractions = 0;
      let totalQuizAttempts = 0;
      let totalQuizScore = 0;
      let chatInteractions = 0;
      let translationRequests = 0;
      let pronunciationRequests = 0;

      userStatsSnap.forEach(doc => {
        const data = doc.data();
        totalInteractions += data.totalActivities || 0;
        // Handle both old (quizCount) and new (quizAttempts) field names for backward compatibility
        totalQuizAttempts += (data.quizAttempts || data.quizCount) || 0;
        totalQuizScore += data.totalQuizScore || 0;
        chatInteractions += data.chatCount || 0;
        translationRequests += data.translationCount || 0;
        pronunciationRequests += data.pronunciationCount || 0;
      });

      const avgQuizScore = totalQuizAttempts > 0 ? 
        Math.round(totalQuizScore / totalQuizAttempts) : 0;

      // Get recent activities for admin view
      const recentActivitiesQuery = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      const recentActivitiesSnap = await getDocs(recentActivitiesQuery);
      const recentActivities = recentActivitiesSnap.docs.map(doc => ({
        ...doc.data(),
        user_email: doc.data().userEmail,
        type: doc.data().type
      }));

      return {
        overview: {
          total_users: totalUsers,
          daily_active_users: todayActiveUsers,
          total_interactions: totalInteractions,
          system_uptime: "Online" // This would be calculated from server start time
        },
        feature_usage: {
          chat_interactions: chatInteractions,
          translation_requests: translationRequests,
          quiz_attempts: totalQuizAttempts,
          pronunciation_requests: pronunciationRequests
        },
        user_engagement: {
          total_quiz_attempts: totalQuizAttempts,
          avg_quiz_score: avgQuizScore,
          active_users_today: todayActiveUsers
        },
        system_health: {
          teaching_model_loaded: true,
          tts_system_loaded: true,
          translation_model_loaded: true,
          error_count: 0
        },
        recent_activities: recentActivities
      };

    } catch (error) {
      console.error('Error getting admin analytics:', error);
      return this.getDefaultAdminData();
    }
  }

  // Get All Users for Admin
  async getAllUsersForAdmin() {
    if (!this.initialized) return [];

    try {
      const userStatsSnap = await getDocs(collection(db, 'userStats'));
      const users = userStatsSnap.docs.map(doc => {
        const data = doc.data();
        const quizAttempts = (data.quizAttempts || data.quizCount) || 0;
        return {
          email: data.userEmail,
          total_quiz_attempts: quizAttempts,
          avg_quiz_score: quizAttempts > 0 ? 
            Math.round((data.totalQuizScore || 0) / quizAttempts) : 0,
          chat_interactions: data.chatCount || 0,
          translation_requests: data.translationCount || 0,
          pronunciation_requests: data.pronunciationCount || 0,
          total_activities: data.totalActivities || 0,
          last_active: data.lastActive ? 
            data.lastActive.toDate().toISOString() : 'Never'
        };
      });

      return users.sort((a, b) => b.total_activities - a.total_activities);
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Helper Methods
  calculateAchievements(userStats) {
    const quizAttempts = (userStats.quizAttempts || userStats.quizCount) || 0;
    return {
      first_chat: (userStats.chatCount || 0) >= 1,
      first_quiz: quizAttempts >= 1,
      quiz_master: (userStats.bestQuizScore || 0) >= 80,
      consistent_learner: (userStats.totalActivities || 0) >= 10,
      translation_explorer: (userStats.translationCount || 0) >= 5
    };
  }

  generateRecommendations(userStats) {
    const recommendations = [];
    const quizAttempts = (userStats.quizAttempts || userStats.quizCount) || 0;
    
    if ((userStats.chatCount || 0) < 3) {
      recommendations.push("Try having more conversations to improve your speaking skills");
    }
    if ((userStats.translationCount || 0) < 5) {
      recommendations.push("Practice translation to expand your vocabulary");
    }
    if (quizAttempts < 2) {
      recommendations.push("Take quizzes to test your knowledge");
    }
    if ((userStats.pronunciationCount || 0) < 3) {
      recommendations.push("Practice pronunciation to improve your accent");
    }

    return recommendations;
  }

  calculateLearningStreak(activities) {
    if (!activities || activities.length === 0) return 0;
    
    // Simple streak calculation - count consecutive days with activity
    const uniqueDates = [...new Set(activities.map(a => a.date))].sort().reverse();
    let streak = 0;
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expected = expectedDate.toISOString().split('T')[0];
      
      if (uniqueDates[i] === expected) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  getDefaultDashboardData() {
    return {
      overview: {
        total_interactions: 0,
        quiz_attempts: 0,
        avg_quiz_score: 0,
        learning_streak: 0
      },
      progress: {
        chat_interactions: 0,
        translations_made: 0,
        pronunciation_practice: 0,
        quiz_scores: []
      },
      achievements: {
        first_chat: false,
        first_quiz: false,
        quiz_master: false,
        consistent_learner: false,
        translation_explorer: false
      },
      recommendations: [
        "Start by having your first conversation",
        "Try translating some basic words",
        "Take a quiz to test your knowledge"
      ],
      recent_activities: []
    };
  }

  getDefaultAdminData() {
    return {
      overview: {
        total_users: 0,
        daily_active_users: 0,
        total_interactions: 0,
        system_uptime: "Unknown"
      },
      feature_usage: {
        chat_interactions: 0,
        translation_requests: 0,
        quiz_attempts: 0,
        pronunciation_requests: 0
      },
      user_engagement: {
        total_quiz_attempts: 0,
        avg_quiz_score: 0,
        active_users_today: 0
      },
      system_health: {
        teaching_model_loaded: false,
        tts_system_loaded: false,
        translation_model_loaded: false,
        error_count: 0
      },
      recent_activities: []
    };
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService; 