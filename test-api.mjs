// Test script for hygiene API
async function testAPI() {
    try {
        const response = await fetch('http://localhost:3001/api/hygiene/temperature-logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dishName: 'Test Poulet',
                temperature: 3,
                checkType: 'RECEPTION',
                centerId: 'invalid',
                userId: 'invalid'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

testAPI();
