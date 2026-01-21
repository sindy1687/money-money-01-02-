// 智慧記帳功能模組
// 自動分類建議和支出模式分析

// 分類規則配置 - 增強版
const CATEGORY_RULES = {
    // 飲食類
    '飲食': {
        keywords: ['餐廳', '小吃', '咖啡', '飲料', '午餐', '晚餐', '早餐', '外送', 'Uber Eats', 'Foodpanda', '麥當勞', '肯德基', '星巴克', '85度C', '超商', '7-11', '全家', '便當', '拉麵', '火鍋', '燒肉', '甜品', '蛋糕', '冰淇淋'],
        amountRanges: [
            { min: 0, max: 200, weight: 0.8 },  // 小額飲食
            { min: 200, max: 1000, weight: 0.9 }, // 中等金額飲食
            { min: 1000, max: 3000, weight: 0.7 }  // 大額飲食
        ],
        timePatterns: {
            morning: { start: 6, end: 10, weight: 0.7 },
            noon: { start: 11, end: 14, weight: 0.9 },
            evening: { start: 17, end: 21, weight: 0.8 },
            night: { start: 21, end: 24, weight: 0.6 }
        }
    },
    
    // 交通類
    '交通': {
        keywords: ['捷運', '公車', '計程車', 'Uber', 'Grab', '油錢', '停車', '高鐵', '台鐵', '機票', '船票', '共享單車', 'YouBike', 'WeGo', 'GoShare', '高速公路', '過路費'],
        amountRanges: [
            { min: 0, max: 100, weight: 0.8 },  // 大眾運輸
            { min: 100, max: 500, weight: 0.7 }, // 短程交通
            { min: 500, max: 5000, weight: 0.9 }, // 長程交通
            { min: 5000, max: 20000, weight: 0.8 } // 國際交通
        ]
    },
    
    // 娛樂類
    '娛樂': {
        keywords: ['電影', 'KTV', '遊戲', '音樂', '演唱會', '展覽', '書籍', 'Netflix', 'Spotify', 'Steam', 'PlayStation', 'Nintendo', 'Disney+', 'YouTube', '桌遊', '密室逃脫'],
        amountRanges: [
            { min: 0, max: 300, weight: 0.7 },
            { min: 300, max: 2000, weight: 0.8 },
            { min: 2000, max: 10000, weight: 0.6 }
        ]
    },
    
    // 購物類
    '購物': {
        keywords: ['衣服', '鞋子', '包包', '化妝品', '3C', '電腦', '手機', '家具', '日用品', '寵物', '運動用品', '美妝', '保養品', '飾品', '手錶', '眼鏡'],
        amountRanges: [
            { min: 0, max: 500, weight: 0.6 },
            { min: 500, max: 5000, weight: 0.8 },
            { min: 5000, max: 50000, weight: 0.9 }
        ]
    },
    
    // 醫療類
    '醫療': {
        keywords: ['醫生', '醫院', '診所', '藥局', '健保', '看診', '藥品', '保健品', '疫苗', '檢查', '手術', '牙醫', '眼科', '皮膚科'],
        amountRanges: [
            { min: 0, max: 500, weight: 0.7 },  // 藥品
            { min: 500, max: 5000, weight: 0.8 }, // 看診
            { min: 5000, max: 50000, weight: 0.9 } // 手術/重大治療
        ]
    },
    
    // 教育類
    '教育': {
        keywords: ['書籍', '課程', '學費', '補習', '文具', '線上課程', '證照', '研習', '訓練', '學習', '教材'],
        amountRanges: [
            { min: 0, max: 1000, weight: 0.8 },
            { min: 1000, max: 10000, weight: 0.9 },
            { min: 10000, max: 100000, weight: 0.7 }
        ]
    },
    
    // 居家類
    '居家': {
        keywords: ['房租', '水費', '電費', '瓦斯', '網路', '電話費', '家具', '家電', '裝潢', '維修', '清潔用品', '衛生紙', '洗衣精'],
        amountRanges: [
            { min: 0, max: 1000, weight: 0.7 },  // 日用品
            { min: 1000, max: 10000, weight: 0.8 }, // 家電/家具
            { min: 10000, max: 50000, weight: 0.9 } // 裝潢/租金
        ]
    },
    
    // 投資理財類
    '投資理財': {
        keywords: ['股票', '基金', '保險', '儲蓄', '投資', '理財', '銀行', '手續費', '稅金', '保費'],
        amountRanges: [
            { min: 0, max: 1000, weight: 0.6 },  // 手續費
            { min: 1000, max: 10000, weight: 0.8 }, // 保費/小額投資
            { min: 10000, max: 1000000, weight: 0.9 } // 大額投資
        ]
    },
    
    // 人際社交類
    '人際社交': {
        keywords: ['禮物', '聚餐', '約會', '婚禮', '派對', '紅包', '請客', '聚餐', '朋友', '家人'],
        amountRanges: [
            { min: 0, max: 1000, weight: 0.7 },
            { min: 1000, max: 10000, weight: 0.8 },
            { min: 10000, max: 50000, weight: 0.6 }
        ]
    }
};

