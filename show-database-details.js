// Detailed database viewer
const mongoose = require('mongoose');

async function showDetails() {
  try {
    await mongoose.connect('mongodb://localhost:27017/docare');
    console.log('✅ Connected to MongoDB Database: docare\n');
    console.log('='.repeat(60));

    // Users
    console.log('\n👥 USERS:');
    console.log('-'.repeat(60));
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User ID: ${user._id}`);
      console.log(`   Username: ${user.username || 'NOT SET (old user)'}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Contact: ${user.contactNumber}`);
      console.log(`   Address: ${user.address}`);
      console.log(`   Created: ${user.createdAt}`);
    });

    // Donations
    console.log('\n\n📦 DONATIONS:');
    console.log('-'.repeat(60));
    const donations = await mongoose.connection.db.collection('donations').find({}).toArray();
    if (donations.length === 0) {
      console.log('   No donations yet');
    } else {
      donations.forEach((donation, index) => {
        console.log(`\n${index + 1}. Donation ID: ${donation._id}`);
        console.log(`   Item: ${donation.itemName}`);
        console.log(`   Category: ${donation.category}`);
        console.log(`   Condition: ${donation.condition}`);
        console.log(`   Quantity: ${donation.quantity}`);
        console.log(`   Status: ${donation.status}`);
        console.log(`   Donor ID: ${donation.donorId}`);
        console.log(`   Created: ${donation.createdAt}`);
      });
    }

    // Requests
    console.log('\n\n📨 REQUESTS:');
    console.log('-'.repeat(60));
    const requests = await mongoose.connection.db.collection('requests').find({}).toArray();
    if (requests.length === 0) {
      console.log('   No requests yet');
    } else {
      requests.forEach((request, index) => {
        console.log(`\n${index + 1}. Request ID: ${request._id}`);
        console.log(`   Item: ${request.itemName}`);
        console.log(`   Status: ${request.status}`);
        console.log(`   Urgency: ${request.urgency}`);
        console.log(`   Requester ID: ${request.requesterId}`);
        console.log(`   Donation ID: ${request.donationId}`);
        console.log(`   Date: ${request.date}`);
      });
    }

    // Chat Messages
    console.log('\n\n💬 CHAT MESSAGES:');
    console.log('-'.repeat(60));
    const chats = await mongoose.connection.db.collection('chats').find({}).toArray();
    if (chats.length === 0) {
      console.log('   No chat messages yet');
    } else {
      chats.forEach((chat, index) => {
        console.log(`\n${index + 1}. Message: "${chat.message}"`);
        console.log(`   Sender ID: ${chat.senderId}`);
        console.log(`   Donation ID: ${chat.donationId}`);
        console.log(`   Time: ${chat.timestamp}`);
      });
    }

    // Notifications
    console.log('\n\n🔔 NOTIFICATIONS:');
    console.log('-'.repeat(60));
    const notifications = await mongoose.connection.db.collection('notifications').find({}).toArray();
    if (notifications.length === 0) {
      console.log('   No notifications yet');
    } else {
      notifications.slice(0, 5).forEach((notif, index) => {
        console.log(`\n${index + 1}. ${notif.message}`);
        console.log(`   Type: ${notif.type}`);
        console.log(`   Read: ${notif.isRead}`);
        console.log(`   Created: ${notif.createdAt}`);
      });
      if (notifications.length > 5) {
        console.log(`\n   ... and ${notifications.length - 5} more notifications`);
      }
    }

    // History
    console.log('\n\n📜 HISTORY:');
    console.log('-'.repeat(60));
    const histories = await mongoose.connection.db.collection('histories').find({}).toArray();
    if (histories.length === 0) {
      console.log('   No history records yet');
    } else {
      histories.forEach((history, index) => {
        console.log(`\n${index + 1}. ${history.action}: ${history.itemName}`);
        console.log(`   Category: ${history.category}`);
        console.log(`   User ID: ${history.userId}`);
        console.log(`   Date: ${history.date}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ All data is being stored successfully in MongoDB!');
    console.log(`📊 Total Records: ${users.length + donations.length + requests.length + chats.length + notifications.length + histories.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

showDetails();
