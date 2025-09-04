// Test script untuk dijalankan di browser console
// Copy paste script ini ke browser console untuk test

console.log('🔍 Testing Login API from Browser...');

// Test 1: Basic fetch
fetch('http://localhost:8001/api/cors-test', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'http://localhost:5173'
  }
})
.then(response => {
  console.log('CORS Test Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('CORS Test Response:', data);
})
.catch(error => {
  console.error('CORS Test Error:', error);
});

// Test 2: Login API
fetch('http://localhost:8001/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'http://localhost:5173'
  },
  body: JSON.stringify({
    email: 'admin@wit.id',
    password: 'password123'
  })
})
.then(response => {
  console.log('Login Status:', response.status);
  console.log('Login Headers:', response.headers);
  return response.json();
})
.then(data => {
  console.log('Login Response:', data);
})
.catch(error => {
  console.error('Login Error:', error);
});

console.log('✅ Tests initiated. Check console for results.');