// 自動分類建議功能
function suggestCategory(amount, description = '', timeOfDay = null) {
    if (!amount || amount <= 0) {
        return null;
    }
    
    const scores = {};
    const hour = timeOfDay || new Date().getHours();
    
    // 計算每個分類的匹配分數
    Object.keys(CATEGORY_RULES).forEach(category => {
        const rules = CATEGORY_RULES[category];
        let score = 0;
        let factors = [];
        
        // 1. 關鍵字匹配 (權重: 40%)
        if (description) {
            const keywordScore = calculateKeywordScore(description, rules.keywords);
            score += keywordScore * 0.4;
            if (keywordScore > 0) {
                factors.push(`關鍵字: ${Math.round(keywordScore * 100)}%`);
            }
        }
        
        // 2. 金額範圍匹配 (權重: 35%)
        const amountScore = calculateAmountScore(amount, rules.amountRanges);
        score += amountScore * 0.35;
        if (amountScore > 0) {
            factors.push(`金額: ${Math.round(amountScore * 100)}%`);
        }
        
        // 3. 時間模式匹配 (權重: 25%)
        if (rules.timePatterns) {
            const timeScore = calculateTimeScore(hour, rules.timePatterns);
            score += timeScore * 0.25;
            if (timeScore > 0) {
                factors.push(`時間: ${Math.round(timeScore * 100)}%`);
            }
        }
        
        if (score > 0.3) { // 最低門檻
            scores[category] = {
                score: score,
                factors: factors
            };
        }
    });
    
    // 排序並返回最佳建議
    const sortedCategories = Object.entries(scores)
        .sort(([,a], [,b]) => b.score - a.score)
        .slice(0, 3); // 取前3個建議
    
    if (sortedCategories.length === 0) {
        return null;
    }
    
    return {
        primary: sortedCategories[0][0],
        confidence: Math.round(sortedCategories[0][1].score * 100),
        factors: sortedCategories[0][1].factors,
        alternatives: sortedCategories.slice(1).map(([cat]) => cat)
    };
}

// 計算關鍵字匹配分數
function calculateKeywordScore(description, keywords) {
    if (!description || !keywords || keywords.length === 0) {
        return 0;
    }
    
    const desc = description.toLowerCase();
    let matchCount = 0;
    
    keywords.forEach(keyword => {
        if (desc.includes(keyword.toLowerCase())) {
            matchCount++;
        }
    });
    
    return Math.min(matchCount / keywords.length, 1);
}

