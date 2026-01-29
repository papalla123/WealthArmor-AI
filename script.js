// ============================================
// WEALTHARMOR AI - INTELLIGENCE ENGINE
// The brain of financial protection
// ============================================

// === GLOBAL STATE ===
let globalState = {
    portfolio: {
        fondos: 0,
        factoring: 0,
        oro: 0,
        dolares: 0,
        caja: 0
    },
    totalWealth: 0,
    charts: {},
    aiInsights: [],
    currencyRates: {},
    pentagonData: {
        sueldopro: null,
        marginmaster: null,
        liquidez: null,
        leadtarget: null
    }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛡️ WealthArmor AI initializing...');
    
    initializeCurrencyData();
    initializePortfolio();
    initializeRadar();
    initializeTicker();
    setupEventListeners();
    runPentagonSync();
    updateWealthScore();
    
    console.log('✅ WealthArmor AI ready!');
});

// === CURRENCY ENGINE ===
function initializeCurrencyData() {
    const { currencyData } = window.WealthData;
    
    // Update display
    document.getElementById('penBuy').textContent = currencyData.PENUSD.currentBuy.toFixed(3);
    document.getElementById('penSell').textContent = currencyData.PENUSD.currentSell.toFixed(3);
    document.getElementById('eurRate').textContent = currencyData.EURUSD.currentRate.toFixed(4);
    document.getElementById('btcRate').textContent = currencyData.BTCUSD.currentRate.toLocaleString('en-US');
    
    // Generate mini charts
    generateMiniChart('penChart', currencyData.PENUSD.history, '#d4af37');
    generateMiniChart('eurChart', currencyData.EURUSD.history, '#3b82f6');
    generateMiniChart('btcChart', currencyData.BTCUSD.history, '#f59e0b');
    
    // Simulate real-time updates
    setInterval(() => {
        updateCurrencyRates();
    }, 5000);
}

