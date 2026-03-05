#!/usr/bin/env node

/**
 * Admin Setup Script
 * This script helps create or reset the admin user in Supabase
 * 
 * Usage: 
 *   node scripts/setup-admin.js
 *   
 * Then follow the prompts to create/reset admin credentials
 */

const readline = require('readline');
const https = require('https');
const http = require('http');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

async function setupAdmin() {
  console.log('\n🔐 Cuties Admin Setup\n');
  console.log('This script will help you create or reset admin credentials in Supabase.\n');

  // Load environment variables
  require('dotenv').config({ path: '.env.local' });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Error: Missing Supabase credentials in .env.local');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
    rl.close();
    return;
  }

  if (!supabaseServiceKey) {
    console.error('⚠️  Warning: SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
    console.error('This key is needed to create admin users. Instructions:');
    console.error('1. Go to https://app.supabase.com/projects');
    console.error('2. Select your project, go to Settings > API');
    console.error('3. Copy the Service Role Key and add it to .env.local as SUPABASE_SERVICE_ROLE_KEY\n');
    rl.close();
    return;
  }

  const email = await question('Enter admin email: ');
  const password = await question('Enter admin password: ');

  if (!email || !password) {
    console.error('❌ Email and password are required.');
    rl.close();
    return;
  }

  console.log('\n⏳ Creating admin user...\n');

  try {
    const response = await createAdminUser(supabaseUrl, email, password, supabaseServiceKey);
    
    if (response.success) {
      console.log('✅ Admin user created successfully!\n');
      console.log('📝 Admin Credentials:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}\n`);
      console.log('🔗 Admin Dashboard: http://localhost:3000/admin\n');
    } else {
      console.error('❌ Error:', response.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  rl.close();
}

function createAdminUser(supabaseUrl, email, password, serviceKey) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(supabaseUrl);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      path: '/auth/v1/admin/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
      },
    };

    const req = protocol.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (res.statusCode === 201) {
            resolve({ success: true, data: response });
          } else if (res.statusCode === 422 && response.error_code === 'user_already_exists') {
            // Try to reset password instead
            resetAdminPassword(supabaseUrl, email, password, serviceKey)
              .then(resolve)
              .catch(reject);
          } else {
            resolve({ 
              success: false, 
              message: response.message || 'Failed to create user' 
            });
          }
        } catch (e) {
          resolve({ success: false, message: data });
        }
      });
    });

    req.on('error', reject);

    const body = JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
      },
    });

    req.write(body);
    req.end();
  });
}

function resetAdminPassword(supabaseUrl, email, password, serviceKey) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(supabaseUrl);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    // First, get the user by email
    const getOptions = {
      hostname: urlObj.hostname,
      path: `/auth/v1/admin/users?identifiers=${encodeURIComponent(email)}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
      },
    };

    const getReq = protocol.request(getOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const users = JSON.parse(data);
          
          if (Array.isArray(users) && users.length > 0) {
            const userId = users[0].id;

            // Update the user's password
            const updateOptions = {
              hostname: urlObj.hostname,
              path: `/auth/v1/admin/users/${userId}`,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serviceKey}`,
              },
            };

            const updateReq = protocol.request(updateOptions, (res) => {
              let updateData = '';

              res.on('data', (chunk) => {
                updateData += chunk;
              });

              res.on('end', () => {
                if (res.statusCode === 200) {
                  resolve({ 
                    success: true, 
                    message: 'Admin user password reset successfully!' 
                  });
                } else {
                  resolve({ 
                    success: false, 
                    message: 'Failed to reset password' 
                  });
                }
              });
            });

            updateReq.on('error', reject);
            updateReq.write(JSON.stringify({ password }));
            updateReq.end();
          } else {
            resolve({ 
              success: false, 
              message: 'User not found' 
            });
          }
        } catch (e) {
          resolve({ success: false, message: 'Failed to parse user data' });
        }
      });
    });

    getReq.on('error', reject);
    getReq.end();
  });
}

setupAdmin().catch(console.error);
