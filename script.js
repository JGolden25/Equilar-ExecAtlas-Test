let allExecutives = [];
let filteredExecutives = [];
let currentFilter = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    fetchExecutiveData();
    setupSearch();
    setupFilters();
});

async function fetchExecutiveData() {
    try {
        // swapped for js file since vercel doesnt read php files
        const response = await fetch('/api/executives');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        allExecutives = transformData(data);
        applyFilters();
        updateStats();
        renderExecutives(filteredExecutives);
        updateResultsSummary();
        
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to load executive data. Please try again later.');
    }
}

function transformData(apiData) {
    if (!apiData || !Array.isArray(apiData)) {
        return [];
    }

    return apiData.map(item => {
        const exec = {
            personName: item.personName || 'Unknown Executive',
            title: item.title || 'Position Not Available',
            company: item.org?.name || item.orgName || 'Company Not Available',
            profileImage: item.profileImage || null,
            eventType: item.eventType,
            source: item.source,
            effectiveDate: item.effectiveDate,
            reportedDate: item.reportedDate,
            rawData: item
        };

        const departureEvents = ['RESIGNATION', 'REMOVED_FROM_WEBSITE'];
        const appointmentEvents = ['NEW_POSITION', 'TITLE_CHANGE'];
        
        if (departureEvents.includes(item.eventType)) {
            exec.category = 'departure';
        } else if (appointmentEvents.includes(item.eventType)) {
            exec.category = 'appointment';
        } else {
            exec.category = 'other';
        }

        exec.sourceLabel = getSourceLabel(item.source);
        exec.displayDate = getDisplayDate(item);

        const names = exec.personName.split(' ');
        exec.initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();

        return exec;
    });
}

function getSourceLabel(source) {
    const secSources = ['TAGGER', 'TAGGER_WEBSITE', 'TAGGER_FORM_D', 'TAGGER_FORM_4'];
    const websiteSources = ['PE_INFO', 'CRUNCHBASE', 'IEI', 'JCATT', 'WEBSITE_CHECKER'];
    
    if (secSources.includes(source)) return 'SEC';
    if (websiteSources.includes(source)) return 'Website';
    if (source === 'COMPANIES_HOUSE') return 'Companies House';
    if (source === 'PRESS_RELEASE') return 'Press Release';
    return source || 'Unknown Source';
}

function getDisplayDate(item) {
    const preferEffectiveSources = ['COMPANIES_HOUSE', 'CRUNCHBASE', 'PE_INFO'];
    const hideDateSources = ['COMPANIES_HOUSE', 'IEI', 'JCATT', 'WEBSITE_CHECKER', 'TAGGER_WEBSITE'];
    
    if (hideDateSources.includes(item.source)) {
        return null;
    }
    
    let dateToUse = item.reportedDate;
    if (preferEffectiveSources.includes(item.source) && item.effectiveDate) {
        dateToUse = item.effectiveDate;
    }
    
    if (!dateToUse) return null;
    
    try {
        const date = new Date(dateToUse);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } catch {
        return null;
    }
}

// New filter functionality
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            e.target.classList.add('active');
            e.target.setAttribute('aria-pressed', 'true');
            
            currentFilter = e.target.dataset.filter;
            applyFilters();
            renderExecutives(filteredExecutives);
            updateResultsSummary();
        });
    });
}

// search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchQuery = e.target.value;
            applyFilters();
            renderExecutives(filteredExecutives);
            updateResultsSummary();
        }, 300);
    });
}

function applyFilters() {
    let filtered = [...allExecutives];
    
    if (currentSearchQuery.trim()) {
        const query = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(exec => {
            return exec.personName.toLowerCase().includes(query) ||
                   exec.company.toLowerCase().includes(query);
        });
    }
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(exec => exec.category === currentFilter);
    }
    
    filteredExecutives = filtered;
}

function updateStats() {
    const total = allExecutives.length;
    const appointments = allExecutives.filter(e => e.category === 'appointment').length;
    const departures = allExecutives.filter(e => e.category === 'departure').length;
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('appointmentCount').textContent = appointments;
    document.getElementById('departureCount').textContent = departures;
}

function updateResultsSummary() {
    const summaryEl = document.getElementById('resultsSummary');
    const totalResults = filteredExecutives.length;
    const totalAll = allExecutives.length;
    
    if (currentSearchQuery.trim() || currentFilter !== 'all') {
        summaryEl.textContent = `${totalResults} of ${totalAll} results`;
        summaryEl.style.display = 'block';
    } else {
        summaryEl.style.display = 'none';
    }
}

function renderExecutives(executives) {
    const content = document.getElementById('content');
    
    if (executives.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <div class="empty-title">No executives found</div>
                <div class="empty-subtitle">Try adjusting your search criteria or filters</div>
            </div>
        `;
        return;
    }
    
    const cardsHtml = executives.map(exec => createExecutiveCard(exec)).join('');
    content.innerHTML = `<div class="cards-grid">${cardsHtml}</div>`;
}

// executive card
function createExecutiveCard(exec) {
    const badgeClass = exec.category === 'departure' ? 'badge-departure' : 'badge-appointment';
    const badgeText = exec.category === 'departure' ? 'Departure' : 'Appointment';
    
    const avatarContent = exec.profileImage 
        ? `<img src="${exec.profileImage}" alt="${exec.personName}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span role=\\"img\\" aria-label=\\"Initials for ${exec.personName}\\">${exec.initials}</span>'">`
        : `<span role="img" aria-label="Initials for ${exec.personName}">${exec.initials}</span>`;
    
    const dateHtml = exec.displayDate ? `<div class="exec-date">${exec.displayDate}</div>` : '';
    
    return `
        <div class="exec-card">
            <div class="exec-card-header">
                <div class="exec-avatar">
                    ${avatarContent}
                </div>
                <div class="exec-info">
                    <div class="exec-name" title="${exec.personName}">${exec.personName}</div>
                    <div class="exec-title" title="${exec.title}">${exec.title}</div>
                    <div class="exec-company" title="${exec.company}">${exec.company}</div>
                </div>
            </div>
            <div class="exec-meta">
                <div>
                    <span class="event-badge ${badgeClass}">${badgeText}</span>
                    <div class="source-label">Source: ${exec.sourceLabel}</div>
                </div>
                ${dateHtml}
            </div>
        </div>
    `;
}

function showError(message) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="error-state">
            <h3>Error Loading Data</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="retry-button">
                Retry
            </button>
        </div>
    `;
}