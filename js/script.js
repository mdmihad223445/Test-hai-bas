// Main JavaScript for Tamim University Website

// Tab functionality for login page
document.addEventListener('DOMContentLoaded', function() {
    // Login page tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                tabBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding form
                loginForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tabId}-form`) {
                        form.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Admin dashboard tabs
    const adminNavLinks = document.querySelectorAll('.admin-sidebar a[data-section]');
    const adminSections = document.querySelectorAll('.admin-section');
    
    if (adminNavLinks.length > 0) {
        adminNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                
                // Update active nav
                document.querySelector('.admin-sidebar li.active').classList.remove('active');
                this.parentElement.classList.add('active');
                
                // Show corresponding section
                adminSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${sectionId}-section`) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Admin login functionality
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            
            // Hardcoded admin credentials
            if (email === 'mdmihad929016@gmail.com' && password === 'MDMIHAD22') {
                // Store admin login state in localStorage
                localStorage.setItem('adminLoggedIn', 'true');
                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        });
    }
    
    // Check if admin is logged in when accessing admin.html
    if (window.location.pathname.includes('admin.html')) {
        const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (!isAdminLoggedIn) {
            window.location.href = 'login.html';
        }
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // Generate Application IDs functionality
    const generateIdBtn = document.getElementById('generate-id-btn');
    if (generateIdBtn) {
        generateIdBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('applicant-name').value;
            const email = document.getElementById('applicant-email').value;
            const program = document.getElementById('program-select').value;
            
            if (!name || !email || !program) {
                alert('Please fill all fields');
                return;
            }
            
            // Generate random application ID and PIN
            const appId = `TAM-${program}-${Math.floor(1000 + Math.random() * 9000)}`;
            const pin = `${Math.floor(1000 + Math.random() * 9000)}`;
            
            // Display generated ID
            const displayDiv = document.getElementById('generated-id-display');
            displayDiv.innerHTML = `
                <h3>Application ID Generated</h3>
                <p><strong>Applicant:</strong> ${name}</p>
                <p><strong>Program:</strong> ${program}</p>
                <div class="generated-id">${appId}</div>
                <p><strong>PIN:</strong> ${pin}</p>
                <p>Please provide this information to the applicant.</p>
            `;
            displayDiv.style.display = 'block';
            
            // Add to existing IDs table
            const table = document.getElementById('existing-ids-table');
            const newRow = table.insertRow(0);
            newRow.innerHTML = `
                <td>${appId}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${program}</td>
                <td>${pin}</td>
            `;
            
            // Clear form
            document.getElementById('applicant-name').value = '';
            document.getElementById('applicant-email').value = '';
            document.getElementById('program-select').value = '';
        });
    }
    
    // Sample data for admin dashboard
    if (window.location.pathname.includes('admin.html')) {
        // Set stats numbers
        document.getElementById('total-applications').textContent = '24';
        document.getElementById('pending-applications').textContent = '8';
        document.getElementById('approved-applications').textContent = '14';
        document.getElementById('rejected-applications').textContent = '2';
        
        // Populate recent applications table
        const recentAppsTable = document.getElementById('recent-apps-table');
        const sampleRecentApps = [
            { id: 'TAM-CS-4821', name: 'John Smith', program: 'Computer Science', status: 'Approved', date: '2023-05-15' },
            { id: 'TAM-BBA-5732', name: 'Sarah Johnson', program: 'Business', status: 'Pending', date: '2023-05-14' },
            { id: 'TAM-ENG-3945', name: 'Michael Brown', program: 'Engineering', status: 'Pending', date: '2023-05-12' }
        ];
        
        sampleRecentApps.forEach(app => {
            const row = recentAppsTable.insertRow();
            row.innerHTML = `
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.program}</td>
                <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
                <td>${app.date}</td>
            `;
        });
        
        // Populate all applications table
        const appsTable = document.getElementById('applications-table');
        const sampleApps = [
            { id: 'TAM-CS-4821', name: 'John Smith', email: 'john@example.com', program: 'Computer Science', status: 'Approved' },
            { id: 'TAM-BBA-5732', name: 'Sarah Johnson', email: 'sarah@example.com', program: 'Business', status: 'Pending' },
            { id: 'TAM-ENG-3945', name: 'Michael Brown', email: 'michael@example.com', program: 'Engineering', status: 'Pending' },
            { id: 'TAM-MED-6723', name: 'Emily Davis', email: 'emily@example.com', program: 'Medicine', status: 'Approved' },
            { id: 'TAM-CS-1298', name: 'David Wilson', email: 'david@example.com', program: 'Computer Science', status: 'Rejected' }
        ];
        
        sampleApps.forEach(app => {
            const row = appsTable.insertRow();
            row.innerHTML = `
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.program}</td>
                <td><span class="status-${app.status.toLowerCase()}">${app.status}</span></td>
                <td>
                    <button class="action-btn view-btn">View</button>
                    <button class="action-btn approve-btn">Approve</button>
                    <button class="action-btn reject-btn">Reject</button>
                </td>
            `;
        });
    }
});
