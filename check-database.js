// Simple script to check database contents
const mongoose = require('mongoose');

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/docare');
    console.log('✅ Connected to MongoDB\n');

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Collections in database:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log('');

    // Count documents in each collection
    console.log('📈 Document counts:');
    
    const users = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`   Users: ${users}`);
    
    const donations = await mongoose.connection.db.collection('donations').countDocuments();
    console.log(`   Donations: ${donations}`);
    
    const requests = await mongoose.connection.db.collection('requests').countDocuments();
    console.log(`   Requests: ${requests}`);
    
    const chats = await mongoose.connection.db.collection('chats').countDocuments();
    console.log(`   Chat Messages: ${chats}`);
    
    const notifications = await mongoose.connection.db.collection('notifications').countDocuments();
    console.log(`   Notifications: ${notifications}`);
    
    const histories = await mongoose.connection.db.collection('histories').countDocuments();
    console.log(`   History Records: ${histories}`);
    
    console.log('\n📝 Sample Users:');
    const sampleUsers = await mongoose.connection.db.collection('users')
      .find({})
      .limit(5)
      .project({ username: 1, name: 1, email: 1, createdAt: 1 })
      .toArray();
    
    if (sampleUsers.length > 0) {
      sampleUsers.forEach(user => {
        console.log(`   - ${user.username} (${user.name}) - ${user.email}`);
      });
    } else {
      console.log('   No users found');
    }

    console.log('\n📦 Sample Donations:');
    const sampleDonations = await mongoose.connection.db.collection('donations')
      .find({})
      .limit(5)
      .project({ itemName: 1, category: 1, status: 1, createdAt: 1 })
      .toArray();
    
    if (sampleDonations.length > 0) {
      sampleDonations.forEach(donation => {
        console.log(`   - ${donation.itemName} (${donation.category}) - Status: ${donation.status}`);
      });
    } else {
      console.log('   No donations found');
    }

    console.log('\n✅ Database check complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkDatabase();