// 計算金額範圍匹配分數
function calculateAmountScore(amount, ranges) {
    if (!ranges || ranges.length === 0) {
        return 0;
    }
    
    let maxScore = 0;
    ranges.forEach(range => {
        if (amount >= range.min && amount <= range.max) {
            maxScore = Math.max(maxScore, range.weight);
        }
    });
    
    return maxScore;
}

// 計算時間模式匹配分數
function calculateTimeScore(hour, patterns) {
    if (!patterns) {
        return 0;
    }
    
    let maxScore = 0;
    Object.values(patterns).forEach(pattern => {
        if (hour >= pattern.start && hour <= pattern.end) {
            maxScore = Math.max(maxScore, pattern.weight);
        }
    });
    
    return maxScore;
}

// 支出模式分析功能
function analyzeSpendingPattern(records, period = 'monthly') {
    if (!records || records.length === 0) {
        return {
            period: period,
            totalSpent: 0,
            transactionCount: 0,
            categoryBreakdown: {},
            dailyAverage: 0,
            topCategories: [],
            spendingTrends: {},
            insights: [],
            recommendations: [],
            error: '沒有足夠的數據進行分析'
        };
    }
    
    const analysis = {
        period: period,
        totalSpent: 0,
        transactionCount: 0,
        categoryBreakdown: {},
        dailyAverage: 0,
        topCategories: [],
        spendingTrends: {},
        insights: [],
        recommendations: []
    };
    
    // 1. 基本統計 - 只分析支出記錄
    const expenseRecords = records.filter(record => 
        record.type === 'expense' || record.type === '支出'
    );
    
    analysis.transactionCount = expenseRecords.length;
    
    expenseRecords.forEach(record => {
        const amount = parseFloat(record.amount) || 0;
        const category = record.category || '未分類';
        
        analysis.totalSpent += amount;
        analysis.categoryBreakdown[category] = (analysis.categoryBreakdown[category] || 0) + amount;
    });
    
    // 2. 計算日均消費
    const daysInPeriod = getDaysInPeriod(expenseRecords, period);
    analysis.dailyAverage = daysInPeriod > 0 ? analysis.totalSpent / daysInPeriod : 0;
    
    // 3. 排序分類
    analysis.topCategories = Object.entries(analysis.categoryBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: analysis.totalSpent > 0 ? Math.round((amount / analysis.totalSpent) * 100) : 0
        }));
    
    // 4. 分析消費趨勢
    analysis.spendingTrends = analyzeSpendingTrends(expenseRecords);
    
    // 5. 生成洞察
    analysis.insights = generateSpendingInsights(analysis);
    
    // 6. 生成建議
    analysis.recommendations = generateSpendingRecommendations(analysis);
    
    return analysis;
}

// 分析消費趨勢
function analyzeSpendingTrends(records) {
    const trends = {
        weeklyPattern: {},
        monthlyPattern: {},
        peakSpendingDay: null,
        peakSpendingCategory: null
    };
    
    // 週模式分析
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    weekDays.forEach((day, index) => {
        trends.weeklyPattern[day] = 0;
    });
    
    // 月模式分析
    for (let i = 1; i <= 31; i++) {
        trends.monthlyPattern[i] = 0;
    }
    
    records.forEach(record => {
        if (record.type === 'expense' || record.type === '支出') {
            const date = new Date(record.date);
            const amount = parseFloat(record.amount) || 0;
            
            // 週模式
            const weekDay = weekDays[date.getDay()];
            trends.weeklyPattern[weekDay] += amount;
            
            // 月模式
            const dayOfMonth = date.getDate();
            trends.monthlyPattern[dayOfMonth] += amount;
        }
    });
    
    // 找出消費高峰
    trends.peakSpendingDay = Object.entries(trends.weeklyPattern)
        .sort(([,a], [,b]) => b - a)[0][0];
    
    return trends;
}