function generateMiniChart(canvasId, historyData, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const values = historyData.map(d => d.rate);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: historyData.map((_, i) => ''),
            datasets: [{
                data: values,
                borderColor: color,
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

function updateCurrencyRates() {
    const { currencyData } = window.WealthData;
    
    // Simulate small fluctuations
    currencyData.PENUSD.currentBuy += (Math.random() - 0.5) * 0.002;
    currencyData.PENUSD.currentSell = currencyData.PENUSD.currentBuy + currencyData.PENUSD.spread;
    
    document.getElementById('penBuy').textContent = currencyData.PENUSD.currentBuy.toFixed(3);
    document.getElementById('penSell').textContent = currencyData.PENUSD.currentSell.toFixed(3);
}

// === PORTFOLIO MANAGEMENT ===
function initializePortfolio() {
    // Setup asset inputs
    const assetInputs = ['fondos', 'factoring', 'oro', 'dolares', 'caja'];
    
    assetInputs.forEach(asset => {
        const input = document.getElementById(`${asset}Value`);
        if (input) {
            input.addEventListener('input', debounce(() => {
                globalState.portfolio[asset] = parseFloat(input.value) || 0;
                updatePortfolio();
            }, 500));
        }
    });
    
    // Initialize portfolio chart
    const ctx = document.getElementById('portfolioChart');
    if (ctx) {
        globalState.charts.portfolio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: '#0a0a0a',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 10, 0.9)',
                        titleColor: '#d4af37',
                        bodyColor: '#fff',
                        borderColor: '#d4af37',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: (context) => {
                                const { utils } = window.WealthData;
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percent = total > 0 ? (value / total * 100).toFixed(1) : 0;
                                return `${context.label}: ${utils.formatCurrency(value)} (${percent}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

function updatePortfolio() {
    const { assetTypes, utils } = window.WealthData;
    const { portfolio } = globalState;
    
    // Calculate totals
    const { total, percentages } = utils.calculatePortfolioMetrics(portfolio);
    globalState.totalWealth = total;
    
    // Update percentage displays
    Object.keys(portfolio).forEach(asset => {
        const percentEl = document.getElementById(`${asset}Percent`);
        if (percentEl) {
            percentEl.textContent = `${percentages[asset].toFixed(1)}%`;
        }
    });
    
    // Update chart
    if (globalState.charts.portfolio) {
        const labels = [];
        const data = [];
        const colors = [];
        
        Object.keys(portfolio).forEach(asset => {
            if (portfolio[asset] > 0) {
                labels.push(assetTypes[asset].name);
                data.push(portfolio[asset]);
                colors.push(assetTypes[asset].color);
            }
        });
        
        globalState.charts.portfolio.data.labels = labels;
        globalState.charts.portfolio.data.datasets[0].data = data;
        globalState.charts.portfolio.data.datasets[0].backgroundColor = colors;
        globalState.charts.portfolio.update();
    }
    
    // Update wealth score
    updateWealthScore();
    runAIAnalysis();
}

// === WEALTH SCORE SYSTEM ===
function updateWealthScore() {
    const { totalWealth } = globalState;
    const { utils } = window.WealthData;
    
    // Update main display
    const scoreEl = document.getElementById('totalWealth');
    if (scoreEl) {
        animateValue(scoreEl, parseFloat(scoreEl.textContent.replace(/[^0-9.-]+/g, '')), totalWealth, 1000, true);
    }
    
    // Get wealth level
    const level = utils.getWealthLevel(totalWealth);
    
    // Update status
    const statusTextEl = document.getElementById('wealthStatusText');
    const levelEl = document.getElementById('wealthLevel');
    
    if (statusTextEl) statusTextEl.textContent = level.message;
    if (levelEl) levelEl.textContent = `Nivel ${level.level}: ${level.name}`;
    
    // Update progress ring
    updateProgressRing(totalWealth, level);
}

function updateProgressRing(current, level) {
    const ring = document.getElementById('wealthProgressRing');
    if (!ring) return;
    
    const circumference = 502.65; // 2 * PI * radius (80)
    const progress = Math.min((current - level.min) / (level.max - level.min), 1);
    const offset = circumference - (progress * circumference);
    
    ring.style.strokeDashoffset = offset;
}

function animateValue(element, start, end, duration, isCurrency = false) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        if (isCurrency) {
            element.textContent = `$${Math.round(current).toLocaleString('es-PE')}`;
        } else {
            element.textContent = Math.round(current).toLocaleString('es-PE');
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// === AI PENTAGON ADVISOR ===
function runPentagonSync() {
    console.log('🔄 Syncing with Pentagon...');
    
    // Simulate Pentagon data (in production, this would fetch from other apps)
    const insights = document.getElementById('aiInsights');
    if (!insights) return;
    
    // Clear loading state
    insights.innerHTML = '';
    
    // Simulate connection checks
    setTimeout(() => updateSyncStatus('sueldopro', true), 500);
    setTimeout(() => updateSyncStatus('margin', true), 1000);
    setTimeout(() => updateSyncStatus('liquidez', true), 1500);
    setTimeout(() => updateSyncStatus('lead', true), 2000);
    
    // Generate initial insights
    setTimeout(() => {
        addInsight('💼', 'SueldoPro conectado: Nómina mensual promedio de S/ 45,000 detectada');
        addInsight('📊', 'MarginMaster sincronizado: Margen neto promedio del 28% en últimos 3 meses');
        addInsight('💧', 'LiquidezForce activo: Flujo de caja positivo de S/ 12,000 este mes');
        addInsight('🎯', 'LeadTarget operativo: 23 leads calificados pendientes de conversión');
    }, 2500);
}

function updateSyncStatus(app, active) {
    const item = document.querySelector(`[data-sync="${app}"]`);
    if (item && active) {
        item.setAttribute('data-status', 'active');
    }
}

function addInsight(icon, text) {
    const insights = document.getElementById('aiInsights');
    if (!insights) return;
    
    const insightEl = document.createElement('div');
    insightEl.className = 'insight-item';
    insightEl.innerHTML = `
        <div class="insight-icon">${icon}</div>
        <div class="insight-text">${text}</div>
    `;
    
    insights.appendChild(insightEl);
}

function runAIAnalysis() {
    const { portfolio, totalWealth } = globalState;
    const { advisorRules, utils } = window.WealthData;
    const insights = document.getElementById('aiInsights');
    
    if (!insights) return;
    
    // Calculate key metrics
    const { percentages } = utils.calculatePortfolioMetrics(portfolio);
    const maxConcentration = Math.max(...Object.values(percentages));
    
    // Clear old insights
    const aiInsights = insights.querySelectorAll('.insight-item:not([data-permanent])');
    aiInsights.forEach(el => el.remove());
    
    // Apply rules
    if (totalWealth < advisorRules.noEmergencyFund.threshold) {
        addInsight('🛡️', advisorRules.noEmergencyFund.message);
    } else if (portfolio.caja > advisorRules.highLiquidity.threshold) {
        addInsight('🚨', advisorRules.highLiquidity.message);
    } else if (maxConcentration > advisorRules.lowDiversification.threshold * 100) {
        addInsight('⚠️', advisorRules.lowDiversification.message);
    } else if (totalWealth > 50000 && maxConcentration < 60) {
        addInsight('✅', advisorRules.excellentBalance.message);
    }
}

// === INVESTMENT RADAR ===
function initializeRadar() {
    const { investmentRadar } = window.WealthData;
    const grid = document.getElementById('radarGrid');
    
    if (!grid) return;
    
    grid.innerHTML = investmentRadar.map(opp => `
        <div class="radar-card" data-id="${opp.id}">
            <div class="radar-header">
                <div>
                    <div class="radar-title">${opp.title}</div>
                    <div class="radar-category">${opp.category} • ${opp.institution}</div>
                </div>
                <div class="radar-badge">${opp.badge}</div>
            </div>
            <div class="radar-roi">${opp.roi}%</div>
            <div class="radar-period">Rendimiento ${opp.period}</div>
            <div class="radar-details">
                <div class="detail-row">
                    <span class="detail-label">Inversión mínima:</span>
                    <span class="detail-value">${opp.currency === 'PEN' ? 'S/' : '$'} ${opp.minInvestment.toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Riesgo:</span>
                    <span class="detail-value">${opp.risk}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Liquidez:</span>
                    <span class="detail-value">${opp.details.liquidity}</span>
                </div>
            </div>
            <a href="${opp.affiliateLink}" target="_blank" class="radar-cta">
                VER OPORTUNIDAD →
            </a>
        </div>
    `).join('');
}

// === NEWS TICKER ===
function initializeTicker() {
    const { bvlNews } = window.WealthData;
    const track = document.getElementById('tickerTrack');
    
    if (!track) return;
    
    // Duplicate news for seamless loop
    const newsItems = [...bvlNews, ...bvlNews];
    track.innerHTML = newsItems.map(item => 
        `<span class="ticker-item">${item}</span>`
    ).join('');
}

// === CALCULATORS ===
function calculateCompound() {
    const initial = parseFloat(document.getElementById('compoundInitial').value) || 0;
    const monthly = parseFloat(document.getElementById('compoundMonthly').value) || 0;
    const rate = parseFloat(document.getElementById('compoundRate').value) || 0;
    const years = parseInt(document.getElementById('compoundYears').value) || 0;
    
    const { utils } = window.WealthData;
    const result = utils.calculateCompoundInterest(initial, monthly, rate, years);
    
    const resultDiv = document.getElementById('compoundResult');
    if (!resultDiv) return;
    
    resultDiv.className = 'tool-result visible';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="font-size: 0.85rem; color: #888; margin-bottom: 0.5rem;">VALOR FINAL</div>
            <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 900; color: var(--emerald-500);">
                ${utils.formatCurrency(result.finalAmount)}
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
            <div>
                <div style="font-size: 0.75rem; color: #888; margin-bottom: 0.3rem;">Total Invertido</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: #d4af37;">
                    ${utils.formatCurrency(result.totalInvested)}
                </div>
            </div>
            <div>
                <div style="font-size: 0.75rem; color: #888; margin-bottom: 0.3rem;">Ganancias</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--emerald-500);">
                    ${utils.formatCurrency(result.totalEarnings)}
                </div>
            </div>
        </div>
        <div style="padding: 1.5rem; background: var(--obsidian-800); border-radius: 12px;">
            <div style="font-size: 0.85rem; color: #888; margin-bottom: 1rem;">Proyección Anual</div>
            ${result.breakdown.map(year => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                    <span style="color: #ccc;">Año ${year.year}</span>
                    <span style="color: var(--emerald-500); font-weight: 700;">${utils.formatCurrency(year.total)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function simulateCrisis() {
    const investment = parseFloat(document.getElementById('crisisInvestment').value) || 0;
    const scenario = document.getElementById('crisisScenario').value;
    
    const { crisisScenarios, utils } = window.WealthData;
    const crisis = crisisScenarios[scenario];
    
    if (!crisis) return;
    
    const impactedValue = investment * (1 + crisis.impact);
    const loss = investment - impactedValue;
    
    const resultDiv = document.getElementById('crisisResult');
    if (!resultDiv) return;
    
    resultDiv.className = 'tool-result visible';
    resultDiv.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="font-size: 0.85rem; color: #888; margin-bottom: 0.5rem;">ESCENARIO: ${crisis.name.toUpperCase()}</div>
            <div style="font-size: 1rem; color: #ccc; margin-bottom: 1rem;">${crisis.description}</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="padding: 1rem; background: var(--obsidian-800); border-radius: 12px;">
                    <div style="font-size: 0.75rem; color: #888; margin-bottom: 0.5rem;">Valor Original</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #d4af37;">${utils.formatCurrency(investment)}</div>
                </div>
                <div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 12px;">
                    <div style="font-size: 0.75rem; color: #ef4444; margin-bottom: 0.5rem;">Valor Impactado</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${utils.formatCurrency(impactedValue)}</div>
                </div>
            </div>
        </div>
        <div style="padding: 1.5rem; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 8px; margin-bottom: 1.5rem;">
            <div style="font-size: 0.85rem; color: #888; margin-bottom: 0.5rem;">Pérdida Estimada</div>
            <div style="font-size: 2rem; font-weight: 900; color: #ef4444;">${utils.formatCurrency(Math.abs(loss))}</div>
        </div>
        <div style="padding: 1.5rem; background: var(--obsidian-800); border-radius: 12px;">
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--emerald-300); margin-bottom: 1rem;">📋 Plan de Acción:</div>
            ${crisis.advice.map(item => `
                <div style="padding: 0.7rem 0; color: #ccc; font-size: 0.9rem; line-height: 1.6;">
                    ${item}
                </div>
            `).join('')}
        </div>
    `;
}

// === WEALTH REPORT EXPORT ===
function exportWealthReport() {
    const { portfolio, totalWealth } = globalState;
    const { utils, assetTypes, investmentRadar } = window.WealthData;
    
    const level = utils.getWealthLevel(totalWealth);
    const { percentages } = utils.calculatePortfolioMetrics(portfolio);
    
    const report = `
╔════════════════════════════════════════════════════════════╗
║          WEALTHARMOR AI - PASAPORTE DE RIQUEZA            ║
║                    Reporte Generado: ${new Date().toLocaleDateString('es-PE')}            ║
╚════════════════════════════════════════════════════════════╝

📊 RESUMEN PATRIMONIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patrimonio Total:           ${utils.formatCurrency(totalWealth)}
Nivel de Riqueza:           ${level.name} (Nivel ${level.level})
Estado:                     ${level.message}

💼 PORTFOLIO ARMOR - DISTRIBUCIÓN DE ACTIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.keys(portfolio).map(asset => `
${assetTypes[asset].icon} ${assetTypes[asset].name.padEnd(20)} ${utils.formatCurrency(portfolio[asset]).padStart(15)} (${percentages[asset].toFixed(1)}%)
`).join('')}

🎯 ANÁLISIS DE DIVERSIFICACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${percentages.caja < 20 && totalWealth > 20000 ? '✅' : '⚠️'} Liquidez: ${percentages.caja.toFixed(1)}% en caja
${Math.max(...Object.values(percentages)) < 60 ? '✅' : '⚠️'} Concentración máxima: ${Math.max(...Object.values(percentages)).toFixed(1)}%
${Object.keys(portfolio).filter(k => portfolio[k] > 0).length >= 3 ? '✅' : '⚠️'} Diversificación: ${Object.keys(portfolio).filter(k => portfolio[k] > 0).length} activos activos

💡 RECOMENDACIONES PERSONALIZADAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${level.advice}

🚀 PRÓXIMAS OPORTUNIDADES DE INVERSIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${investmentRadar.slice(0, 3).map((opp, i) => `
${i + 1}. ${opp.title} - ${opp.institution}
   ROI: ${opp.roi}% ${opp.period} | Mínimo: ${opp.currency === 'PEN' ? 'S/' : '$'} ${opp.minInvestment.toLocaleString()}
   Riesgo: ${opp.risk} | ${opp.badge}
`).join('')}

🛡️ PENTAGON SYNC STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SueldoPro       - Gestión Salarial
✅ MarginMaster    - Optimización de Márgenes
✅ LiquidezForce   - Control de Flujo de Caja
✅ LeadTarget      - Captación de Clientes
✅ WealthArmor     - Blindaje Patrimonial

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ DISCLAIMER: Este reporte es informativo y educativo. No 
constituye asesoría financiera profesional. Consulte con un 
CFA o CPA certificado antes de tomar decisiones de inversión.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

© 2026 WealthArmor AI | Parte del Pentágono de Poder Financiero
Generado el ${new Date().toLocaleString('es-PE')}
`;

    // Create download
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WealthArmor_Reporte_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="btn-icon">✅</span><span>REPORTE DESCARGADO</span>';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 3000);
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Recalculate button
    const recalcBtn = document.getElementById('recalculateBtn');
    if (recalcBtn) {
        recalcBtn.addEventListener('click', () => {
            updatePortfolio();
            
            // Visual feedback
            recalcBtn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">PORTFOLIO ACTUALIZADO</span>';
            setTimeout(() => {
                recalcBtn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-text">RECALCULAR PORTFOLIO</span>';
            }, 2000);
        });
    }
}

// === UTILITY FUNCTIONS ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === EXPOSE GLOBAL FUNCTIONS ===
window.calculateCompound = calculateCompound;
window.simulateCrisis = simulateCrisis;
window.exportWealthReport = exportWealthReport;

console.log('🛡️ WealthArmor AI Intelligence Engine loaded');
