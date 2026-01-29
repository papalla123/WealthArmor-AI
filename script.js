// ============================================
// WEALTHARMOR AI - EXECUTION ENGINE
// Pentagon Sync + Tax Engine + AI Sentinel
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
    pentagonData: {},
    currencyPair: 'PENUSD',
    lastUpdate: new Date()
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛡️ WealthArmor AI Financial Fortress initializing...');
    
    initializeSentinel();
    initializePentagonSync();
    initializeCurrencyTerminal();
    initializeTaxShield();
    initializeInvestmentRadar();
    initializePortfolio();
    setupEventListeners();
    
    console.log('✅ Financial Fortress operational!');
});

// === AI SENTINEL SYSTEM ===
function initializeSentinel() {
    updateBriefingTime();
    setInterval(updateBriefingTime, 60000); // Update every minute
    
    // Initial analysis
    setTimeout(() => {
        runSentinelAnalysis();
    }, 1000);
}

function updateBriefingTime() {
    const now = new Date();
    const timeString = now.toLocaleString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const briefingTimeEl = document.getElementById('briefingTime');
    if (briefingTimeEl) {
        briefingTimeEl.textContent = `Sistema activo | ${timeString}`;
    }
}

function runSentinelAnalysis() {
    const { Utils, SENTINEL_INSIGHTS } = window.WealthData;
    const { totalWealth } = globalState;
    
    const level = Utils.getSentinelLevel(totalWealth);
    
    // Update greeting
    const greetingEl = document.getElementById('sentinelGreeting');
    if (greetingEl) {
        greetingEl.textContent = level.greeting;
        greetingEl.style.animation = 'none';
        setTimeout(() => {
            greetingEl.style.animation = 'slideIn 0.8s ease-out';
        }, 10);
    }
    
    // Update armor meter
    const armorPercentEl = document.getElementById('armorPercent');
    const armorFillEl = document.getElementById('armorFill');
    
    if (armorPercentEl) armorPercentEl.textContent = `${level.armor}%`;
    if (armorFillEl) {
        armorFillEl.style.width = `${level.armor}%`;
    }
    
    // Update threats
    const threatGrid = document.getElementById('threatGrid');
    if (threatGrid && level.threats) {
        threatGrid.innerHTML = level.threats.map(threat => `
            <div class="threat-item">
                <span class="threat-icon">${threat.icon}</span>
                <span class="threat-text">${threat.text}</span>
            </div>
        `).join('');
    }
    
    // Update tactical recommendations
    const tacticalRecs = document.getElementById('tacticalRecs');
    if (tacticalRecs && level.tactics) {
        tacticalRecs.innerHTML = level.tactics.map(tactic => `
            <div class="rec-item">
                <span class="rec-icon">${tactic.icon}</span>
                <span class="rec-text">${tactic.text}</span>
            </div>
        `).join('');
    }
}

// === PENTAGON SYNC HUB ===
function initializePentagonSync() {
    console.log('🔄 Syncing with Pentagon ecosystem...');
    
    const { PENTAGON_APPS } = window.WealthData;
    
    // Simulate sync with each app
    Object.keys(PENTAGON_APPS).forEach((appKey, index) => {
        setTimeout(() => {
            syncPentagonApp(appKey);
        }, (index + 1) * 800);
    });
}

function syncPentagonApp(appKey) {
    const { PENTAGON_APPS, Utils } = window.WealthData;
    const app = PENTAGON_APPS[appKey];
    
    // Try to read from localStorage
    const storedData = localStorage.getItem(app.storageKey);
    
    // Simulate data or use stored
    let appData;
    if (storedData) {
        try {
            appData = JSON.parse(storedData);
        } catch (e) {
            appData = generateMockData(appKey);
        }
    } else {
        appData = generateMockData(appKey);
    }
    
    globalState.pentagonData[appKey] = appData;
    
    // Update UI
    updatePentagonCard(appKey, appData);
}

function generateMockData(appKey) {
    const mockData = {
        sueldopro: {
            nomina_mensual: 45000,
            empleados_activos: 12,
            ultimo_pago: new Date().toISOString()
        },
        marginmaster: {
            margen_neto: 28.5,
            margen_bruto: 42.3,
            ventas_mes: 185000
        },
        liquidez: {
            flujo_caja: 32500,
            liquidez_disponible: 68000,
            gastos_fijos: 35500
        },
        leadtarget: {
            leads_activos: 23,
            tasa_conversion: 18.5,
            leads_mes: 47
        }
    };
    
    return mockData[appKey] || {};
}