// 生成消費洞察
function generateSpendingInsights(analysis) {
    const insights = [];
    
    // 1. 主要消費類別洞察
    if (analysis.topCategories && analysis.topCategories.length > 0) {
        const topCategory = analysis.topCategories[0];
        insights.push({
            type: 'top_category',
            title: '主要消費類別',
            content: `您的主要消費集中在${topCategory.category}，佔總支出的${topCategory.percentage}%`,
            level: 'info'
        });
    }
    
    // 2. 日均消費洞察
    if (analysis.dailyAverage && analysis.dailyAverage > 1000) {
        insights.push({
            type: 'high_daily_spending',
            title: '日均消費較高',
            content: `您的日均消費為NT$${Math.round(analysis.dailyAverage)}，建議檢視消費習慣`,
            level: 'warning'
        });
    }
    
    // 3. 週末消費洞察 - 修復計算邏輯
    if (analysis.spendingTrends && analysis.spendingTrends.weeklyPattern) {
        const weekendSpending = (analysis.spendingTrends.weeklyPattern['週六'] || 0) + 
                                (analysis.spendingTrends.weeklyPattern['週日'] || 0);
        
        const weekdayDays = ['週一', '週二', '週三', '週四', '週五'];
        const weekdaySpending = weekdayDays.reduce((sum, day) => {
            return sum + (analysis.spendingTrends.weeklyPattern[day] || 0);
        }, 0);
        
        // 只有當平日消費大於0時才進行比較
        if (weekdaySpending > 0 && weekendSpending > weekdaySpending / 5 * 2) {
            insights.push({
                type: 'weekend_spending',
                title: '週末消費偏高',
                content: '您的週末消費顯著高於平日，建議注意週末消費控制',
                level: 'info'
            });
        }
    }
    
    // 4. 消費頻率洞察
    if (analysis.transactionCount && analysis.totalSpent) {
        const avgTransaction = analysis.totalSpent / analysis.transactionCount;
        if (avgTransaction > 500) {
            insights.push({
                type: 'high_avg_transaction',
                title: '平均交易金額較高',
                content: `您的平均交易金額為NT$${Math.round(avgTransaction)}，建議檢視大額消費`,
                level: 'warning'
            });
        }
    }
    
    return insights;
}