function updatePentagonCard(appKey, data) {
    const { Utils } = window.WealthData;
    const badgeEl = document.getElementById(`${appKey}Badge`);
    const valueEl = document.getElementById(`${appKey}Value`);
    const insightEl = document.getElementById(`${appKey}Insight`);
    
    if (badgeEl) {
        badgeEl.textContent = 'Conectado';
        badgeEl.classList.add('connected');
    }
    
    // Update based on app type
    switch(appKey) {
        case 'marginmaster':
            if (valueEl) valueEl.textContent = `${data.margen_neto}%`;
            if (insightEl) {
                const insight = data.margen_neto > 25 
                    ? `Excelente margen. Con ventas de ${Utils.formatCurrency(data.ventas_mes)}, tienes ${Utils.formatCurrency(data.ventas_mes * data.margen_neto / 100)} disponibles para reinvertir.`
                    : `Margen ajustado. Optimiza costos para aumentar capital de inversión.`;
                insightEl.textContent = insight;
            }
            break;
            
        case 'liquidez':
            if (valueEl) valueEl.textContent = Utils.formatCurrency(data.flujo_caja);
            if (insightEl) {
                const insight = data.flujo_caja > 20000
                    ? `🚨 OPORTUNIDAD: Tienes ${Utils.formatCurrency(data.flujo_caja)} en flujo positivo. Considera invertir el excedente en DPF (9.5% TREA).`
                    : `Flujo de caja estable. Mantén liquidez de emergencia antes de invertir.`;
                insightEl.textContent = insight;
            }
            break;
            
        case 'leadtarget':
            if (valueEl) valueEl.textContent = data.leads_activos;
            if (insightEl) {
                insightEl.textContent = `Tasa de conversión: ${data.tasa_conversion}%. Con ${data.leads_activos} leads activos, potencial de ${Math.round(data.leads_activos * data.tasa_conversion / 100)} cierres este mes.`;
            }
            break;
            
        case 'sueldopro':
            if (valueEl) valueEl.textContent = Utils.formatCurrency(data.nomina_mensual);
            if (insightEl) {
                insightEl.textContent = `Nómina de ${data.empleados_activos} empleados. Costo laboral representa aproximadamente ${Math.round(data.nomina_mensual / globalState.totalWealth * 100)}% de tu patrimonio.`;
            }
            break;
    }
    
    // Update nav status indicator
    const statusEl = document.getElementById(`status${appKey.charAt(0).toUpperCase() + appKey.slice(1)}`);
    if (statusEl) {
        statusEl.classList.add('active');
    }
}

// === CURRENCY TERMINAL V2 ===
function initializeCurrencyTerminal() {
    const { CURRENCY_DATA } = window.WealthData;
    
    // Initial load
    updateCurrencyDisplay('PENUSD');
    
    // Setup chart
    renderCurrencyChart('PENUSD');
    
    // Setup tab switchers
    document.querySelectorAll('.terminal-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const pair = e.target.dataset.pair.toUpperCase();
            
            // Update active state
            document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update display and chart
            globalState.currencyPair = pair;
            updateCurrencyDisplay(pair);
            renderCurrencyChart(pair);
        });
    });
    
    // Real-time updates
    setInterval(() => {
        updateCurrencyRates();
    }, 5000);
}