// 生成消費建議
function generateSpendingRecommendations(analysis) {
    const recommendations = [];
    
    // 1. 預算建議
    if (analysis.topCategories && analysis.topCategories.length > 0) {
        const topCategory = analysis.topCategories[0];
        if (topCategory.percentage > 40) {
            recommendations.push({
                type: 'budget_suggestion',
                title: '設定預算提醒',
                content: `建議為${topCategory.category}設定月度預算，避免超支`,
                action: 'set_budget',
                category: topCategory.category
            });
        }
    }
    
    // 2. 智能儲蓄建議
    if (analysis.totalSpent && analysis.totalSpent > 0) {
        // 計算月度消費估算
        const monthlySpendingEstimate = analysis.dailyAverage * 30;
        let suggestedSavings;
        let savingsMessage;
        let savingsLevel;
        
        // 根據消費水平給出不同的儲蓄建議
        if (analysis.dailyAverage < 300) {
            suggestedSavings = Math.round(monthlySpendingEstimate * 0.4); // 低消費者建議儲蓄40%
            savingsMessage = `您的日均消費較低(NT$${Math.round(analysis.dailyAverage)})，建議每月儲蓄NT$${suggestedSavings}，培養儲蓄習慣`;
            savingsLevel = 'beginner';
        } else if (analysis.dailyAverage < 800) {
            suggestedSavings = Math.round(monthlySpendingEstimate * 0.3); // 中低消費者建議儲蓄30%
            savingsMessage = `建議每月儲蓄NT$${suggestedSavings}，約為月消費的30%，建立穩定的儲蓄計劃`;
            savingsLevel = 'intermediate';
        } else if (analysis.dailyAverage < 1500) {
            suggestedSavings = Math.round(monthlySpendingEstimate * 0.25); // 中等消費者建議儲蓄25%
            savingsMessage = `建議每月儲蓄NT$${suggestedSavings}，約為月消費的25%，平衡消費與儲蓄`;
            savingsLevel = 'balanced';
        } else if (analysis.dailyAverage < 3000) {
            suggestedSavings = Math.round(monthlySpendingEstimate * 0.2); // 高消費者建議儲蓄20%
            savingsMessage = `您的消費水平較高，建議每月儲蓄NT$${suggestedSavings}，約為月消費的20%`;
            savingsLevel = 'advanced';
        } else {
            suggestedSavings = Math.round(monthlySpendingEstimate * 0.15); // 很高消費者建議儲蓄15%
            savingsMessage = `您的日均消費較高(NT$${Math.round(analysis.dailyAverage)})，建議每月儲蓄NT$${suggestedSavings}，控制消費並增加儲蓄`;
            savingsLevel = 'high_spender';
        }
        
        // 根據儲蓄水平調整建議金額，確保合理性
        if (savingsLevel === 'beginner') {
            suggestedSavings = Math.max(500, Math.min(suggestedSavings, 5000)); // 新手：500-5000
        } else if (savingsLevel === 'intermediate') {
            suggestedSavings = Math.max(1000, Math.min(suggestedSavings, 10000)); // 中級：1000-10000
        } else if (savingsLevel === 'balanced') {
            suggestedSavings = Math.max(2000, Math.min(suggestedSavings, 15000)); // 平衡：2000-15000
        } else if (savingsLevel === 'advanced') {
            suggestedSavings = Math.max(3000, Math.min(suggestedSavings, 20000)); // 高級：3000-20000
        } else {
            suggestedSavings = Math.max(5000, Math.min(suggestedSavings, 25000)); // 高消費：5000-25000
        }
        
        // 添加額外的儲蓄建議
        let additionalTip = '';
        if (savingsLevel === 'high_spender') {
            additionalTip = '，建議先檢視並削減非必要支出';
        } else if (savingsLevel === 'beginner') {
            additionalTip = '，可以從小額開始，逐步增加';
        }
        
        recommendations.push({
            type: 'savings_goal',
            title: '儲蓄目標建議',
            content: savingsMessage + additionalTip,
            action: 'set_savings_goal',
            amount: suggestedSavings,
            level: savingsLevel
        });
    }
    
    // 3. 消費習慣建議
    if (analysis.dailyAverage && analysis.dailyAverage > 500) {
        recommendations.push({
            type: 'spending_habit',
            title: '消費習慣優化',
            content: '建議記錄每筆消費的動機，幫助識別不必要的開支',
            action: 'track_spending_motivation'
        });
    }
    
    // 4. 分散消費建議
    if (analysis.topCategories && analysis.topCategories.length > 0) {
        const topCategory = analysis.topCategories[0];
        if (topCategory.percentage > 60) {
            recommendations.push({
                type: 'diversify_spending',
                title: '分散消費建議',
                content: `您的${topCategory.category}消費佔比過高，建議考慮分散消費到其他類別`,
                action: 'review_categories'
            });
        }
    }
    
    return recommendations;
}