function updateCurrencyDisplay(pair) {
    const { CURRENCY_DATA, Utils } = window.WealthData;
    const data = CURRENCY_DATA[pair];
    
    if (!data) return;
    
    document.getElementById('currentPair').textContent = data.name.toUpperCase();
    document.getElementById('currentRate').textContent = data.baseRate.toLocaleString('es-PE');
    
    const changeEl = document.getElementById('rateChange');
    const changeSign = data.changePercent >= 0 ? '+' : '';
    changeEl.textContent = `${changeSign}${data.change24h.toFixed(3)} (${changeSign}${data.changePercent.toFixed(2)}%)`;
    changeEl.className = `rate-change ${data.changePercent >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('rateTimestamp').textContent = `Actualizado: ${Utils.getTimeAgo(data.lastUpdate)}`;
    
    if (pair === 'PENUSD') {
        document.getElementById('buyRate').textContent = data.buyRate.toFixed(3);
        document.getElementById('sellRate').textContent = data.sellRate.toFixed(3);
        document.getElementById('spreadValue').textContent = data.spread.toFixed(3);
        
        const history = data.history;
        const rates = history.map(h => h.rate);
        const min = Math.min(...rates);
        const max = Math.max(...rates);
        document.getElementById('rangeValue').textContent = `${min.toFixed(2)} - ${max.toFixed(2)}`;
    }
}

function renderCurrencyChart(pair) {
    const { CURRENCY_DATA } = window.WealthData;
    const data = CURRENCY_DATA[pair];
    
    if (!data) return;
    
    const chartData = data.history.map(point => ({
        x: new Date(point.timestamp).getTime(),
        y: point.rate
    }));
    
    const options = {
        series: [{
            name: data.pair,
            data: chartData
        }],
        chart: {
            type: 'area',
            height: 400,
            background: '#0a0a0a',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#d4af37']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.1,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#d4af37',
                        opacity: 0.6
                    },
                    {
                        offset: 100,
                        color: '#d4af37',
                        opacity: 0
                    }
                ]
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#888',
                    fontSize: '11px'
                },
                datetimeFormatter: {
                    hour: 'HH:mm'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#888',
                    fontSize: '12px',
                    fontFamily: 'Orbitron, monospace'
                },
                formatter: (value) => value.toFixed(pair === 'PENUSD' ? 3 : 0)
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd MMM HH:mm'
            },
            y: {
                formatter: (value) => {
                    return pair === 'PENUSD' 
                        ? `S/ ${value.toFixed(3)}`
                        : `$ ${value.toLocaleString()}`;
                }
            },
            style: {
                fontSize: '12px',
                fontFamily: 'Outfit, sans-serif'
            }
        }
    };
    
    // Destroy existing chart if present
    if (globalState.charts.currency) {
        globalState.charts.currency.destroy();
    }
    
    globalState.charts.currency = new ApexCharts(
        document.querySelector('#currencyChart'),
        options
    );
    
    globalState.charts.currency.render();
}

function updateCurrencyRates() {
    const { CURRENCY_DATA } = window.WealthData;
    const pair = globalState.currencyPair;
    const data = CURRENCY_DATA[pair];
    
    if (!data) return;
    
    // Simulate small rate changes
    const volatility = data.volatility;
    const change = (Math.random() - 0.5) * volatility;
    
    data.baseRate += change;
    if (pair === 'PENUSD') {
        data.buyRate = data.baseRate - data.spread / 2;
        data.sellRate = data.baseRate + data.spread / 2;
    }
    
    data.change24h += change;
    data.changePercent = (data.change24h / (data.baseRate - data.change24h)) * 100;
    data.lastUpdate = new Date().toISOString();
    
    // Add new point to history
    const newPoint = {
        timestamp: new Date().toISOString(),
        rate: data.baseRate,
        high: data.baseRate + volatility * 0.3,
        low: data.baseRate - volatility * 0.3
    };
    
    data.history.push(newPoint);
    if (data.history.length > 30) {
        data.history.shift();
    }
    
    // Update display
    updateCurrencyDisplay(pair);
    
    // Update chart
    if (globalState.charts.currency) {
        const newData = data.history.map(point => ({
            x: new Date(point.timestamp).getTime(),
            y: point.rate
        }));
        
        globalState.charts.currency.updateSeries([{
            data: newData
        }]);
    }
}

// === TAX SHIELD (SUNAT Calculator) ===
function initializeTaxShield() {
    console.log('🛡️ Tax Shield initialized');
}

function calculateTax() {
    const { calculateCapitalGainsTax, Utils } = window.WealthData;
    
    const capitalGain = parseFloat(document.getElementById('capitalGain').value) || 0;
    const investmentType = document.getElementById('investmentType').value;
    
    if (capitalGain <= 0) {
        alert('Por favor ingresa una ganancia de capital válida');
        return;
    }
    
    const result = calculateCapitalGainsTax(capitalGain, investmentType);
    
    // Update results
    document.getElementById('grossGain').textContent = Utils.formatCurrency(result.grossGain);
    document.getElementById('taxAmount').textContent = Utils.formatCurrency(result.taxAmount);
    document.getElementById('netGain').textContent = Utils.formatCurrency(result.netGain);
    
    // Update advice
    const adviceList = document.getElementById('taxAdviceList');
    adviceList.innerHTML = result.advice.map(item => `<li>${item}</li>`).join('');
    
    // Show results
    document.getElementById('taxResults').classList.remove('hidden');
    
    // Animate results
    document.querySelectorAll('.result-card').forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
        }, 10);
    });
}

// === INVESTMENT RADAR ===
function initializeInvestmentRadar() {
    const { INVESTMENT_RADAR, Utils } = window.WealthData;
    const grid = document.getElementById('investmentGrid');
    
    if (!grid) return;
    
    grid.innerHTML = INVESTMENT_RADAR.map(opp => `
        <div class="sync-card" data-investment="${opp.id}">
            <div class="sync-header">
                <div class="sync-icon">${opp.icon}</div>
                <div class="sync-title">
                    <h4>${opp.title}</h4>
                    <span class="sync-badge connected">${opp.badge}</span>
                </div>
            </div>
            <div class="sync-metric">
                <div class="metric-label">${opp.category}</div>
                <div class="metric-value emerald">${opp.roi}%</div>
                <div style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;">
                    Rendimiento ${opp.period}
                </div>
            </div>
            <div class="sync-insight" style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #888;">Mínimo:</span>
                    <span style="color: #fff; font-weight: 600;">${Utils.formatCurrency(opp.minInvestment, opp.currency)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="color: #888;">Riesgo:</span>
                    <span style="color: #fff; font-weight: 600;">${opp.risk}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #888;">Liquidez:</span>
                    <span style="color: #fff; font-weight: 600; font-size: 0.8rem;">${opp.details.liquidity}</span>
                </div>
            </div>
            <a href="${opp.link}" target="_blank" class="calculate-tax-btn" style="padding: 1rem; font-size: 0.9rem;">
                <span>VER OPORTUNIDAD →</span>
            </a>
        </div>
    `).join('');
}

// === PORTFOLIO FORTRESS ===
function initializePortfolio() {
    const { ASSET_TYPES } = window.WealthData;
    
    // Setup input listeners
    Object.keys(ASSET_TYPES).forEach(asset => {
        const input = document.getElementById(`${asset}Input`);
        if (input) {
            input.addEventListener('input', debounce(() => {
                globalState.portfolio[asset] = parseFloat(input.value) || 0;
                updatePortfolioDisplay();
            }, 500));
        }
    });
    
    // Initialize chart
    renderPortfolioChart();
}

function updatePortfolio() {
    updatePortfolioDisplay();
    runSentinelAnalysis();
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>✅ PORTFOLIO ACTUALIZADO</span>';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

function updatePortfolioDisplay() {
    const { Utils, ASSET_TYPES } = window.WealthData;
    const { portfolio } = globalState;
    
    // Calculate totals
    const { total, percentages } = Utils.calculatePortfolioMetrics(portfolio);
    globalState.totalWealth = total;
    
    // Update percentages
    Object.keys(portfolio).forEach(asset => {
        const percentEl = document.getElementById(`${asset}Percent`);
        if (percentEl) {
            percentEl.textContent = `${percentages[asset].toFixed(1)}%`;
        }
    });
    
    // Update total
    const totalEl = document.getElementById('totalWealth');
    if (totalEl) {
        totalEl.textContent = Utils.formatCurrency(total);
    }
    
    // Update chart
    renderPortfolioChart();
}

function renderPortfolioChart() {
    const { ASSET_TYPES, Utils } = window.WealthData;
    const { portfolio } = globalState;
    
    const labels = [];
    const series = [];
    const colors = [];
    
    Object.keys(portfolio).forEach(asset => {
        if (portfolio[asset] > 0) {
            labels.push(ASSET_TYPES[asset].name);
            series.push(portfolio[asset]);
            colors.push(ASSET_TYPES[asset].color);
        }
    });
    
    const options = {
        series: series.length > 0 ? series : [1],
        labels: labels.length > 0 ? labels : ['Sin datos'],
        colors: colors.length > 0 ? colors : ['#1a1a1a'],
        chart: {
            type: 'donut',
            height: 400,
            background: 'transparent'
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 'bold',
                colors: ['#020202']
            },
            dropShadow: {
                enabled: false
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Outfit, sans-serif',
                            color: '#888'
                        },
                        value: {
                            show: true,
                            fontSize: '28px',
                            fontFamily: 'Orbitron, monospace',
                            color: '#d4af37',
                            fontWeight: 'bold',
                            formatter: (val) => Utils.formatCurrency(parseFloat(val))
                        },
                        total: {
                            show: true,
                            label: 'TOTAL',
                            fontSize: '14px',
                            color: '#888',
                            fontFamily: 'Outfit, sans-serif',
                            formatter: () => Utils.formatCurrency(globalState.totalWealth)
                        }
                    }
                }
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            labels: {
                colors: '#ccc',
                useSeriesColors: false
            },
            fontSize: '12px',
            fontFamily: 'Outfit, sans-serif',
            markers: {
                width: 12,
                height: 12,
                radius: 3
            }
        },
        stroke: {
            width: 3,
            colors: ['#0a0a0a']
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (val) => Utils.formatCurrency(val)
            }
        }
    };
    
    // Destroy existing chart
    if (globalState.charts.portfolio) {
        globalState.charts.portfolio.destroy();
    }
    
    globalState.charts.portfolio = new ApexCharts(
        document.querySelector('#portfolioChart'),
        options
    );
    
    globalState.charts.portfolio.render();
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Any additional event listeners
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
window.calculateTax = calculateTax;
window.updatePortfolio = updatePortfolio;

console.log('🛡️ WealthArmor AI Execution Engine loaded');