// 取得分析期間的天數
function getDaysInPeriod(records, period) {
    if (records.length === 0) return 30;
    
    const dates = records.map(record => new Date(record.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    const diffTime = Math.abs(maxDate - minDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1;
}

// 學習使用者偏好（機器學習簡化版）
function learnUserPreferences(records, userCorrections = []) {
    const preferences = {
        categoryPreferences: {},
        amountPatterns: {},
        timePatterns: {}
    };
    
    // 分析使用者修正的分類
    userCorrections.forEach(correction => {
        const { originalCategory, correctCategory, amount, description, time } = correction;
        
        // 更新分類偏好
        if (!preferences.categoryPreferences[correctCategory]) {
            preferences.categoryPreferences[correctCategory] = {
                keywords: {},
                amountRanges: [],
                timePatterns: {}
            };
        }
        
        // 提取關鍵字
        if (description) {
            const words = description.split(/\s+/);
            words.forEach(word => {
                if (word.length > 1) {
                    preferences.categoryPreferences[correctCategory].keywords[word] = 
                        (preferences.categoryPreferences[correctCategory].keywords[word] || 0) + 1;
                }
            });
        }
        
        // 記錄金額模式
        preferences.categoryPreferences[correctCategory].amountRanges.push(amount);
        
        // 記錄時間模式
        const hour = new Date(time).getHours();
        if (!preferences.categoryPreferences[correctCategory].timePatterns[hour]) {
            preferences.categoryPreferences[correctCategory].timePatterns[hour] = 0;
        }
        preferences.categoryPreferences[correctCategory].timePatterns[hour]++;
    });
    
    return preferences;
}

// 更新分類規則（基於學習結果）
function updateCategoryRules(preferences) {
    Object.keys(preferences.categoryPreferences).forEach(category => {
        const pref = preferences.categoryPreferences[category];
        
        if (!CATEGORY_RULES[category]) {
            CATEGORY_RULES[category] = {
                keywords: [],
                amountRanges: [],
                timePatterns: {}
            };
        }
        
        // 更新關鍵字（取最常見的）
        const sortedKeywords = Object.entries(pref.keywords)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([word]) => word);
        
        if (sortedKeywords.length > 0) {
            CATEGORY_RULES[category].keywords = [...new Set([
                ...CATEGORY_RULES[category].keywords,
                ...sortedKeywords
            ])];
        }
        
        // 更新金額範圍
        if (pref.amountRanges.length > 0) {
            const amounts = pref.amountRanges.sort((a, b) => a - b);
            const ranges = [
                { min: amounts[0], max: amounts[Math.floor(amounts.length * 0.33)], weight: 0.7 },
                { min: amounts[Math.floor(amounts.length * 0.33)], max: amounts[Math.floor(amounts.length * 0.67)], weight: 0.8 },
                { min: amounts[Math.floor(amounts.length * 0.67)], max: amounts[amounts.length - 1], weight: 0.9 }
            ];
            CATEGORY_RULES[category].amountRanges = ranges;
        }
    });
}

// 新增智慧建議功能
function generateSmartSuggestions(records) {
    if (!Array.isArray(records) || records.length === 0) {
        return [];
    }
    
    const suggestions = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // 本月支出分析
    const monthlyExpenses = records.filter(r => {
        const date = new Date(r.date);
        return (r.type === 'expense' || !r.type) && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
    });
    
    const totalMonthlyExpense = monthlyExpenses.reduce((sum, r) => sum + (r.amount || 0), 0);
    
    // 1. 高額支出提醒
    const largeExpenses = monthlyExpenses.filter(r => r.amount > 5000);
    if (largeExpenses.length > 0) {
        suggestions.push({
            type: 'large_expense',
            title: '大額支出提醒',
            content: `本月有 ${largeExpenses.length} 筆超過 NT$5,000 的支出，總計 NT$ ${largeExpenses.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
            level: 'warning',
            action: 'review_large_expenses'
        });
    }
    
    // 2. 重複支出檢測
    const categoryGroups = {};
    monthlyExpenses.forEach(r => {
        const cat = r.category || '未分類';
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(r);
    });
    
    Object.entries(categoryGroups).forEach(([category, items]) => {
        if (items.length > 10) {
            suggestions.push({
                type: 'frequent_category',
                title: '頻繁支出類別',
                content: `「${category}」本月已有 ${items.length} 筆記錄，總計 NT$ ${items.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`,
                level: 'info',
                action: 'review_category',
                category: category
            });
        }
    });
    
    // 3. 異常支出檢測
    const avgExpense = totalMonthlyExpense / Math.max(monthlyExpenses.length, 1);
    const unusualExpenses = monthlyExpenses.filter(r => r.amount > avgExpense * 3);
    if (unusualExpenses.length > 0) {
        suggestions.push({
            type: 'unusual_expense',
            title: '異常支出檢測',
            content: `發現 ${unusualExpenses.length} 筆異常高額支出（超過平均3倍）`,
            level: 'warning',
            action: 'review_unusual',
            expenses: unusualExpenses
        });
    }
    
    // 4. 預算建議
    if (totalMonthlyExpense > 0) {
        const dailyAverage = totalMonthlyExpense / now.getDate();
        const projectedMonthly = dailyAverage * 30;
        
        if (projectedMonthly > totalMonthlyExpense * 1.2) {
            suggestions.push({
                type: 'budget_projection',
                title: '預算預警',
                content: `按目前消費速度，預計本月支出將達 NT$ ${Math.round(projectedMonthly).toLocaleString()}`,
                level: 'warning',
                action: 'adjust_budget'
            });
        }
    }
    
    // 5. 儲蓄建議
    const monthlyIncome = records.filter(r => {
        const date = new Date(r.date);
        return r.type === 'income' && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
    }).reduce((sum, r) => sum + (r.amount || 0), 0);
    
    if (monthlyIncome > 0) {
        const savingsRate = ((monthlyIncome - totalMonthlyExpense) / monthlyIncome) * 100;
        if (savingsRate < 20) {
            suggestions.push({
                type: 'savings_advice',
                title: '儲蓄建議',
                content: `本月儲蓄率為 ${Math.round(savingsRate)}%，建議至少維持 20% 的儲蓄率`,
                level: 'info',
                action: 'improve_savings'
            });
        }
    }
    
    return suggestions.sort((a, b) => {
        const levelOrder = { warning: 0, info: 1 };
        return levelOrder[a.level] - levelOrder[b.level];
    });
}

// 智慧分類建議增強版
function suggestCategoryEnhanced(amount, description = '', timeOfDay = null, userHistory = []) {
    const baseSuggestion = suggestCategory(amount, description, timeOfDay);
    
    if (!baseSuggestion) {
        // 基於用戶歷史的建議
        if (userHistory.length > 0) {
            const similarRecords = userHistory.filter(r => 
                Math.abs(r.amount - amount) < amount * 0.3 && // 金額相近
                r.note && r.note.toLowerCase().includes(description.toLowerCase())
            );
            
            if (similarRecords.length > 0) {
                const categoryCounts = {};
                similarRecords.forEach(r => {
                    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
                });
                
                const mostCommon = Object.entries(categoryCounts)
                    .sort(([,a], [,b]) => b - a)[0];
                
                if (mostCommon && mostCommon[1] >= 2) {
                    return {
                        primary: mostCommon[0],
                        confidence: Math.min(90, 60 + mostCommon[1] * 10),
                        factors: ['歷史記錄匹配'],
                        alternatives: [],
                        source: 'user_history'
                    };
                }
            }
        }
        
        // 基於金額的簡單建議
        if (amount < 100) {
            return {
                primary: '交通',
                confidence: 50,
                factors: ['小額支出'],
                alternatives: ['飲食', '購物'],
                source: 'amount_based'
            };
        } else if (amount < 500) {
            return {
                primary: '飲食',
                confidence: 60,
                factors: ['中額支出'],
                alternatives: ['購物', '娛樂'],
                source: 'amount_based'
            };
        } else {
            return {
                primary: '購物',
                confidence: 55,
                factors: ['大額支出'],
                alternatives: ['居家', '教育'],
                source: 'amount_based'
            };
        }
    }
    
    return baseSuggestion;
}

// 導出功能（供其他模組使用）
window.SmartAccounting = {
    suggestCategory,
    suggestCategoryEnhanced,
    analyzeSpendingPattern,
    learnUserPreferences,
    updateCategoryRules,
    generateSmartSuggestions,
    CATEGORY_RULES
};
